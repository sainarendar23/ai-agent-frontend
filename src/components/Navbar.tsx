import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Navbar({ onLogin, onSignup }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobFlow AI</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onLogin}>
              Sign In
            </Button>
            <Button onClick={onSignup}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
