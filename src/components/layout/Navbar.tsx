import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, logout, switchRole } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-crypto-primary flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display font-bold text-xl">Catalyst Club</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-crypto-primary transition-colors">
              Home
            </Link>
            <Link to="/groups" className="text-sm font-medium hover:text-crypto-primary transition-colors">
              Groups
            </Link>
            {user?.role === 'manager' && (
              <Link to="/my-groups" className="text-sm font-medium hover:text-crypto-primary transition-colors">
                My Groups
              </Link>
            )}
            {user && (
              <Link to="/investments" className="text-sm font-medium hover:text-crypto-primary transition-colors">
                My Investments
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ConnectKitButton />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={switchRole}>
                  Switch to {user.role === 'investor' ? 'Manager' : 'Investor'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
