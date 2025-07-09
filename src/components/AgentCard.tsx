import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Square, ExternalLink } from "lucide-react";

interface AgentCardProps {
  credentials: {
    resumeLink: string;
    personalDescription: string;
    openaiApiKey: string;
    agentActive: boolean;
  };
  onCredentialsChange: (credentials: any) => void;
  onSave: () => void;
  onToggleAgent: () => void;
  onGmailConnect: () => void;
  isUpdating: boolean;
  isToggling: boolean;
  gmailConnected: boolean;
}

export default function AgentCard({
  credentials,
  onCredentialsChange,
  onSave,
  onToggleAgent,
  onGmailConnect,
  isUpdating,
  isToggling,
  gmailConnected,
}: AgentCardProps) {
  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Email Assistant Agent</CardTitle>
              <p className="text-sm text-gray-600">
                Automated job application email responses
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={credentials.agentActive ? "default" : "secondary"}>
              {credentials.agentActive ? "Active" : "Inactive"}
            </Badge>
            <Button
              size="sm"
              onClick={onToggleAgent}
              disabled={isToggling}
              variant={credentials.agentActive ? "destructive" : "default"}
            >
              {isToggling ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : credentials.agentActive ? (
                <>
                  <Square className="h-4 w-4 mr-1" />
                  Stop Agent
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Start Agent
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="resumeLink">Resume Link</Label>
          <Input
            id="resumeLink"
            type="url"
            placeholder="https://drive.google.com/file/d/your-resume-link"
            value={credentials.resumeLink}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, resumeLink: e.target.value })
            }
          />
        </div>
        
        <div>
          <Label htmlFor="personalDescription">Personal Description</Label>
          <Textarea
            id="personalDescription"
            rows={3}
            placeholder="Brief description about yourself (used for generating personalized responses)"
            value={credentials.personalDescription}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, personalDescription: e.target.value })
            }
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
            <Input
              id="openaiApiKey"
              type="password"
              placeholder="sk-..."
              value={credentials.openaiApiKey}
              onChange={(e) =>
                onCredentialsChange({ ...credentials, openaiApiKey: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="gmailConnect">Gmail Access</Label>
            <Button
              id="gmailConnect"
              variant={gmailConnected ? "outline" : "default"}
              className="w-full"
              onClick={onGmailConnect}
            >
              {gmailConnected ? (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connected
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Connect Gmail
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
