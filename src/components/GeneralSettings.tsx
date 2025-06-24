import React, { useEffect, useState } from "react";
import { GeneralConfig } from "../types/device";
import deviceService from '../services/deviceService';
import { Save, Computer, MapPin, Building, User, HardDrive, Share2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const GeneralSettings: React.FC = () => {
    const [generalData, setGeneralData] = useState<GeneralConfig>({
        hostname: '',
        lattitude: '',
        longitude: '',
        sitename: '',
        clientname: '',
        logstorage: 0,
        logsend: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);

    const handleInputChange = <T extends keyof GeneralConfig>(
        field: T,
        value: GeneralConfig[T]
    ) => {
        setGeneralData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        console.log('Attempting to save settings:', generalData);
        setLoading(true);

        const dataToSend = { ...generalData };

        try {
            const response = await deviceService.setGnConfig(dataToSend);
            if (response && response.sts === true) {
                toast.success('General settings saved successfully!');
                console.log('General settings saved successfully!');
            } else {
                const errorMessage = response?.message || 'Failed to save settings: API returned an error.';
                toast.error(errorMessage);
                console.error('Failed to save General settings:', errorMessage);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Failed to save General settings:", err);
            const errorMessage = err.message || "An unknown error occurred while saving settings.";
            toast.error(`Failed to save settings: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchGeneralSettings = async () => {
            try {
                const data = await deviceService.getGnConfig();
                setGeneralData(data);
                toast.success('General settings loaded successfully!');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error("Failed to fetch General setting:", err);
                const errorMessage = err.message || "An unknown error occurred while fetching settings.";
                toast.error(`Failed to load settings: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchGeneralSettings();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-6 relative">
            
            {loading && (
                <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className=" logo-loader object-contain mix-blend-darken " />
                </div>
            )}

            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        duration: 1000,
                        style: {
                            background: '#22C55E',
                            color: '#fff',
                        },
                    },
                    error: {
                        duration: 1000,
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                    },
                }}
            />

            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">General Settings</h1>
                        <p className="text-gray-600">Configure Device General Settings</p>
                    </div>
                </div>

                {/* General Configuration Fields */}
                <div className="space-y-6 opacity-100 transition-opacity duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Hostname */}
                        <div>
                            {/* NEW: Label with icon */}
                            <label htmlFor="hostname" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Computer className="h-5 w-5 mr-2 text-gray-500" /> Hostname
                            </label>
                            <input
                                id="hostname"
                                type="text"
                                value={generalData.hostname}
                                onChange={(e) => handleInputChange('hostname', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        {/* Site Name */}
                        <div>
                            {/* NEW: Label with icon */}
                            <label htmlFor="sitename" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Building className="h-5 w-5 mr-2 text-gray-500" /> Site Name
                            </label>
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
                        {/* Client Name */}
                        <div>
                            {/* NEW: Label with icon */}
                            <label htmlFor="clientname" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <User className="h-5 w-5 mr-2 text-gray-500" /> Client Name
                            </label>
                            <input
                                id="clientname"
                                type="text"
                                value={generalData.clientname}
                                onChange={(e) => handleInputChange('clientname', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                disabled={loading}
                            />
                        </div>
                        {/* Latitude */}
                        <div>
                            {/* NEW: Label with icon */}
                            <label htmlFor="lattitude" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="h-5 w-5 mr-2 text-gray-500" /> Latitude
                            </label>
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
                        {/* Longitude */}
                        <div>
                            {/* NEW: Label with icon */}
                            <label htmlFor="longitude" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="h-5 w-5 mr-2 text-gray-500" /> Longitude
                            </label>
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
                            {/* NEW: Label with icon */}
                            <label htmlFor="logstorage-toggle" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <HardDrive className="h-5 w-5 mr-2 text-gray-500" /> Log Storage
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="logstorage-toggle"
                                    checked={generalData.logstorage === 1}
                                    onChange={(e) => handleInputChange('logstorage', e.target.checked ? 1 : 0)}
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
                        <div className="ml-5">
                            {/* NEW: Label with icon */}
                            <label htmlFor="logsend-toggle" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Share2 className="h-5 w-5 mr-2 text-gray-500" /> Log Send
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="logsend-toggle"
                                    checked={generalData.logsend === 1}
                                    onChange={(e) => handleInputChange('logsend', e.target.checked ? 1 : 0)}
                                    className="sr-only peer"
                                    disabled={loading}
                                />
                                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:left-0.6 after:top-0.5 after:bg-white after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full" />
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {generalData.logsend === 1 ? 'On' : 'Off'}
                                </span>
                            </label>
                        </div>
                        <div></div> {/* Keep for grid layout consistency if needed */}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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