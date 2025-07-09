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
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { toast } = useToast();
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    toast({
      title: "Payment Processed",
      description: "Your payment has been processed successfully! (Demo Mode)",
    });
    
    onClose();
  };

  const handleGPayInfo = () => {
    const message = "Please send ₹299 to +91 7010308369 via Google Pay and include your email in the payment note.";
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText("+91 7010308369");
      toast({
        title: "Phone Number Copied",
        description: message,
      });
    } else {
      alert(message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Unlock advanced features and unlimited email processing
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">Pro Plan</p>
                <p className="text-sm text-blue-700">Up to 100 emails/month</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">₹299</p>
                <p className="text-sm text-blue-700">per month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentForm.cardNumber}
              onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={paymentForm.expiryDate}
                onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={paymentForm.cvv}
                onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              value={paymentForm.cardholderName}
              onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
            />
          </div>
          
          <Alert className="border-yellow-200 bg-yellow-50">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <p className="font-medium mb-2">Test Payment Mode</p>
              <p className="text-sm">
                For testing purposes, you can use Google Pay to send ₹299 to{" "}
                <span className="font-bold">+91 7010308369</span> and include your email in the note.
              </p>
            </AlertDescription>
          </Alert>
          
          <Button type="submit" className="w-full">
            Process Payment
          </Button>
          
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleGPayInfo}
              className="text-blue-600 hover:text-blue-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Pay with Google Pay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
