
import { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Bitcoin, ChartLine, HandCoins } from "lucide-react";

interface PostCardProps {
  post: Post;
  groupId: string;
}

export function PostCard({ post, groupId }: PostCardProps) {
  return (
    <Card className="crypto-card h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display">{post.title}</CardTitle>
        <p className="text-xs text-gray-500">
          Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center text-crypto-primary mb-1">
              <Bitcoin className="h-4 w-4 mr-1" />
            </div>
            <span className="font-display font-bold">${post.investmentAmount.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Total Pool</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center text-crypto-secondary mb-1">
              <ChartLine className="h-4 w-4 mr-1" />
            </div>
            <span className="font-display font-bold">{post.roi}%</span>
            <span className="text-xs text-gray-500">Expected ROI</span>
          </div>
          
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center text-crypto-accent mb-1">
              <HandCoins className="h-4 w-4 mr-1" />
            </div>
            <span className="font-display font-bold">{post.duration}</span>
            <span className="text-xs text-gray-500">Duration</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button asChild variant="default" className="w-full">
          <Link to={`/groups/${groupId}/posts/${post.id}`}>View Investment</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
