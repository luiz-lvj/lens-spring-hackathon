
import { useAuth } from '@/context/AuthContext';
import { GroupCard } from '@/components/GroupCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { groups } from '@/services/mockData';

const HomePage = () => {
  const { user } = useAuth();
  
  // Show the 3 most recent groups
  const featuredGroups = [...groups].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="relative rounded-3xl overflow-hidden bg-crypto-dark text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642790124321-30d6f1bf2b0c?q=80&w=3432&auto=format&fit=crop')] opacity-30 bg-cover bg-center"></div>
        <div className="relative z-10 py-16 px-6 md:py-24 md:px-12 max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Invest in Crypto<br/>Together
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join investment groups led by experienced crypto managers and discover unique opportunities to grow your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="crypto-gradient">
              <Link to="/groups">Explore Groups</Link>
            </Button>
            {user?.role === 'manager' && (
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/create-group">Create a Group</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured groups section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-display font-bold text-2xl">Featured Groups</h2>
          <Button asChild variant="ghost">
            <Link to="/groups">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>
      
      {/* How it works section */}
      <section className="space-y-8 py-12">
        <h2 className="font-display font-bold text-2xl text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="bg-crypto-primary/10 text-crypto-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <span className="font-bold text-xl">1</span>
            </div>
            <h3 className="font-display font-bold text-lg">Join a Group</h3>
            <p className="text-gray-600">Find a group led by experienced managers with investment strategies that match your goals.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-crypto-primary/10 text-crypto-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <span className="font-bold text-xl">2</span>
            </div>
            <h3 className="font-display font-bold text-lg">Discover Opportunities</h3>
            <p className="text-gray-600">Get access to exclusive investment opportunities with detailed information and expected returns.</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-crypto-primary/10 text-crypto-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <span className="font-bold text-xl">3</span>
            </div>
            <h3 className="font-display font-bold text-lg">Invest & Grow</h3>
            <p className="text-gray-600">Invest in opportunities that align with your strategy and track your portfolio's growth.</p>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-gradient-to-r from-crypto-primary to-crypto-secondary rounded-xl p-8 text-white text-center">
        <h2 className="font-display font-bold text-2xl mb-4">Ready to start your crypto journey?</h2>
        <p className="mb-6">Join our community of investors and managers today.</p>
        <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
          <Link to="/groups">Get Started</Link>
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
