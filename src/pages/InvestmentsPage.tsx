
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { investmentService, postService } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Bitcoin, ChartLine } from "lucide-react";

const InvestmentsPage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const investments = investmentService.getUserInvestments(user.id);
  
  return (
    <div className="space-y-8">
      <h1 className="font-display font-bold text-3xl">My Investments</h1>
      
      {investments.length > 0 ? (
        <div className="space-y-6">
          {investments.map(investment => {
            const post = postService.getPostById(investment.postId);
            if (!post) return null;
            
            return (
              <Card key={investment.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-display font-semibold text-xl">{post.title}</h2>
                    <div className="bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded">
                      Active
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                      <Bitcoin className="h-4 w-4 text-crypto-primary mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Your Investment</p>
                        <p className="font-medium">${investment.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ChartLine className="h-4 w-4 text-crypto-secondary mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Expected ROI</p>
                        <p className="font-medium">{post.roi}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Investment Date</p>
                      <p className="font-medium">{format(new Date(investment.createdAt), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 border-t">
                  <p className="text-xs text-gray-500">
                    Duration: {post.duration} | Ends: {format(new Date().setMonth(new Date().getMonth() + 3), 'MMM dd, yyyy')}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No Investments Yet</h2>
          <p className="text-gray-500">
            You haven't made any investments yet. Browse groups to find investment opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default InvestmentsPage;
