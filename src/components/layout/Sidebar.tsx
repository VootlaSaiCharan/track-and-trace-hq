
import React from 'react';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Building2, 
  FileText,
  Settings
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: any;
}

const Sidebar = ({ activeTab, setActiveTab, currentUser }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'department_head', 'employee'] },
    { id: 'assets', label: 'Assets', icon: Package, roles: ['admin', 'department_head'] },
    { id: 'employees', label: 'Employees', icon: Users, roles: ['admin', 'department_head'] },
    { id: 'departments', label: 'Departments', icon: Building2, roles: ['admin'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['admin', 'department_head'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(currentUser?.role)
  );

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Asset Tracker</h2>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-medium",
                activeTab === item.id 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
          <p className="text-xs text-gray-500">{currentUser?.department}</p>
          <div className="mt-1">
            <span className={cn(
              "inline-block px-2 py-1 text-xs font-medium rounded-full",
              currentUser?.role === 'admin' ? "bg-red-100 text-red-800" :
              currentUser?.role === 'department_head' ? "bg-blue-100 text-blue-800" :
              "bg-green-100 text-green-800"
            )}>
              {currentUser?.role?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
