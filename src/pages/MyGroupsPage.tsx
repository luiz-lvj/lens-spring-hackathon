
import { useAuth } from '@/context/AuthContext';
import { groupService } from '@/services/mockData';
import { GroupCard } from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';

const MyGroupsPage = () => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'manager') {
    return <Navigate to="/" replace />;
  }
  
  const userGroups = groupService.getUserGroups(user.id);
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-3xl">My Groups</h1>
        <Button asChild>
          <Link to="/create-group">Create Group</Link>
        </Button>
      </div>
      
      {userGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No Groups Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't created any groups yet. Create your first group to get started.
          </p>
          <Button asChild>
            <Link to="/create-group">Create Your First Group</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyGroupsPage;
