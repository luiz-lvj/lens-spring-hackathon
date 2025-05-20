
import { Group } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { groupService, userService } from '@/services/mockData';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Users } from 'lucide-react';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isMember, setIsMember] = useState<boolean>(
    user ? userService.isGroupMember(user.id, group.id) : false
  );

  const handleJoin = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to join this group",
        variant: "destructive",
      });
      return;
    }

    groupService.joinGroup(user.id, group.id);
    setIsMember(true);
    toast({
      title: "Group Joined",
      description: `You've successfully joined ${group.name}`,
    });
  };

  const isManager = user && group.managerId === user.id;

  return (
    <Card className="crypto-card overflow-hidden flex flex-col h-full">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={group.coverImage} 
          alt={group.name} 
          className="w-full h-full object-cover"
        />
        {isManager && (
          <div className="absolute top-2 right-2 bg-crypto-primary text-white text-xs font-medium py-1 px-2 rounded-full">
            Manager
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-1">
        <h3 className="font-display font-bold text-lg mb-2">{group.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{group.description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Users className="h-3 w-3 mr-1" />
          <span>{group.memberCount} members</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        {isMember ? (
          <Button asChild className="w-full" variant="default">
            <Link to={`/groups/${group.id}`}>View Group</Link>
          </Button>
        ) : (
          <Button onClick={handleJoin} className="w-full" variant="outline">
            Join Group
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
