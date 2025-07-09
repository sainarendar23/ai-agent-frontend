import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";

interface AuthModalsProps {
  showLoginModal: boolean;
  showSignupModal: boolean;
  onCloseLogin: () => void;
  onCloseSignup: () => void;
  onSwitchToLogin: () => void;
  onSwitchToSignup: () => void;
}

export default function AuthModals({
  showLoginModal,
  showSignupModal,
  onCloseLogin,
  onCloseSignup,
  onSwitchToLogin,
  onSwitchToSignup,
}: AuthModalsProps) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "" 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to API login endpoint
    window.location.href = "/api/login";
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to API login endpoint for signup
    window.location.href = "/api/login";
  };

  const handleGoogleAuth = () => {
    window.location.href = "/api/login";
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={onCloseLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Sign in to your JobFlow AI account
              </DialogDescription>
            </div>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={showSignupModal} onOpenChange={onCloseSignup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Create Account
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Start your journey with JobFlow AI
              </DialogDescription>
            </div>
          </DialogHeader>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="signup-firstName">First Name</Label>
                <Input
                  id="signup-firstName"
                  type="text"
                  placeholder="John"
                  value={signupForm.firstName}
                  onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-lastName">Last Name</Label>
                <Input
                  id="signup-lastName"
                  type="text"
                  placeholder="Doe"
                  value={signupForm.lastName}
                  onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="john@example.com"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a secure password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </Label>
            </div>
            
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
