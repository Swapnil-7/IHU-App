// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AdminDashboard: React.FC = () => {
  const [adminPasswords, setAdminPasswords] = useState({
    adminPassword: '',
    confirmPassword: '',
  });
  const [enableTelnet, setEnableTelnet] = useState(false); // State for TELNET toggle
  const [firmwareFile, setFirmwareFile] = useState<File | null>(null); // State for firmware file upload

  const handlePasswordChange = (field: string, value: string) => {
    setAdminPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = () => {
    if (adminPasswords.adminPassword === adminPasswords.confirmPassword) {
      console.log('Admin Password updated:', adminPasswords.adminPassword);
      // Implement password update logic here
      alert('Admin password changed successfully!');
      setAdminPasswords({ adminPassword: '', confirmPassword: '' }); // Clear fields after submission
    } else {
      alert('Passwords do not match!');
    }
  };

  const handleTelnetToggle = (value: boolean) => {
    setEnableTelnet(value);
    console.log('TELNET Enabled:', value);
    // Implement TELNET enable/disable logic here
  };

  const handleFirmwareFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFirmwareFile(e.target.files[0]);
    } else {
      setFirmwareFile(null);
    }
  };

  const handleFirmwareUpgrade = () => {
    if (firmwareFile) {
      console.log('Firmware file selected:', firmwareFile.name);
      alert(`Initiating firmware upgrade with file: ${firmwareFile.name}`);
      // Implement firmware upload and upgrade logic here
    } else {
      alert('Please select a firmware file to upgrade.');
    }
  };

  const handleBackup = () => {
    console.log('Performing backup...');
    alert('Backup initiated!');
    // Implement backup logic
  };

  const handleRestore = () => {
    console.log('Performing restore...');
    alert('Restore initiated!');
    // Implement restore logic
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to perform a Factory Reset? This action cannot be undone.')) {
      console.log('Performing factory reset...');
      alert('Factory Reset initiated!');
      // Implement factory reset logic
    }
  };


  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-2">
          <div className="mb-6 border-b border-gray-200 pb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">ADMINISTRATION</h1> {/* Changed title */}
            <p className="text-gray-600">Configure administrative settings and system maintenance</p> {/* Updated description */}
          </div>
        </div>

        {/* Settings - Backup, Restore, Factory Reset */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
          <div className="flex flex-wrap items-center space-x-4">
            <button
              onClick={handleBackup}
              className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              Backup
            </button>
            <button
              onClick={handleRestore}
              className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              Restore
            </button>
            <button
              onClick={handleFactoryReset}
              className="flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              Factory Reset
            </button>
          </div>
        </div>

        {/* Admin Password */}
        <div className="mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Password</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">Admin Password</label>
              <input
                type="password"
                id="admin-password"
                value={adminPasswords.adminPassword}
                onChange={(e) => handlePasswordChange('adminPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={adminPasswords.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handlePasswordSubmit}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:shadow-xl  rounded-lg transition-all duration-200 shadow-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Enable TELNET */}
        <div className="mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enable TELNET</h2>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="telnet"
                value="yes"
                checked={enableTelnet === true}
                onChange={() => handleTelnetToggle(true)}
                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="telnet"
                value="no"
                checked={enableTelnet === false}
                onChange={() => handleTelnetToggle(false)}
                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
            <button
              onClick={() => console.log('TELNET setting applied:', enableTelnet ? 'Yes' : 'No')}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold hover:shadow-xl rounded-lg transition-all duration-200 shadow-md"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Firmware Upgrade */}
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Upgrade</h2>
          <div className="flex items-center">
            <input
              type="file"
              id="firmware-file"
              onChange={handleFirmwareFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100
                cursor-pointer
              "
            />
            {firmwareFile && <span className="text-gray-600">{firmwareFile.name}</span>}
            <button
              onClick={handleFirmwareUpgrade}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
            >
              Upgrade
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;