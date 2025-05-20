import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LensProvider } from "@lens-protocol/react";
import { lensClient } from "./lib/lens/client";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/layout/Layout";
import { Web3Provider } from "./components/providers/Web3Provider";
import { ConnectKitButton } from "connectkit";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GroupsPage from "./pages/GroupsPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import MyGroupsPage from "./pages/MyGroupsPage";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Web3Provider>
        <LensProvider client={lensClient}>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/groups" element={<GroupsPage />} />
                  <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
                  <Route path="/groups/:groupId/posts/:postId" element={<PostDetailsPage />} />
                  <Route path="/groups/:groupId/create-post" element={<CreatePostPage />} />
                  <Route path="/create-group" element={<CreateGroupPage />} />
                  <Route path="/my-groups" element={<MyGroupsPage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </LensProvider>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
