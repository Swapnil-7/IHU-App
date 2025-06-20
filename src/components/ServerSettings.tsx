import React, { useEffect, useState } from "react";
import {  ServerConfig } from "../types/device"; // Assuming logstorage/logsend are 'number' here
import deviceService from '../services/deviceService';
import { Save } from "lucide-react";

const ServerSettings: React.FC = () => {
    // State values for logstorage/logsend will be 0 or 1, matching GeneralConfig
    const [serverData, setServerData] = useState<ServerConfig>({
     serverIP: '',
     port: 0,
     serverURL: '',
     token: ''
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // This handleInputChange is now more flexible, accepting 'number' for toggles.
    const handleInputChange = <T extends keyof ServerConfig>(
        field: T,
        value: ServerConfig[T]
    ) => {
        setServerData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        console.log('Attempting to save settings:', serverData);
        setLoading(true);

        const dataToSend = { ...serverData }; 

        try {
            await deviceService.setServerSettings(dataToSend);
            alert('Server settings saved successfully!');
            console.log('Server settings saved successfully!');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Failed to save General settings:", err);
            setError(err.message || "An unknown error occurred.");
            alert(`Failed to save settings: ${err.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
         setLoading(true);
      setTimeout(() => {
        
      
        const fetchServerSettings = async () => {
           
            
                
            
            try {
                setError(null);
                const data = await deviceService.getServerSettings();
                // When fetching, ensure incoming data aligns with GeneralConfig type.
                // Assuming data.logstorage and data.logsend are already 0 or 1 from API.
                setServerData(data); // Directly set the data as types match
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error("Failed to fetch Server setting:", err);
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchServerSettings();
        }, 2000);
        
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="space-y-6 relative">
            {loading && (
                <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <img src="/src/assets/images/FountLab_Logo.png" alt="Loading..." className=" logo-loader  object-contain mix-blend-darken " />
                </div>
            )}  
            
          
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
               
               
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Server Settings</h1>
                        <p className="text-gray-600">Configure Device Server Settings</p>
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
                            <label htmlFor="serverIP" className="block text-sm font-medium text-gray-700 mb-2">Server IP</label>
                            <input
                                id="serverIP"
                                type="text"
                                value={serverData.serverIP}
                                onChange={(e) => handleInputChange('serverIP', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                            <input
                                id="port"
                                type="number"
                                value={serverData.port}
                                onChange={(e) => handleInputChange('port', e.target.valueAsNumber)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-2">Server URL</label>
                            <input
                                id="serverURL"
                                type="text"
                                value={serverData.serverURL}
                                onChange={(e) => handleInputChange('serverURL', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">token</label>
                            <input
                                id="token"
                                type="text"
                                value={serverData.token}
                                onChange={(e) => handleInputChange('token', e.target.value)}
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

export default ServerSettings;