import React, { useEffect, useState } from "react";
import {  DevConfig } from "../types/device"; // Assuming logstorage/logsend are 'number' here
import deviceService from '../services/deviceService';
import { Save } from "lucide-react";

const DeviceConfiguration: React.FC = () => {
    // State values for logstorage/logsend will be 0 or 1, matching GeneralConfig
    const [devData, setDevData] = useState<DevConfig>({
     urate: 0,
     modaddr: 0,
     stinterval: 0,
    
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // This handleInputChange is now more flexible, accepting 'number' for toggles.
    const handleInputChange = <T extends keyof DevConfig>(
        field: T,
        value: DevConfig[T]
    ) => {
        setDevData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        console.log('Device configuration:', devData);
        setLoading(true);

        const dataToSend = { ...devData }; 

        try {
            await deviceService.setDeviceConfig(dataToSend);
            alert('Device configuration saved successfully!');
            console.log('Device configuration saved successfully!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Failed to save Device configuration:", err);
            setError(err.message || "An unknown error occurred.");
            alert(`Failed to save Device configuration: ${err.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
         setLoading(true);
      setTimeout(() => {
        
      
        const fetchDeviceConfig = async () => {
           
            
                
            
            try {
                setError(null);
                const data = await deviceService.getDeviceConfig();
                // When fetching, ensure incoming data aligns with GeneralConfig type.
                // Assuming data.logstorage and data.logsend are already 0 or 1 from API.
               setDevData(data); // Directly set the data as types match
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error("Failed to fetch Device Configuration:", err);
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchDeviceConfig();
        }, 2000);
        
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="space-y-6 relative">
             
            {loading && (
                <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className=" logo-loader  object-contain mix-blend-darken " />
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
               
               
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Device Configuration</h1>
                        <p className="text-gray-600">Configure Device Settings</p>
                    </div>
                </div>

                {/* Error message display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                {/* General Configuration Fields */}
                <div className="space-y-6 opacity-100 transition-opacity duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="urate" className="block text-sm font-medium text-gray-700 mb-2">Update Rate</label>
                            <input
                                id="urate"
                                type='number'
                                value={devData.urate}
                                onChange={(e) => handleInputChange('urate', e.target.valueAsNumber)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="modaddr" className="block text-sm font-medium text-gray-700 mb-2">Mod Address</label>
                            <input
                                id="modaddr"
                                type="number"
                                value={devData.modaddr}
                                onChange={(e) => handleInputChange('modaddr', e.target.valueAsNumber)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="stinterval" className="block text-sm font-medium text-gray-700 mb-2">Server URL</label>
                            <input
                                id="stinterval"
                                type="number"
                                value={devData.stinterval}
                                onChange={(e) => handleInputChange('stinterval', e.target.valueAsNumber)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        
                    </div>

                   

                        
                    </div>

                    <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        disabled={loading}
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save Configuration
                    </button>
                </div>
                </div>

                {/* Save Button */}
                
            </div>
        
    );
};

export default DeviceConfiguration;