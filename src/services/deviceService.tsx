import { environment } from '../environment/environment';
import { DeviceStatusData, GeneralConfig, ServerConfig,NetworkConfig, DevConfig, CommandPayload, CommandResponse, LoginResponse} from '../types/device'; // <--- IMPORT THE SHARED INTERFACE HERE

// You should remove the local StatusResponse interface from here if it existed,
// as you are now importing the unified DeviceStatusData.
// If you had an empty or incorrect StatusResponse here, delete it now:
// interface StatusResponse { /* ... */ } // DELETE THIS!

// Add other interfaces if they are defined locally in deviceService.ts
// interface LoginResponse {
//   sts:string
//   token: string;
//   message?: string;
// };

// interface NetworkConfig {
//   wifiEnabled: boolean;
//   ssid: string;
//   // ... other network properties
// }

interface ApiErrorResponse {
  message: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}


class DeviceService {
  constructor() {
    // ...
  }

  private async request<T>(
    method: string,
    path: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any = null,
    headers: HeadersInit = {}
  ): Promise<T> {
    // ... (rest of your request method implementation) ...
    const url = `${environment.URL}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      if (data instanceof FormData) {
        delete (options.headers as Record<string, string>)['Content-Type'];
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    try {
      const response: Response = await fetch(url, options);

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errorData: ApiErrorResponse = await response.json();
          errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          errorMessage += ` - ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json() as T;
      } else {
        return response.text() as T;
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error during ${method} ${path}:`, error.message || error);
      throw error;
    }
  }

  // --- Authentication ---
  signOut(): void {
    localStorage.removeItem('token');
    console.log('User signed out. Navigation responsibility lies with the calling component.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLogin(data: any): Promise<LoginResponse> {
    return this.request<LoginResponse>('POST', '/api/login', data);
  }

  // --- Device Status & Info ---
  // <--- HERE IS THE KEY CHANGE: Use DeviceStatusData as the return type
  getStatus(): Promise<DeviceStatusData> {
    return this.request<DeviceStatusData>('GET', '/api/status');
  }

  // --- Local Storage Management ---
  getDeviceName(): string {
    return localStorage.getItem('deviceName') || '';
  }

  setDeviceName(name: string): void {
    localStorage.setItem('deviceName', name);
  }

  getFirmwareVersion(): string {
    return localStorage.getItem('firmwareVersion') || '';
  }

  setFirmwareVersion(version: string): void {
    localStorage.setItem('firmwareVersion', version);
  }

  clearStoredValues(): void {
    localStorage.removeItem('deviceName');
    localStorage.removeItem('firmwareVersion');
  }

  getGnConfig(): Promise<GeneralConfig> {
    return this.request<GeneralConfig>('GET', '/api/general');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setGnConfig(data: GeneralConfig): Promise<any> {
    return this.request('POST', '/api/general', data);
  }



   getServerSettings(): Promise<ServerConfig> {
    return this.request<ServerConfig>('GET', '/api/getserverset');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setServerSettings(data: ServerConfig): Promise<any> {
    return this.request('POST', '/api/setserverset', data);
  }

   getDeviceConfig(): Promise<DevConfig> {
    return this.request<DevConfig>('GET', '/api/getdevconf');
  }
  // setDeviceConfig(data: any) {
  //   return this.http.post('http://localhost:8008/api/setdevconf', data);
  // }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDeviceConfig(data: DevConfig): Promise<any> {
    return this.request('POST', '/api/setdevconf', data);
  }


  // --- Network Settings ---
   getConn(): Promise<NetworkConfig> {
    return this.request<NetworkConfig>('GET', '/api/getconnectivity');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setConn(data: NetworkConfig): Promise<any> { // This is correct, 'data' is NetworkConfig
    return this.request('POST', '/api/setconnectivity', data);
  }

  // --- Device Actions ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reboot(data: any): Promise<any> {
    return this.request('POST', '/reboot', data);
  }

  // setCommand(data: { command: string; args?: string[] }): Promise<any> {
  //   return this.request('POST', '/serial/cmd', data);
  // }

   setCommand(data: CommandPayload): Promise<CommandResponse> {
    // This expects 'data' to conform to the CommandPayload interface,
    // which should now correctly have 'cmd: string'.
    return this.request<CommandResponse>('POST', '/serial/cmd', data);
  }

  // --- Administration ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adminPassword(data: { oldPassword?: string; newPassword: string }): Promise<any> {
    return this.request('POST', '/api/changeP', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBackupFirm(): Promise<any> {
    return this.request('GET', '/api/backup');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTelnet(data: { enabled: boolean; port?: number }): Promise<any> {
    return this.request('POST', '/api/settelnet', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTelnet(): Promise<any> {
    return this.request('GET', '/api/gettelnet');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBackup(): Promise<any> {
    return this.request('GET', '/api/getbackup');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBackup(data: any): Promise<any> {
    return this.request('POST', '/api/setbackup', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveFactory(data: any): Promise<any> {
    return this.request('POST', '/api/factroryReset', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveRestore(data: any): Promise<any> {
    return this.request('POST', '/api/restore', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(formData: FormData, customHeaders: HeadersInit = {}): Promise<any> {
    return this.request('POST', '/api/update', formData, customHeaders);
  }
}

const deviceService = new DeviceService();
export default deviceService;