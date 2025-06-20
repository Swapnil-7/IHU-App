import React, { useEffect, useState } from "react";
import { GeneralConfig } from "../types/device"; // Assuming logstorage/logsend are 'number' here
import deviceService from '../services/deviceService';
import { Save } from "lucide-react";

const GeneralSettings: React.FC = () => {
    // State values for logstorage/logsend will be 0 or 1, matching GeneralConfig
    const [generalData, setGeneralData] = useState<GeneralConfig>({
        hostname: '',
        lattitude: '',
        longitude: '',
        sitename: '',
        clientname: '',
        logstorage: 0, // Initialize as 0 (off)
        logsend: 0,   // Initialize as 0 (off)
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // This handleInputChange is now more flexible, accepting 'number' for toggles.
    const handleInputChange = <T extends keyof GeneralConfig>(
        field: T,
        value: GeneralConfig[T]
    ) => {
        setGeneralData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        console.log('Attempting to save settings:', generalData);
        setLoading(true);

        // No need for explicit boolean to 0/1 conversion here,
        // as state already holds 0 or 1.
        // The dataToSend is simply generalData.
        const dataToSend = { ...generalData }; // TypeScript will infer types correctly if GeneralConfig is 'number'

        try {
            await deviceService.setGnConfig(dataToSend);
            alert('General settings saved successfully!');
            console.log('General settings saved successfully!');
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
        
      
        const fetchGeneralSettings = async () => {
           
            
                
            
            try {
                setError(null);
                const data = await deviceService.getGnConfig();
                // When fetching, ensure incoming data aligns with GeneralConfig type.
                // Assuming data.logstorage and data.logsend are already 0 or 1 from API.
                setGeneralData(data); // Directly set the data as types match
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error("Failed to fetch General setting:", err);
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchGeneralSettings();
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
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">General Settings</h1>
                        <p className="text-gray-600">Configure Device General Settings</p>
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
                            <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-2">Hostname</label>
                            <input
                                id="hostname"
                                type="text"
                                value={generalData.hostname}
                                onChange={(e) => handleInputChange('hostname', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="sitename" className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                            <input
                                id="sitename"
                                type="text"
                                value={generalData.sitename}
                                onChange={(e) => handleInputChange('sitename', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="clientname" className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input
                                id="clientname"
                                type="text"
                                value={generalData.clientname}
                                onChange={(e) => handleInputChange('clientname', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="lattitude" className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                            <input
                                id="lattitude"
                                type="text"
                                value={generalData.lattitude}
                                onChange={(e) => handleInputChange('lattitude', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                            <input
                                id="longitude"
                                type="text"
                                value={generalData.longitude}
                                onChange={(e) => handleInputChange('longitude', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>

                        {/* Log Storage Toggle */}
                        <div className="mt-5 ml-5">
                            <label htmlFor="logstorage-toggle" className="block text-sm font-medium text-gray-700 mb-2">Log Storage</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="logstorage-toggle"
                                    checked={generalData.logstorage === 1} // Check if value is 1
                                    onChange={(e) => handleInputChange('logstorage', e.target.checked ? 1 : 0)} // Convert boolean to 1 or 0
                                    className="sr-only peer"
                                    disabled={loading}
                                />
                                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:left-0.6 after:top-0.5 after:bg-white after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full " />
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {generalData.logstorage === 1 ? 'On' : 'Off'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Log Send Toggle */}
                        <div className=" ml-5">
                            <label htmlFor="logsend-toggle" className="block text-sm font-medium text-gray-700 mb-2">Log Send</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="logsend-toggle"
                                    checked={generalData.logsend === 1} // Check if value is 1
                                    onChange={(e) => handleInputChange('logsend', e.target.checked ? 1 : 0)} // Convert boolean to 1 or 0
                                    className="sr-only peer"
                                    disabled={loading}
                                />
                                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:left-0.6 after:top-0.5 after:bg-white after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full" />
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {generalData.logsend === 1 ? 'On' : 'Off'}
                                </span>
                            </label>
                        </div>
                        {/* Empty div for layout if needed, or remove this grid row if only one item */}
                        <div></div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:to-blue-700"
                        disabled={loading}
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;