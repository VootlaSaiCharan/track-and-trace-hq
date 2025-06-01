
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage';
import Dashboard from '../components/dashboard/Dashboard';
import AssetManagement from '../components/assets/AssetManagement';
import EmployeeManagement from '../components/employees/EmployeeManagement';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    const users = {
      'admin@company.com': { role: 'admin', name: 'John Admin', department: 'IT' },
      'dept.head@company.com': { role: 'department_head', name: 'Jane Head', department: 'HR' },
      'employee@company.com': { role: 'employee', name: 'Bob Employee', department: 'Sales' }
    };

    const user = users[email as keyof typeof users];
    if (user && password === 'password123') {
      setCurrentUser({ email, ...user });
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'assets':
        return <AssetManagement currentUser={currentUser} />;
      case 'employees':
        return <EmployeeManagement currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
      />
      <div className="flex-1 flex flex-col">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
