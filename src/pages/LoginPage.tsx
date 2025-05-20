
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/services/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userId: string) => {
    login(userId);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display">Welcome to CryptoGroups</CardTitle>
          <CardDescription>Choose a user to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((user) => (
            <Button
              key={user.id}
              variant="outline"
              onClick={() => handleLogin(user.id)}
              className="w-full justify-start h-auto py-3"
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium">{user.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-gray-500">
          This is a demo app. In a real application, proper authentication would be implemented.
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
