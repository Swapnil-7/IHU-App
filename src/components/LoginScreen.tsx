import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import deviceService from '../services/deviceService'; // Import deviceService
import { LoginResponse } from '../types/device'; // Import LoginResponse interface
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

interface LoginScreenProps {
  onLogin: (authenticated: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Login attempt for:", { username, password });

    // Use a setTimeout to simulate API call delay for the loader only
    // The toast and navigation will happen after this artificial delay.
    setTimeout(async () => {
      try {
        const data = { username, password };
        const result: LoginResponse = await deviceService.getLogin(data); // Call your API

        if (result.sts === true) {
          console.log("Login successful:", result);
          // Show success toast immediately
          toast.success('Login successful! Redirecting...'); 
          
         setTimeout(() => {
          onLogin(true); // Notify App component of successful login, triggering navigation
          }, 1000); // 1 second delay
          
        } else {
          const errorMessage = result.message || 'Login failed. Please check your credentials.';
          toast.error(errorMessage); // Error toast
          onLogin(false); // Notify App component of failed login
          console.error("Login failed:", errorMessage);
          setIsLoading(false); // Stop loading immediately on error
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Login API error:", error);
        const errorMessage = error.message || 'An unexpected error occurred during login. Please try again.';
        toast.error(errorMessage); // Network/unexpected error toast
        onLogin(false); // Ensure authentication state is false on error
        setIsLoading(false); // Stop loading immediately on network error
      }
    }, 1000); // Simulate initial network delay for the loader (1 second)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Toaster component - essential for displaying toasts. It must be rendered here. */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 1000, // Show success toast for 1 second (it might be cut short by navigation)
            style: {
              background: '#22C55E', // Green-500
              color: '#fff',
            },
          },
          error: {
            duration: 1000, // Show error toast for 3 seconds
            style: {
              background: '#EF4444', // Red-500
              color: '#fff',
            },
          },
        }}
      />

      {/* Loader overlay - only visible when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className="logo-loader object-contain mix-blend-darken" />
        </div>
      )}

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 ">
              <img src="/src/assets/images/FountLab_Logo1.png" alt="Logo" className="h-12 object-contain mix-blend-darken mb-1" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">FountLab</h1>
            <p className="text-gray-600">Sign in to manage your network device</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Secure device access • SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;