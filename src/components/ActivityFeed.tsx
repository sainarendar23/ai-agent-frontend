import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Reply, Star, Check, AlertCircle } from "lucide-react";
import api from "../api";

api.get("/credentials"); // ✅ Automatically uses baseURL from .env


interface Activity {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  metadata?: any;
}

interface ActivityFeedProps {
  activities: Activity[] | undefined;
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email_reply':
        return <Reply className="h-4 w-4 text-blue-600" />;
      case 'email_star':
        return <Star className="h-4 w-4 text-yellow-600" />;
      case 'agent_start':
      case 'agent_stop':
        return <Check className="h-4 w-4 text-emerald-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'email_reply':
        return 'bg-blue-100';
      case 'email_star':
        return 'bg-yellow-100';
      case 'agent_start':
      case 'agent_stop':
        return 'bg-emerald-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (!activities || activities.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-1">
              Start your agent to see activity here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">
                  {activity.description}
                </p>
                {activity.metadata?.from && (
                  <p className="text-xs text-gray-500 truncate">
                    from {activity.metadata.from}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
