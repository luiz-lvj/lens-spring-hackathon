
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initial auth check
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    setIsLoading(true);
    const loggedInUser = authService.login(userId);
    if (loggedInUser) {
      setUser(loggedInUser);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${loggedInUser.username}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "User not found",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const switchRole = () => {
    const updatedUser = authService.switchRole();
    if (updatedUser) {
      setUser(updatedUser);
      toast({
        title: "Role switched",
        description: `Your role is now: ${updatedUser.role}`,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
