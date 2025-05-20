
import { useParams, Link, Navigate } from 'react-router-dom';
import { groupService, postService, userService } from '@/services/mockData';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import { formatDistanceToNow } from 'date-fns';
import { Users } from 'lucide-react';

const GroupDetailsPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  
  if (!groupId) return <Navigate to="/groups" replace />;
  
  const group = groupService.getGroupById(groupId);
  
  if (!group) {
    return <Navigate to="/groups" replace />;
  }
  
  // Check if the user is a member
  const isMember = user ? userService.isGroupMember(user.id, groupId) : false;
  const isManager = user && group.managerId === user.id;
  
  // If not a member, redirect to groups page
  if (!isMember && !isManager) {
    return <Navigate to="/groups" replace />;
  }
  
  const posts = postService.getPostsByGroupId(groupId);
  
  return (
    <div className="space-y-8">
      <div className="h-64 rounded-xl bg-cover bg-center relative" style={{ backgroundImage: `url(${group.coverImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="font-display font-bold text-3xl mb-2">{group.name}</h1>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{group.memberCount} members</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 mb-1">{group.description}</p>
          <p className="text-sm text-gray-500">
            Created {formatDistanceToNow(new Date(group.createdAt), { addSuffix: true })}
          </p>
        </div>
        
        {isManager && (
          <Button asChild>
            <Link to={`/groups/${groupId}/create-post`}>Create Investment Post</Link>
          </Button>
        )}
      </div>
      
      <div className="border-b pb-2">
        <h2 className="font-display font-bold text-2xl">Investment Opportunities</h2>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} groupId={groupId} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No Investment Opportunities Yet</h3>
          {isManager ? (
            <>
              <p className="text-gray-500 mb-6">
                You haven't created any investment opportunities in this group yet.
              </p>
              <Button asChild>
                <Link to={`/groups/${groupId}/create-post`}>Create Your First Investment Post</Link>
              </Button>
            </>
          ) : (
            <p className="text-gray-500">
              There are no investment opportunities available in this group yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupDetailsPage;
