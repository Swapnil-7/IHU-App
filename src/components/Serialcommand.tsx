// src/components/SerialCommand.tsx
import React, { useState, useRef } from 'react';
import deviceService from '../services/deviceService'; // Adjust path if necessary
import { CommandResponse } from '../types/device'; // Import the response interface
import {
  Save,          // Keep Save for general "send/save" action on button     // New: For the Command input
  Monitor,
  Command,       // New: For the Command Response textarea
} from 'lucide-react'; // Import necessary icons
import toast, { Toaster } from 'react-hot-toast';

const SerialCommand: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const responseTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommandInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  };

  const handleSubmitCommand = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setResponse(''); // Clear previous response

    console.log("Attempting to send command:", { cmd: command });

    // --- Correctly place setTimeout around the async logic ---
    // Use a Promise to make setTimeout work with async/await flow
    await new Promise(resolve => {
      setTimeout(async () => { // Make this callback async
        try {
          const result: CommandResponse = await deviceService.setCommand({ cmd: command });

          // --- CRUCIAL CHANGE FOR OUTPUT FORMATTING (RETAINED) ---
          if (typeof result.res === 'string') {
            setResponse(result.res);
          } else if (result.res && typeof result.res === 'object') {
            const formattedResponse = Object.entries(result.res)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n');
            setResponse(formattedResponse);
          } else {
            setResponse(JSON.stringify(result, null, 2));
            console.warn("API 'res' property was not a string or easily formatable object. Displaying full JSON as fallback.");
          }
          // --- END CRUCIAL CHANGE ---

          console.log("Command API response:", result);

          if (result.sts === true) {
            toast.success('Command sent successfully!');
          } else {
            const errorMessage = result.message || 'API returned false status.';
            toast.error(`Failed to send command: ${errorMessage}`);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Failed to send command:", err);
          const errorMessage = err.message || "An unknown error occurred while sending the command.";
          setResponse(`Error: ${errorMessage}`);
          toast.error(`Failed to send command: ${errorMessage}`);
        } finally {
          setIsLoading(false); // Stop loading after the timeout and API call
          if (responseTextareaRef.current) {
            responseTextareaRef.current.scrollTop = responseTextareaRef.current.scrollHeight;
          }
          resolve(true); // Resolve the promise to allow `await` to continue
        }
      }, 2000); // 2-second delay for loader/simulation
    });
  };

  return (
    <div className="space-y-6 relative">
    
      {isLoading && (
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
              background: '#22C55E', // Green-500
              color: '#fff',
            },
          },
          error: {
            duration: 1000,
            style: {
              background: '#EF4444', // Red-500
              color: '#fff',
            },
          },
        }}
      />

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Serial Command</h1>
            <p className="text-gray-600">Send commands to the device</p>
          </div>
        </div>

        {/* Form for Command Input and Submit Button */}
        <form onSubmit={handleSubmitCommand}>
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            {/* Command Input */}
            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
              <div>
                <label htmlFor="command" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Command className="h-5 w-5 mr-2 text-gray-500" /> Command
                </label>
                <input
                  id="command"
                  type="text"
                  value={command}
                  onChange={handleCommandInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  disabled={isLoading}
                  placeholder="Enter command here..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Send Command
                </>
              )}
            </button>
          </div>
        </form>

        {/* Response Textarea */}
        <div className="mt-6 max-w-xl mx-auto">
          <label htmlFor="response-textarea" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Monitor className="h-5 w-5 mr-2 text-gray-500" /> Command Response
          </label>
          <textarea
            id="response-textarea"
            ref={responseTextareaRef}
            className="w-full h-60 border border-gray-300 rounded-xl p-3 resize-y focus:ring-teal-500 focus:border-teal-500"
            placeholder="Response will appear here"
            readOnly
            value={response}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SerialCommand;