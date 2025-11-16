export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  screenTimeLimit: number; // minutes per day
  usedScreenTime: number;  // minutes used today
  devices: Device[];
  blockedApps: string[];
  blockedWebsites: string[];
  schedule: Schedule[];
  location?: Location;
}

export interface Device {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'computer';
  status: 'online' | 'offline';
  lastActive: Date;
}

export interface Schedule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  allowedMinutes: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  timestamp: Date;
}

export interface ActivityLog {
  id: string;
  childId: string;
  timestamp: Date;
  type: 'app' | 'website' | 'location';
  description: string;
  duration?: number;
}

export interface AppUsage {
  appName: string;
  duration: number; // minutes
  category: string;
  icon?: string;
}

export interface WebsiteUsage {
  website: string;
  duration: number;
  category: string;
}

export interface ScreenTimeData {
  date: string;
  minutes: number;
}

export interface Alert {
  id: string;
  childId: string;
  type: 'limit_exceeded' | 'blocked_attempt' | 'location' | 'inappropriate_content';
  message: string;
  timestamp: Date;
  read: boolean;
}
