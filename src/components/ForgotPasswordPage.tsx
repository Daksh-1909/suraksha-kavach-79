import React, { useState } from 'react';
import { Shield, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgotPasswordPageProps {
  onGoToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onGoToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg border border-border p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Check Your Email</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            <Button onClick={onGoToLogin} className="w-full">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={onGoToLogin}
              className="flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </button>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground">Enter your email to reset your password</p>
          </div>

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;