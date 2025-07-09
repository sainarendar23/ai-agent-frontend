import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Briefcase, Plus, Settings } from "lucide-react";

interface AgentSelectorProps {
  onAgentSelect: (agentType: string) => void;
  activeAgents: string[];
}

const AGENT_TYPES = [
  {
    id: "gmail",
    name: "Gmail Reply Agent",
    description: "Automate email responses for job applications",
    icon: Mail,
    color: "blue",
    features: [
      "Smart email analysis",
      "Automated professional replies", 
      "Resume attachment handling",
      "Priority email detection"
    ]
  },
  {
    id: "github",
    name: "GitHub README Agent", 
    description: "Generate and maintain project documentation",
    icon: Github,
    color: "green",
    features: [
      "Auto-generate README files",
      "Code analysis & documentation",
      "Repository monitoring", 
      "Automated updates"
    ]
  },
  {
    id: "business",
    name: "Business Agent",
    description: "Automate business communications & workflows",
    icon: Briefcase,
    color: "purple", 
    features: [
      "Client communication",
      "Meeting scheduling",
      "Report generation",
      "Task automation"
    ]
  }
];

export default function AgentSelector({ onAgentSelect, activeAgents }: AgentSelectorProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const getColorClasses = (color: string, isActive: boolean, isSelected: boolean) => {
    const colors = {
      blue: {
        border: isSelected ? 'border-blue-500' : isActive ? 'border-blue-300' : 'border-gray-200',
        bg: isActive ? 'bg-blue-50' : 'bg-white',
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        border: isSelected ? 'border-green-500' : isActive ? 'border-green-300' : 'border-gray-200',
        bg: isActive ? 'bg-green-50' : 'bg-white',
        icon: 'bg-green-100 text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        border: isSelected ? 'border-purple-500' : isActive ? 'border-purple-300' : 'border-gray-200',
        bg: isActive ? 'bg-purple-50' : 'bg-white',
        icon: 'bg-purple-100 text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your AI Agents</h2>
        <p className="text-gray-600">Select and configure the agents that fit your workflow needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {AGENT_TYPES.map((agent) => {
          const isActive = activeAgents.includes(agent.id);
          const isSelected = selectedAgent === agent.id;
          const colors = getColorClasses(agent.color, isActive, isSelected);
          const Icon = agent.icon;

          return (
            <Card 
              key={agent.id}
              className={`relative transition-all duration-300 hover:shadow-lg cursor-pointer ${colors.border} ${colors.bg}`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <p className="text-sm text-gray-600">{agent.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  {agent.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-${agent.color}-500`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {isActive ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAgentSelect(agent.id);
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full ${colors.button}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAgentSelect(agent.id);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Agent
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          You can activate multiple agents and switch between them anytime.
        </p>
      </div>
    </div>
  );
}