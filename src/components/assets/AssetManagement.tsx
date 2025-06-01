
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, UserPlus } from 'lucide-react';
import AssetModal from './AssetModal';
import AssignAssetModal from './AssignAssetModal';
import { useToast } from '../../hooks/use-toast';

interface AssetManagementProps {
  currentUser: any;
}

const AssetManagement = ({ currentUser }: AssetManagementProps) => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [assets, setAssets] = useState([
    {
      id: 'AST-001',
      name: 'MacBook Pro 16"',
      type: 'Laptop',
      serialNumber: 'MBP-2023-001',
      status: 'Assigned',
      assignedTo: 'Sarah Johnson',
      department: 'Engineering',
      purchaseDate: '2023-01-15',
      warrantyExpiry: '2026-01-15'
    },
    {
      id: 'AST-002', 
      name: 'Dell Monitor 27"',
      type: 'Monitor',
      serialNumber: 'DM-2023-045',
      status: 'Available',
      assignedTo: null,
      department: null,
      purchaseDate: '2023-03-10',
      warrantyExpiry: '2026-03-10'
    },
    {
      id: 'AST-003',
      name: 'Wireless Mouse',
      type: 'Accessory',
      serialNumber: 'WM-2023-089',
      status: 'Maintenance',
      assignedTo: null,
      department: null,
      purchaseDate: '2023-02-20',
      warrantyExpiry: '2025-02-20'
    }
  ]);

  const handleAddAsset = (assetData: any) => {
    const newAsset = {
      id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
      ...assetData,
      status: 'Available',
      assignedTo: null,
      department: null
    };
    setAssets([...assets, newAsset]);
    toast({
      title: "Asset Added",
      description: `${assetData.name} has been successfully added.`,
    });
  };

  const handleEditAsset = (assetData: any) => {
    setAssets(assets.map(asset => 
      asset.id === selectedAsset?.id ? { ...asset, ...assetData } : asset
    ));
    toast({
      title: "Asset Updated",
      description: `${assetData.name} has been successfully updated.`,
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
    toast({
      title: "Asset Deleted",
      description: "The asset has been successfully deleted.",
    });
  };

  const handleAssignAsset = (assetId: string, assignmentData: any) => {
    setAssets(assets.map(asset => 
      asset.id === assetId 
        ? { 
            ...asset, 
            status: 'Assigned',
            assignedTo: assignmentData.employeeName,
            department: assignmentData.department
          }
        : asset
    ));
    toast({
      title: "Asset Assigned",
      description: `Asset has been assigned to ${assignmentData.employeeName}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Assigned': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Asset Management</h2>
          <p className="text-gray-600">Manage and track all organizational assets</p>
        </div>
        <Button onClick={() => setShowAssetModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Assets List</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assets..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Asset ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{asset.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{asset.name}</p>
                        <p className="text-sm text-gray-500">{asset.serialNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{asset.type}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {asset.assignedTo ? (
                        <div>
                          <p className="font-medium text-gray-900">{asset.assignedTo}</p>
                          <p className="text-sm text-gray-500">{asset.department}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedAsset(asset);
                            setShowAssetModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {asset.status === 'Available' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowAssignModal(true);
                            }}
                          >
                            <UserPlus className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAsset(asset.id)}
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

      <AssetModal
        isOpen={showAssetModal}
        onClose={() => {
          setShowAssetModal(false);
          setSelectedAsset(null);
        }}
        onSubmit={selectedAsset ? handleEditAsset : handleAddAsset}
        asset={selectedAsset}
      />

      <AssignAssetModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedAsset(null);
        }}
        onSubmit={(data) => handleAssignAsset(selectedAsset?.id, data)}
        asset={selectedAsset}
      />
    </div>
  );
};

export default AssetManagement;
