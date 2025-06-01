
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import RecentActivity from './RecentActivity';

interface DashboardProps {
  currentUser: any;
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  const stats = [
    {
      title: 'Total Assets',
      value: '247',
      icon: Package,
      color: 'bg-blue-500',
      change: '+12 this month'
    },
    {
      title: 'Assigned Assets',
      value: '189',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8 this week'
    },
    {
      title: 'Available Assets',
      value: '58',
      icon: Package,
      color: 'bg-purple-500',
      change: '4 pending assignment'
    },
    {
      title: 'Active Employees',
      value: '142',
      icon: Users,
      color: 'bg-orange-500',
      change: '3 departments'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your asset management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Maintenance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">MacBook Pro #MP-2021-045</p>
                  <p className="text-sm text-gray-600">Warranty expires in 15 days</p>
                </div>
                <span className="text-amber-600 text-sm font-medium">Action Required</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dell Monitor #DM-2020-089</p>
                  <p className="text-sm text-gray-600">Warranty expired 5 days ago</p>
                </div>
                <span className="text-red-600 text-sm font-medium">Overdue</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">iPhone 14 #IP-2023-012</p>
                  <p className="text-sm text-gray-600">Scheduled maintenance tomorrow</p>
                </div>
                <span className="text-blue-600 text-sm font-medium">Upcoming</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
