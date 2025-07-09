import { Card, CardContent } from "@/components/ui/card";
import { Mail, Reply, Star, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  stats: {
    emailsProcessed: number;
    autoReplies: number;
    starredEmails: number;
    successRate: number;
  } | undefined;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const defaultStats = {
    emailsProcessed: 0,
    autoReplies: 0,
    starredEmails: 0,
    successRate: 0,
  };

  const data = stats || defaultStats;

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emails Processed</p>
              <p className="text-2xl font-bold text-gray-900">{data.emailsProcessed}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Auto Replies</p>
              <p className="text-2xl font-bold text-gray-900">{data.autoReplies}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Reply className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Starred Important</p>
              <p className="text-2xl font-bold text-gray-900">{data.starredEmails}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{data.successRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
