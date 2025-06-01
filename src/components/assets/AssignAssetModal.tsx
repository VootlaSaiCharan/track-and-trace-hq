
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AssignAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  asset?: any;
}

const AssignAssetModal = ({ isOpen, onClose, onSubmit, asset }: AssignAssetModalProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    assignmentDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<any>({});

  // Mock employee data
  const employees = [
    { name: 'Sarah Johnson', department: 'Engineering' },
    { name: 'Mike Chen', department: 'Design' },
    { name: 'Emma Davis', department: 'Marketing' },
    { name: 'John Smith', department: 'Sales' },
    { name: 'Lisa Wang', department: 'HR' }
  ];

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'IT', 'Finance'];

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.employeeName) newErrors.employeeName = 'Employee selection is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.assignmentDate) newErrors.assignmentDate = 'Assignment date is required';
    
    if (formData.assignmentDate && new Date(formData.assignmentDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.assignmentDate = 'Assignment date cannot be in the past';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmployeeChange = (employeeName: string) => {
    const employee = employees.find(emp => emp.name === employeeName);
    setFormData({
      ...formData,
      employeeName,
      department: employee?.department || ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
      setFormData({
        employeeName: '',
        department: '',
        assignmentDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Asset</DialogTitle>
          {asset && (
            <p className="text-sm text-gray-600">
              Assigning: <span className="font-medium">{asset.name}</span> ({asset.serialNumber})
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Select Employee</Label>
            <Select
              value={formData.employeeName}
              onValueChange={handleEmployeeChange}
            >
              <SelectTrigger className={errors.employeeName ? 'border-red-500' : ''}>
                <SelectValue placeholder="Choose an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.name} value={employee.name}>
                    {employee.name} - {employee.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employeeName && <p className="text-sm text-red-500">{errors.employeeName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignmentDate">Assignment Date</Label>
            <Input
              id="assignmentDate"
              type="date"
              value={formData.assignmentDate}
              onChange={(e) => setFormData({ ...formData, assignmentDate: e.target.value })}
              className={errors.assignmentDate ? 'border-red-500' : ''}
            />
            {errors.assignmentDate && <p className="text-sm text-red-500">{errors.assignmentDate}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Assign Asset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignAssetModal;
