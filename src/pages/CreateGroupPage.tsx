
import { CreateGroupForm } from '@/components/CreateGroupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const { user } = useAuth();
  
  // Only managers can create groups
  if (!user || user.role !== 'manager') {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display">Create a New Group</CardTitle>
          <CardDescription>
            Create a group to share investment opportunities with investors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateGroupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGroupPage;
