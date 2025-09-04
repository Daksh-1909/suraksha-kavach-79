import React, { useState, useCallback, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getGeminiModel } from "../services/geminiClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "typing";
  text: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      sender: "ai",
      text:
        "Hello! I'm your disaster preparedness assistant. 🛡️\n\nAsk me anything about **emergency planning, safety procedures, or disaster response.**",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const buildPrompt = (history: ChatMessage[]) => {
    const formatted = history
      .map((m) => `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n");

    return `
You are a **concise, practical disaster-preparedness assistant**.
Stay strictly on the topic of disaster preparedness, emergency planning, and safety.
Ignore off-topic questions politely.

Formatting rules:
- Reply in **clean Markdown** only.
- Use short sections with ## headings.
- Prefer bullet lists for steps/checklists.
- Use tables when comparing items.
- Use fenced code blocks for commands.
- Keep paragraphs short (2–4 lines).
- If user requests medical/legal advice beyond scope, add a one-line disclaimer.

Conversation so far:
${formatted}

Assistant: Provide the best next answer in Markdown now.
`.trim();
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    const { model, initError: err } = getGeminiModel();
    if (err || !model) {
      setInitError(err || "Model unavailable.");
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "ai", text: err || "Model unavailable." },
      ]);
      return;
    }
    setInitError(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Greeting shortcut
    const greetings = ["hi", "hello", "hey", "hii"];
    if (greetings.includes(userMessage.text.toLowerCase())) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: "Hello! 👋 How can I help you with **disaster preparedness** today?",
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const trimmedHistory = [...messages, userMessage].slice(-10);
      const prompt = buildPrompt(trimmedHistory);

      const typingId = crypto.randomUUID();
      const aiMessageId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        { id: typingId, sender: "typing", text: "" },
      ]);

      await new Promise((res) => setTimeout(res, 1200));

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
        const response = streamResult?.response
          ? await streamResult.response
          : undefined;
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
    } catch (e) {
      console.error("Gemini error:", e);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: "⚠️ Error: Could not process your request. Please check API key, model name, or network.",
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
          Get instant answers to your **disaster preparedness** questions
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
              {m.sender !== "user" && (
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
                      h2: (props) => (
                        <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />
                      ),
                      p: (props) => (
                        <p className="leading-relaxed mb-2" {...props} />
                      ),
                      ul: (props) => (
                        <ul className="list-disc pl-5 space-y-1 mb-2" {...props} />
                      ),
                      ol: (props) => (
                        <ol className="list-decimal pl-5 space-y-1 mb-2" {...props} />
                      ),
                      li: (props) => <li className="leading-relaxed" {...props} />,
                      blockquote: (props) => (
                        <blockquote
                          className="border-l-4 border-primary/40 pl-3 italic my-2"
                          {...props}
                        />
                      ),
                      code: (props) => {
                        const { inline, className, children, ...rest } =
                          props as {
                            inline?: boolean;
                            className?: string;
                            children: React.ReactNode;
                          };
                        const text = String(children);
                        if (inline) {
                          return (
                            <code
                              className="px-1 rounded bg-foreground/10"
                              {...rest}
                            >
                              {text}
                            </code>
                          );
                        }
                        return (
                          <pre className="overflow-x-auto rounded-md p-3 bg-foreground/10 text-sm my-2">
                            <code className={className} {...rest}>
                              {text}
                            </code>
                          </pre>
                        );
                      },
                      table: (props) => (
                        <div className="overflow-x-auto my-2">
                          <table
                            className="w-full border-collapse text-sm"
                            {...props}
                          />
                        </div>
                      ),
                      th: (props) => (
                        <th
                          className="border border-border px-2 py-1 text-left bg-foreground/10"
                          {...props}
                        />
                      ),
                      td: (props) => (
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
