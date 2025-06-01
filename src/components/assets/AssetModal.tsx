
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  asset?: any;
}

const AssetModal = ({ isOpen, onClose, onSubmit, asset }: AssetModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: ''
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || '',
        type: asset.type || '',
        serialNumber: asset.serialNumber || '',
        purchaseDate: asset.purchaseDate || '',
        warrantyExpiry: asset.warrantyExpiry || ''
      });
    } else {
      setFormData({
        name: '',
        type: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyExpiry: ''
      });
    }
    setErrors({});
  }, [asset, isOpen]);

  const assetTypes = ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Phone', 'Tablet', 'Accessory'];

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) newErrors.name = 'Asset name is required';
    if (!formData.type) newErrors.type = 'Asset type is required';
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (!formData.warrantyExpiry) newErrors.warrantyExpiry = 'Warranty expiry date is required';
    
    if (formData.purchaseDate && formData.warrantyExpiry) {
      if (new Date(formData.warrantyExpiry) <= new Date(formData.purchaseDate)) {
        newErrors.warrantyExpiry = 'Warranty expiry must be after purchase date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{asset ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter asset name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Asset Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                {assetTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input
              id="serialNumber"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              placeholder="Enter serial number"
              className={errors.serialNumber ? 'border-red-500' : ''}
            />
            {errors.serialNumber && <p className="text-sm text-red-500">{errors.serialNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              className={errors.purchaseDate ? 'border-red-500' : ''}
            />
            {errors.purchaseDate && <p className="text-sm text-red-500">{errors.purchaseDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="warrantyExpiry">Warranty Expiry Date</Label>
            <Input
              id="warrantyExpiry"
              type="date"
              value={formData.warrantyExpiry}
              onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
              className={errors.warrantyExpiry ? 'border-red-500' : ''}
            />
            {errors.warrantyExpiry && <p className="text-sm text-red-500">{errors.warrantyExpiry}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {asset ? 'Update Asset' : 'Add Asset'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssetModal;
