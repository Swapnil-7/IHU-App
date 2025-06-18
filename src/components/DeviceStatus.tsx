// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Cpu, HardDrive, Wifi, Calendar, MapPin, Hash, Settings, Clock, Thermometer, Activity } from 'lucide-react';

const DeviceStatus: React.FC = () => {
  const [deviceData] = useState({
    manufacturer: 'FountLab',
    device: 'FL-MODGATE',
    deviceMacId: '0CB921EC68F4',
    wifiMac: '0C:B9:15:4E:68:F4',
    sdkVersion: 'v4.4.2',
    firmwareName: 'MODGATE',
    firmwareVersion: '2.0.12',
    firmwareBuildDate: '01/01/2024',
    network: 'Aquasen-4EC7F8',
    wifiIP: '192.168.0.12'
  });

  // const [systemMetrics, setSystemMetrics] = useState({
  //   cpuUsage: 23,
  //   memoryUsage: 67,
  //   temperature: 42,
  //   uptime: '2d 14h 32m'
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSystemMetrics(prev => ({
  //       ...prev,
  //       cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
  //       memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 5)),
  //       temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 3)),
  //     }));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const deviceInfo = [
    { label: 'Manufacturer', value: deviceData.manufacturer, icon: Settings },
    { label: 'Device', value: deviceData.device, icon: Cpu },
    { label: 'Device MAC ID', value: deviceData.deviceMacId, icon: Hash },
    { label: 'WiFi MAC', value: deviceData.wifiMac, icon: Wifi },
    { label: 'SDK Version', value: deviceData.sdkVersion, icon: HardDrive },
    { label: 'Firmware Name', value: deviceData.firmwareName, icon: Settings },
    { label: 'Firmware Version', value: deviceData.firmwareVersion, icon: HardDrive },
    { label: 'Firmware Build Date', value: deviceData.firmwareBuildDate, icon: Calendar },
    { label: 'Network', value: deviceData.network, icon: Wifi },
    { label: 'WiFi IP', value: deviceData.wifiIP, icon: MapPin },
  ];

  // const getMetricColor = (value: number, type: string) => {
  //   if (type === 'temperature') {
  //     if (value > 55) return 'text-red-600 bg-red-100';
  //     if (value > 45) return 'text-orange-600 bg-orange-100';
  //     return 'text-green-600 bg-green-100';
  //   }
    
  //   if (value > 80) return 'text-red-600 bg-red-100';
  //   if (value > 60) return 'text-orange-600 bg-orange-100';
  //   return 'text-green-600 bg-green-100';
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100 justify-items-center">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Device Status</h1>
            {/* <p className="text-gray-600">Real-time device information and system metrics</p> */}
          </div>
          {/* <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Online</span>
          </div> */}
        </div>

        {/* System Metrics */}
      </div>

      {/* Device Information */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
            <Activity className="h-6 w-6 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Device Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {deviceInfo.map((info, index) => (
            <div key={index} className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                  <info.icon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">{info.label}</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900 truncate">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;