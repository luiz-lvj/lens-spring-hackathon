
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { investmentService } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface InvestFormProps {
  postId: string;
}

export function InvestForm({ postId }: InvestFormProps) {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to invest",
        variant: "destructive",
      });
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      investmentService.createInvestment(
        user.id,
        postId,
        parseFloat(amount)
      );
      
      toast({
        title: "Investment Successful",
        description: `You have successfully invested $${parseFloat(amount).toLocaleString()}!`,
      });
      
      setAmount('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process investment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const alreadyInvested = user && investmentService.hasInvested(user.id, postId);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Invest Now</CardTitle>
      </CardHeader>
      <CardContent>
        {alreadyInvested ? (
          <div className="text-center p-4">
            <p className="text-green-600 font-medium">You have already invested in this opportunity!</p>
            <p className="text-sm text-gray-500 mt-2">
              You can track your investments in the My Investments section.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Amount to Invest (USD)
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum investment: $1,000
              </p>
            </div>
            
            <Button
              type="submit"
              variant="default"
              className="w-full crypto-gradient"
              disabled={isSubmitting || !user}
            >
              {isSubmitting ? "Processing..." : "Invest Now"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 text-xs text-gray-500 flex justify-center">
        All investments are subject to market risks. Please invest wisely.
      </CardFooter>
    </Card>
  );
}
