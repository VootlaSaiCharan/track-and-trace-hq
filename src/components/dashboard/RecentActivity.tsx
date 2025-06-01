
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Package, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      asset: 'MacBook Pro 16"',
      employee: 'Sarah Johnson',
      department: 'Engineering',
      date: '2 hours ago',
      status: 'assigned'
    },
    {
      id: 2,
      type: 'return',
      asset: 'Wireless Mouse',
      employee: 'Mike Chen',
      department: 'Design',
      date: '5 hours ago',
      status: 'returned'
    },
    {
      id: 3,
      type: 'maintenance',
      asset: 'Dell Monitor 27"',
      employee: 'IT Support',
      department: 'IT',
      date: '1 day ago',
      status: 'maintenance'
    },
    {
      id: 4,
      type: 'assignment',
      asset: 'iPad Pro',
      employee: 'Emma Davis',
      department: 'Marketing',
      date: '2 days ago',
      status: 'assigned'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return Package;
      case 'return': return ArrowRight;
      case 'maintenance': return Activity;
      default: return Package;
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-500" />
            Recent Activity
          </span>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.asset}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{activity.employee}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{activity.department}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
