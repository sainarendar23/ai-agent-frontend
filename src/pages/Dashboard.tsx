import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Mail, 
  Star, 
  TrendingUp, 
  Play, 
  Square, 
  ExternalLink, 
  LogOut,
  FileText,
  Search,
  MessageSquare,
  Settings
} from "lucide-react";
import StatsCards from "@/components/StatsCards";
import ActivityFeed from "@/components/ActivityFeed";
import AgentCard from "@/components/AgentCard";
import AgentSelector from "@/components/AgentSelector";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [showAgentSelector, setShowAgentSelector] = useState(true);
  
  const [credentials, setCredentials] = useState({
    resumeLink: "",
    personalDescription: "",
    openaiApiKey: "",
    agentActive: false,
  });

  // Check for selected agent from localStorage
  useEffect(() => {
    const savedAgent = localStorage.getItem('selectedAgent');
    if (savedAgent) {
      setSelectedAgent(savedAgent);
      setShowAgentSelector(false);
      localStorage.removeItem('selectedAgent'); // Clean up
    }
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [user, isLoading, toast]);

  // Handle agent selection
  const handleAgentSelect = (agentType: string) => {
    setSelectedAgent(agentType);
    setShowAgentSelector(false);
    
    // Check if this agent is already active
    if (!activeAgents.includes(agentType)) {
      setActiveAgents([...activeAgents, agentType]);
    }
  };

  const handleBackToSelector = () => {
    setShowAgentSelector(true);
    setSelectedAgent(null);
  };

  // Fetch user credentials
  const { data: userCredentials, isLoading: credentialsLoading } = useQuery({
    queryKey: ["/api/credentials"],
    enabled: !!user,
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    enabled: !!user,
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  // Fetch activities
  const { data: activities } = useQuery({
    queryKey: ["/api/activities"],
    enabled: !!user,
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  // Update credentials when data loads
  useEffect(() => {
    if (userCredentials) {
      setCredentials({
        resumeLink: userCredentials.resumeLink || "",
        personalDescription: userCredentials.personalDescription || "",
        openaiApiKey: userCredentials.openaiApiKey === "***" ? "" : userCredentials.openaiApiKey || "",
        agentActive: userCredentials.agentActive || false,
      });
    }
  }, [userCredentials]);

  // Update credentials mutation
  const updateCredentialsMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/credentials", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/credentials"] });
      toast({
        title: "Success",
        description: "Credentials updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update credentials",
        variant: "destructive",
      });
    },
  });

  // Agent control mutations
  const startAgentMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/agent/start");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/credentials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Success",
        description: "Agent started successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to start agent",
        variant: "destructive",
      });
    },
  });

  const stopAgentMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/agent/stop");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/credentials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Success",
        description: "Agent stopped successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to stop agent",
        variant: "destructive",
      });
    },
  });

  const handleSaveCredentials = () => {
    updateCredentialsMutation.mutate(credentials);
  };

  const handleToggleAgent = () => {
    if (credentials.agentActive) {
      stopAgentMutation.mutate();
    } else {
      startAgentMutation.mutate();
    }
  };

  const handleGmailConnect = async () => {
    try {
      const response = await apiRequest("GET", "/api/gmail/auth");
      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (error) {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to connect Gmail",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading || credentialsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobFlow AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${credentials.agentActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">
                  {credentials.agentActive ? 'Agent Active' : 'Agent Inactive'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img 
                  src={user?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32"} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <span className="text-sm text-gray-700">
                  {user?.firstName || user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAgentSelector ? (
          // Agent Selection View
          <AgentSelector 
            onAgentSelect={handleAgentSelect}
            activeAgents={activeAgents}
          />
        ) : (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={handleBackToSelector}
                className="mb-4"
              >
                ← Back to Agent Selection
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedAgent} Agent Configuration
              </h1>
              <p className="text-gray-600">Configure your {selectedAgent} agent settings and credentials</p>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* Agent Configuration */}
              <div className="lg:col-span-2">
                {selectedAgent === 'gmail' && (
                  <AgentCard
                    credentials={credentials}
                    onCredentialsChange={setCredentials}
                    onSave={handleSaveCredentials}
                    onToggleAgent={handleToggleAgent}
                    onGmailConnect={handleGmailConnect}
                    isUpdating={updateCredentialsMutation.isPending}
                    isToggling={startAgentMutation.isPending || stopAgentMutation.isPending}
                    gmailConnected={userCredentials?.gmailAccessToken === 'connected'}
                  />
                )}
                
                {selectedAgent === 'github' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bot className="mr-2 h-5 w-5 text-green-600" />
                        GitHub README Agent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        GitHub agent configuration will be available in the next update. This agent will help you:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Auto-generate README files for your repositories</li>
                        <li>• Analyze code and create documentation</li>
                        <li>• Monitor repository changes</li>
                        <li>• Provide automated updates</li>
                      </ul>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700" disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {selectedAgent === 'business' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bot className="mr-2 h-5 w-5 text-purple-600" />
                        Business Agent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Business agent configuration will be available in the next update. This agent will help you:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Automate client communications</li>
                        <li>• Schedule meetings and appointments</li>
                        <li>• Generate business reports</li>
                        <li>• Handle routine business tasks</li>
                      </ul>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700" disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Activity Feed */}
                <ActivityFeed activities={activities} />

            {/* More Agents Coming Soon */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">More AI Agents</CardTitle>
                <p className="text-sm text-gray-600">
                  New intelligent agents coming soon to help with your job search
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Resume Optimizer</p>
                    <p className="text-xs text-gray-500">Coming Soon</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Search className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Job Matcher</p>
                    <p className="text-xs text-gray-500">Coming Soon</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Interview Prep</p>
                    <p className="text-xs text-gray-500">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
              </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
