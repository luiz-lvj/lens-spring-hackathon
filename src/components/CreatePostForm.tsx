
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { postService } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface CreatePostFormProps {
  groupId: string;
}

export function CreatePostForm({ groupId }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('');
  const [roi, setRoi] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newPost = postService.createPost(
        groupId,
        title,
        content,
        parseFloat(amount),
        parseFloat(roi),
        duration,
        user.id
      );
      
      toast({
        title: "Investment Opportunity Created",
        description: `Your post "${title}" has been created successfully!`,
      });
      
      // Redirect to the new post
      navigate(`/groups/${groupId}/posts/${newPost.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter investment opportunity title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe the investment opportunity in detail"
          required
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Investment Amount ($)
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50000"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="roi" className="text-sm font-medium">
            Expected ROI (%)
          </label>
          <Input
            id="roi"
            type="number"
            step="0.1"
            value={roi}
            onChange={(e) => setRoi(e.target.value)}
            placeholder="12.5"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="duration" className="text-sm font-medium">
            Duration
          </label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="3 months"
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Investment Opportunity"}
      </Button>
    </form>
  );
}
