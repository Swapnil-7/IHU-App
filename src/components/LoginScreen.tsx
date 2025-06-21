import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import deviceService from '../services/deviceService'; // Import deviceService
import { LoginResponse } from '../types/device'; // Import LoginResponse interface

interface LoginScreenProps {
  onLogin: (authenticated: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null); // Clear previous errors

    console.log(" login Success:", { username, password });

    // --- Correctly place setTimeout around the async login logic ---
    await new Promise(resolve => {
      setTimeout(async () => { // Make this callback async
        try {
          const data = { username, password };
          const result : LoginResponse = await deviceService.getLogin(data); // Call your API

          if (result.sts === true) {
            console.log("Login successful:", result);
            onLogin(true); // Notify App component of successful login
          } else {
            const errorMessage = result.message || 'Login failed. Please check your credentials.';
            setLoginError(errorMessage); // Set specific error message
            onLogin(false); // Notify App component of failed login
            console.error("Login failed:", errorMessage);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // Handle network errors or other exceptions
          console.error("Login API error:", error);
          setLoginError(error.message || 'An unexpected error occurred during login. Please try again.');
          onLogin(false); // Ensure authentication state is false on error
        } finally {
          setIsLoading(false); // Always stop loading, regardless of success or failure
          resolve(true); // Resolve the promise to allow `await` to continue
        }
      }, 2000); // 2-second delay for the loader
    });
    // The code after this `await` will execute only after the setTimeout callback finishes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Loader overlay - only visible when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          {/* Ensure the path to your image is correct */}
          {/* If the FountLab_Logo.png is in 'public' folder, use /FountLab_Logo.png */}
          {/* If it's imported from src/assets/images, ensure you import it first:
              import FountLabLogo from '../assets/images/FountLab_Logo.png';
              and then use src={FountLabLogo}
          */}
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

          {/* Display login error if any */}
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}

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
                  disabled={isLoading} // Disable input during loading
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
                  disabled={isLoading} // Disable input during loading
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading} // Disable toggle during loading
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