import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export default function WelcomeModal({ isOpen, onClose, onGetStarted }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Welcome to JobFlow AI!
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-600">
              Your intelligent email assistant for job applications. Let's get you started with automated email responses.
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="flex space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Skip Tour
          </Button>
          <Button onClick={onGetStarted} className="flex-1">
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
