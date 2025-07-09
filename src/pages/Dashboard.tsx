import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import {
  Card, CardContent, CardHeader, CardTitle,
  Button, Input, Label, Textarea, Badge, Separator
} from "@/components/ui";
import {
  Bot, LogOut, FileText, Search, MessageSquare
} from "lucide-react";
import StatsCards from "@/components/StatsCards";
import ActivityFeed from "@/components/ActivityFeed";
import AgentCard from "@/components/AgentCard";
import AgentSelector from "@/components/AgentSelector";

// Replace this with your actual Render backend URL
const BACKEND_URL = "https://ai-agent-backend-b3p0.onrender.com";

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

  useEffect(() => {
    const savedAgent = localStorage.getItem("selectedAgent");
    if (savedAgent) {
      setSelectedAgent(savedAgent);
      setShowAgentSelector(false);
      localStorage.removeItem("selectedAgent");
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Redirecting...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = `${BACKEND_URL}/api/login`;
      }, 1000);
    }
  }, [user, isLoading, toast]);

  const handleAgentSelect = (agentType: string) => {
    setSelectedAgent(agentType);
    setShowAgentSelector(false);
    if (!activeAgents.includes(agentType)) {
      setActiveAgents([...activeAgents, agentType]);
    }
  };

  const handleBackToSelector = () => {
    setShowAgentSelector(true);
    setSelectedAgent(null);
  };

  const { data: userCredentials, isLoading: credentialsLoading } = useQuery({
    queryKey: ["/credentials"],
    enabled: !!user,
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Redirecting...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = `${BACKEND_URL}/api/login`;
        }, 1000);
      }
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["/stats"],
    enabled: !!user,
  });

  const { data: activities } = useQuery({
    queryKey: ["/activities"],
    enabled: !!user,
  });

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

  const updateCredentialsMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/credentials", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/credentials"] });
      toast({ title: "Updated", description: "Credentials updated." });
    },
  });

  const startAgentMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/agent/start");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/credentials"] });
      queryClient.invalidateQueries({ queryKey: ["/activities"] });
      toast({ title: "Agent started" });
    },
  });

  const stopAgentMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/agent/stop");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/credentials"] });
      queryClient.invalidateQueries({ queryKey: ["/activities"] });
      toast({ title: "Agent stopped" });
    },
  });

  const handleSaveCredentials = () => {
    updateCredentialsMutation.mutate(credentials);
  };

  const handleToggleAgent = () => {
    credentials.agentActive ? stopAgentMutation.mutate() : startAgentMutation.mutate();
  };

  const handleGmailConnect = async () => {
    try {
      const response = await apiRequest("GET", "/gmail/auth");
      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (error) {
      toast({
        title: "Gmail Connect Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    window.location.href = `${BACKEND_URL}/api/logout`;
  };

  if (isLoading || credentialsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobFlow AI</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${credentials.agentActive ? 'text-green-600' : 'text-gray-500'}`}>
              {credentials.agentActive ? "Agent Active" : "Agent Inactive"}
            </span>
            <img
              src={user?.profileImageUrl || "https://via.placeholder.com/32"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{user?.firstName || user?.email}</span>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {showAgentSelector ? (
          <AgentSelector
            onAgentSelect={handleAgentSelect}
            activeAgents={activeAgents}
          />
        ) : (
          <>
            <Button variant="outline" onClick={handleBackToSelector}>
              ← Back to Agent Selection
            </Button>
            <h1 className="text-2xl font-bold mt-6 mb-2 capitalize">
              {selectedAgent} Agent Configuration
            </h1>
            <StatsCards stats={stats} />
            <div className="grid lg:grid-cols-3 gap-8 mt-6">
              <div className="lg:col-span-2">
                {selectedAgent === "gmail" && (
                  <AgentCard
                    credentials={credentials}
                    onCredentialsChange={setCredentials}
                    onSave={handleSaveCredentials}
                    onToggleAgent={handleToggleAgent}
                    onGmailConnect={handleGmailConnect}
                    isUpdating={updateCredentialsMutation.isPending}
                    isToggling={
                      startAgentMutation.isPending || stopAgentMutation.isPending
                    }
                    gmailConnected={
                      userCredentials?.gmailAccessToken === "connected"
                    }
                  />
                )}
              </div>
              <div>
                <ActivityFeed activities={activities} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
