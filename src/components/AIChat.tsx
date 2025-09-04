import React, { useState, useCallback, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getGeminiModel } from "../services/geminiClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: number;
  sender: "user" | "ai" | "typing";
  text: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "ai",
      text:
        "Hello! I'm your disaster preparedness assistant. Ask me anything about emergency planning, safety procedures, or disaster response.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    const { model, initError: err } = getGeminiModel();
    if (err || !model) {
      setInitError(err || "Model unavailable.");
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "ai", text: err || "Model unavailable." },
      ]);
      return;
    }
    setInitError(null);

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // ✅ Greeting handling
    const greetings = ["hi", "hello", "hey", "hii"];
    if (greetings.includes(userMessage.text.toLowerCase())) {
      setMessages((prev) => [
        ...prev,
        {
          id: userMessage.id + 1,
          sender: "ai",
          text: "Hello! 👋 How can I help you with disaster preparedness today?",
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Only keep last 10 messages in history
      const trimmedMessages = [...messages, userMessage].slice(-10);
      const history = trimmedMessages
        .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
        .join("\n");

      const prompt = `
You are a concise, practical disaster-preparedness assistant.
Stay strictly on the topic of disaster preparedness, emergency planning, and safety.
Ignore off-topic questions politely.

Formatting rules:
- Reply in clean Markdown only.
- Use short sections with ## headings.
- Prefer bullet lists for steps/checklists.
- Use tables when comparing items.
- Use fenced code blocks for commands.
- Keep paragraphs short (2–4 lines).
- If user requests medical/legal advice beyond scope, add a one-line disclaimer.

Conversation so far:
${history}

Assistant: Provide the best next answer in Markdown now.
`.trim();

      // ✅ Typing placeholder
      const typingId = userMessage.id + 1;
      const aiMessageId = typingId + 1;

      setMessages((prev) => [
        ...prev,
        { id: typingId, sender: "typing", text: "" },
      ]);

      await new Promise((res) => setTimeout(res, 1200));

      // Replace typing with AI message
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        { id: aiMessageId, sender: "ai", text: "" },
      ]);

      let streamed = false;
      try {
        // @ts-ignore stream API available at runtime
        const streamResult = await model.generateContentStream(prompt);
        streamed = true;
        let acc = "";
        for await (const chunk of streamResult.stream) {
          const chunkText = chunk?.text?.() ?? "";
          if (!chunkText) continue;
          acc += chunkText;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId ? { ...m, text: acc } : m
            )
          );
        }
        const response = streamResult?.response ? await streamResult.response : undefined;
        const finalText = response?.text?.().trim() || acc || "…";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMessageId ? { ...m, text: finalText } : m
          )
        );
      } catch {
        if (!streamed) {
          const result = await model.generateContent(prompt);
          const text = result?.response?.text?.().trim() || "No response.";
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId ? { ...m, text } : m
            )
          );
        }
      }
    } catch (e: any) {
      console.error("Gemini error:", e);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          text: `Error: ${e?.message || "Unknown error"} — check API key, model name, and .env`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, messages, isLoading]);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">
          Get instant answers to your disaster preparedness questions
        </p>
        {initError && <p className="text-sm text-red-500 mt-2">{initError}</p>}
      </div>

      <div className="flex-1 bg-card border border-subtle-border rounded-lg flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "ai" && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              {m.sender === "typing" && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary animate-pulse" />
                </div>
              )}
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.sender === "ai" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-lg font-semibold mt-3 mb-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="leading-relaxed mb-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-5 space-y-1 mb-2"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal pl-5 space-y-1 mb-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-primary/40 pl-3 italic my-2"
                          {...props}
                        />
                      ),
                      code: ({
                        inline,
                        className,
                        children,
                        ...props
                      }: React.PropsWithChildren<{
                        inline?: boolean;
                        className?: string;
                      }> & React.HTMLAttributes<HTMLElement>) => {
                        const text = String(children);
                        if (inline) {
                          return (
                            <code
                              className="px-1 rounded bg-foreground/10"
                              {...props}
                            >
                              {text}
                            </code>
                          );
                        }
                        return (
                          <pre className="overflow-x-auto rounded-md p-3 bg-foreground/10 text-sm my-2">
                            <code className={className} {...props}>
                              {text}
                            </code>
                          </pre>
                        );
                      },
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-2">
                          <table
                            className="w-full border-collapse text-sm"
                            {...props}
                          />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="border border-border px-2 py-1 text-left bg-foreground/10"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="border border-border px-2 py-1 align-top"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {m.text || "Typing…"}
                  </ReactMarkdown>
                ) : m.sender === "typing" ? (
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-300"></span>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                )}
              </div>
              {m.sender === "user" && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-subtle-border p-4">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about emergency preparedness..."
              rows={1}
              className="flex-1 resize-none p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors ${
                isLoading || !inputMessage.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Enter to send • Shift+Enter for newline
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
