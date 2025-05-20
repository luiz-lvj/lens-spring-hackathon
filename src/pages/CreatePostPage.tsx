
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePostForm } from '@/components/CreatePostForm';
import { useAuth } from '@/context/AuthContext';
import { groupService } from '@/services/mockData';

const CreatePostPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  
  if (!groupId) return <Navigate to="/groups" replace />;
  
  const group = groupService.getGroupById(groupId);
  
  if (!group) {
    return <Navigate to="/groups" replace />;
  }
  
  // Check if the user is the manager of this group
  const isManager = user && group.managerId === user.id;
  
  if (!isManager) {
    return <Navigate to={`/groups/${groupId}`} replace />;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display">
            Create Investment Opportunity
          </CardTitle>
          <CardDescription>
            Create a new investment opportunity for the group: {group.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm groupId={groupId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
