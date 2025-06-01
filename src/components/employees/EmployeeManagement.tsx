
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, Filter, Edit, Trash2, Package } from 'lucide-react';
import EmployeeModal from './EmployeeModal';
import { useToast } from '../../hooks/use-toast';

interface EmployeeManagementProps {
  currentUser: any;
}

const EmployeeManagement = ({ currentUser }: EmployeeManagementProps) => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      role: 'employee',
      assignedAssets: ['MacBook Pro 16"', 'Wireless Mouse'],
      joinDate: '2023-01-15'
    },
    {
      id: 'EMP-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Design',
      role: 'employee',
      assignedAssets: ['iMac 27"'],
      joinDate: '2023-02-10'
    },
    {
      id: 'EMP-003',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      department: 'Marketing',
      role: 'department_head',
      assignedAssets: ['iPad Pro', 'MacBook Air'],
      joinDate: '2022-11-20'
    }
  ]);

  const handleAddEmployee = (employeeData: any) => {
    const newEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      ...employeeData,
      assignedAssets: [],
      joinDate: new Date().toISOString().split('T')[0]
    };
    setEmployees([...employees, newEmployee]);
    toast({
      title: "Employee Added",
      description: `${employeeData.name} has been successfully added.`,
    });
  };

  const handleEditEmployee = (employeeData: any) => {
    setEmployees(employees.map(employee => 
      employee.id === selectedEmployee?.id ? { ...employee, ...employeeData } : employee
    ));
    toast({
      title: "Employee Updated",
      description: `${employeeData.name} has been successfully updated.`,
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(employee => employee.id !== employeeId));
    toast({
      title: "Employee Deleted",
      description: "The employee has been successfully deleted.",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'department_head': return 'bg-blue-100 text-blue-800';
      case 'employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600">Manage employee information and asset assignments</p>
        </div>
        <Button onClick={() => setShowEmployeeModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Employees List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Employee ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Assigned Assets</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{employee.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{employee.department}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(employee.role)}`}>
                        {employee.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {employee.assignedAssets.length} asset{employee.assignedAssets.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {employee.assignedAssets.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500 truncate">
                            {employee.assignedAssets.join(', ')}
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowEmployeeModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmployeeModal
        isOpen={showEmployeeModal}
        onClose={() => {
          setShowEmployeeModal(false);
          setSelectedEmployee(null);
        }}
        onSubmit={selectedEmployee ? handleEditEmployee : handleAddEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
