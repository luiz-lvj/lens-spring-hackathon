
import { useParams, Navigate, Link } from 'react-router-dom';
import { postService, groupService, userService } from '@/services/mockData';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { InvestForm } from '@/components/InvestForm';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Bitcoin, ChartLine, HandCoins, ArrowLeft } from "lucide-react";

const PostDetailsPage = () => {
  const { groupId, postId } = useParams<{ groupId: string, postId: string }>();
  const { user } = useAuth();
  
  if (!groupId || !postId) {
    return <Navigate to="/groups" replace />;
  }
  
  const post = postService.getPostById(postId);
  const group = groupService.getGroupById(groupId);
  
  if (!post || !group || post.groupId !== groupId) {
    return <Navigate to={`/groups/${groupId}`} replace />;
  }
  
  // Check if the user is a member of this group
  const isMember = user ? userService.isGroupMember(user.id, groupId) : false;
  const isManager = user && group.managerId === user.id;
  
  // If not a member or manager, redirect to groups page
  if (!isMember && !isManager) {
    return <Navigate to="/groups" replace />;
  }
  
  // Get creator info
  const creator = userService.getUserById(post.createdBy);
  
  return (
    <div>
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link to={`/groups/${groupId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Group
          </Link>
        </Button>
        
        <h1 className="font-display font-bold text-3xl mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500">
          Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          {creator && ` by ${creator.username}`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-display font-bold text-xl mb-4">Investment Details</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{post.content}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-crypto-primary mb-2">
                    <Bitcoin className="h-5 w-5 mr-1" />
                  </div>
                  <span className="font-display font-bold text-xl">${post.investmentAmount.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Total Pool</span>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-crypto-secondary mb-2">
                    <ChartLine className="h-5 w-5 mr-1" />
                  </div>
                  <span className="font-display font-bold text-xl">{post.roi}%</span>
                  <span className="text-sm text-gray-500">Expected ROI</span>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-crypto-accent mb-2">
                    <HandCoins className="h-5 w-5 mr-1" />
                  </div>
                  <span className="font-display font-bold text-xl">{post.duration}</span>
                  <span className="text-sm text-gray-500">Duration</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-1">Important Notice</h3>
                <p className="text-sm text-yellow-700">
                  This investment opportunity is exclusively available to members of {group.name}. 
                  All investments are subject to market risks. Please read all documentation carefully before investing.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          {user?.role === 'investor' && (
            <InvestForm postId={postId} />
          )}
          
          {user?.role === 'manager' && (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-2">Manager View</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You're viewing this investment opportunity as a manager. Switch to investor role to invest.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
