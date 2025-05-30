
import { useState } from 'react';
import { groupService } from '@/services/mockData';
import { GroupCard } from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

import { evmAddress } from "@lens-protocol/client";
import { fetchGroup, fetchGroups } from "@lens-protocol/client/actions";

import { lensClient } from "@/lib/lens/client";
import { useGroupByManager } from '@/hooks/useGroups';

const GroupsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const allGroups = groupService.getAllGroups();
  
  const filteredGroups = allGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const result = fetchGroup(lensClient, {
    group: "0x45cF9E0D1d5Df6797e2983a551E32D14636beDbC"
  }).then((group) => {
    console.log("group", group);
  });

 

  const { data: groups, isLoading, error } = useGroupByManager(evmAddress("0x07737e07e08aeb91bdea62b3227d3c3272fe371c"));

  console.log("groups", groups);

  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-3xl">Explore Groups</h1>
        {user?.role === 'manager' && (
          <Button asChild>
            <Link to="/create-group">Create Group</Link>
          </Button>
        )}
      </div>
      
      <div className="max-w-md">
        <Input
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No Groups Found</h2>
          <p className="text-gray-500">
            {searchTerm 
              ? `No groups match "${searchTerm}". Try a different search term.` 
              : "No groups are available at the moment."}
          </p>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;


