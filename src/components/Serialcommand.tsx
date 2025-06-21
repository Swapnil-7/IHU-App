// src/components/SerialCommand.tsx
import React, { useState, useRef } from 'react';
import deviceService from '../services/deviceService'; // Adjust path if necessary
import { CommandResponse } from '../types/device'; // Import the response interface
import { Save } from 'lucide-react'; // Assuming Save icon is needed

const SerialCommand: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const responseTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommandInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  };

  const handleSubmitCommand = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setResponse(''); // Clear previous response
    setError(null); // Clear any previous errors

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
            alert('Command sent successfully!');
          } else {
            const errorMessage = result.message || 'API returned false status.';
            alert(`Failed to send command: ${errorMessage}`);
            setError(`Failed: ${errorMessage}`);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Failed to send command:", err);
          const errorMessage = err.message || "An unknown error occurred while sending the command.";
          setResponse(`Error: ${errorMessage}`);
          setError(`Error: ${errorMessage}`);
          alert(`Failed to send command: ${errorMessage}`);
        } finally {
          setIsLoading(false); // Stop loading after the timeout and API call
          if (responseTextareaRef.current) {
            responseTextareaRef.current.scrollTop = responseTextareaRef.current.scrollHeight;
          }
          resolve(true); // Resolve the promise to allow `await` to continue
        }
      }, 2000); // 2-second delay
    });
    // The code after this `await` will execute only after the setTimeout callback finishes
  };

  return (
    <div className="space-y-6 relative">
      {/* Loader overlay - only visible when isLoading is true */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          {/* Ensure the path to your image is correct */}
          <img src="/src/assets/images/FountLab_Logo1.png" alt="Loading..." className=" logo-loader  object-contain mix-blend-darken " />
        </div>
      )}

      {/* Main content card (the large white box you had previously) */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
        
        {/* Header - Already horizontally centered due to 'justify-center' */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Serial Command</h1>
            <p className="text-gray-600">Send commands to the device</p>
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Form for Command Input and Submit Button */}
        <form onSubmit={handleSubmitCommand}>
          <div className="space-y-6 opacity-100 transition-opacity duration-300">
            {/* --- Horizontal Centering for Command Input (Width Increased) --- */}
            <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto"> 
              <div>
                <label htmlFor="command" className="block text-sm font-medium text-gray-700 mb-2">Command</label>
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
              className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {/* Conditional rendering for loader/text inside button */}
              {isLoading ? (
                // You could use a simple spinner here or just text,
                // as the main logo loader is already in the overlay.
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
          <label htmlFor="response-textarea" className="block text-sm font-medium text-gray-700 mb-2">Command Response</label>
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