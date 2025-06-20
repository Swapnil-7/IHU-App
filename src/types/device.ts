
export interface LoginResponse {
  sts: boolean; // Status: true for success, false for failure
  message?: string; // Optional: A message from the server (e.g., "Login successful", "Invalid credentials")
  // other fields returned by login if any, e.g., token, user_id
  token?: string;
}

export interface CommandPayload {
  cmd: string; // <-- THIS MUST BE 'cmd' (lowercase)
  // Remove any other properties like 'command' or 'args' if your API
  // only expects 'cmd' for serial commands.
  // If your API expects 'args', then add it back like:
  // args?: string[];
}

export interface CommandResponse {
  sts: boolean;
  res: string;
  message?: string;
}

export interface DeviceStatusData {
  Manufacturer: string;
  Device: string;
  DeviceID: string;
  IMEI: string;
  WiFiMac: string;
  SDKVersion: string;
  FirmwareName: string;
  FirmwareVersion: string;
  FirmwareBuildDate: string;
  Network: string;
  WiFiIP: string;
}

export interface NetworkConfig {
  // Common connection type
  conn: number; // 0 for WiFi, 1 for 4G

  // WiFi related fields (as per your API's getConn response)
  ssid: string;
  password: string;
  dhcp: number;       // API sends 0 or 1, so type it as number
  staticIP: string;
  gatewayIP: string;
  subnetMask: string;
  pdns: string;       // API uses pdns
  sdns: string;       // API uses sdns
  // wifiEnabled: boolean; // CONFIRMED: NOT IN YOUR API, SO IT SHOULD NOT BE HERE

  // 4G related fields (as per your API's getConn response)
  autoApn: number;    // API uses autoApn (number)
  sim1Apn: string;    // API uses sim1Apn
}

export interface GeneralConfig {
  hostname: string;
  lattitude: string;
  longitude: string;
  sitename: string;
  clientname: string;
  logstorage: number;
  logsend: number;
 
   
}

export interface ServerConfig {
  serverIP: string;
  port: number;
  serverURL: string;
  token: string;
   
}

export interface DevConfig{
   urate: number;
     modaddr: number;
     stinterval: number;
}
