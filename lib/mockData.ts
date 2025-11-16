import { Child, ActivityLog, Alert, AppUsage, WebsiteUsage, ScreenTimeData } from '@/types'

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Du',
    age: 28,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner1',
    screenTimeLimit: 0,
    usedScreenTime: 245,
    devices: [
      {
        id: 'd1',
        name: 'Samsung Galaxy A33 5G',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
    ],
    blockedApps: [],
    blockedWebsites: [],
    schedule: [],
    location: {
      lat: 49.4093,
      lng: 8.6944,
      address: 'Hauptstraße 85, 69117 Heidelberg',
      timestamp: new Date(),
    },
  },
  {
    id: '2',
    name: 'Freundin',
    age: 26,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner2',
    screenTimeLimit: 0,
    usedScreenTime: 189,
    devices: [
      {
        id: 'd2',
        name: 'Samsung Galaxy A33 5G',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
    ],
    blockedApps: [],
    blockedWebsites: [],
    schedule: [],
    location: {
      lat: 49.3988,
      lng: 8.6724,
      address: 'Neckarstaden 24, 69117 Heidelberg',
      timestamp: new Date(),
    },
  },
]

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'a1',
    childId: '1',
    timestamp: new Date(Date.now() - 600000),
    type: 'location',
    description: 'GPS-Standort aktualisiert - Hauptstraße',
  },
  {
    id: 'a2',
    childId: '2',
    timestamp: new Date(Date.now() - 900000),
    type: 'location',
    description: 'GPS-Standort aktualisiert - Neckarstaden',
  },
  {
    id: 'a3',
    childId: '1',
    timestamp: new Date(Date.now() - 1800000),
    type: 'app',
    description: 'WhatsApp geöffnet',
    duration: 25,
  },
  {
    id: 'a4',
    childId: '2',
    timestamp: new Date(Date.now() - 2400000),
    type: 'app',
    description: 'Instagram geöffnet',
    duration: 15,
  },
  {
    id: 'a5',
    childId: '1',
    timestamp: new Date(Date.now() - 3000000),
    type: 'location',
    description: 'Sichere Zone "Zuhause" erreicht',
  },
  {
    id: 'a6',
    childId: '2',
    timestamp: new Date(Date.now() - 3600000),
    type: 'location',
    description: 'Sichere Zone "Zuhause" verlassen',
  },
]

export const mockAlerts: Alert[] = [
  {
    id: 'al1',
    childId: '2',
    type: 'location',
    message: 'Freundin hat die sichere Zone "Zuhause" erreicht',
    timestamp: new Date(Date.now() - 900000),
    read: false,
  },
  {
    id: 'al2',
    childId: '1',
    type: 'location',
    message: 'Du hast die sichere Zone "Büro" verlassen',
    timestamp: new Date(Date.now() - 1800000),
    read: false,
  },
  {
    id: 'al3',
    childId: '1',
    type: 'location',
    message: 'Dein Samsung Galaxy A33 Akku unter 20%',
    timestamp: new Date(Date.now() - 2700000),
    read: true,
  },
]

export const mockAppUsage: AppUsage[] = [
  { appName: 'WhatsApp', duration: 85, category: 'Communication', icon: '💬' },
  { appName: 'Instagram', duration: 62, category: 'Social', icon: '📷' },
  { appName: 'Samsung Internet', duration: 45, category: 'Browser', icon: '🌐' },
  { appName: 'Spotify', duration: 120, category: 'Music', icon: '🎵' },
  { appName: 'Gmail', duration: 38, category: 'Email', icon: '📧' },
  { appName: 'Google Maps', duration: 28, category: 'Navigation', icon: '🗺️' },
  { appName: 'YouTube', duration: 95, category: 'Video', icon: '📺' },
]

export const mockWebsiteUsage: WebsiteUsage[] = [
  { website: 'google.com', duration: 22, category: 'Search' },
  { website: 'youtube.com', duration: 65, category: 'Video' },
  { website: 'instagram.com', duration: 45, category: 'Social' },
  { website: 'amazon.de', duration: 15, category: 'Shopping' },
]

export const mockScreenTimeData: ScreenTimeData[] = [
  { date: '2025-11-10', minutes: 245 },
  { date: '2025-11-11', minutes: 298 },
  { date: '2025-11-12', minutes: 178 },
  { date: '2025-11-13', minutes: 325 },
  { date: '2025-11-14', minutes: 205 },
  { date: '2025-11-15', minutes: 267 },
  { date: '2025-11-16', minutes: 189 },
]

// Safe zones for location alerts
export const safeZones = [
  {
    id: 'home',
    name: 'Zuhause',
    lat: 49.3988,
    lng: 8.6724,
    radius: 200, // meters
    color: '#10b981',
  },
  {
    id: 'work1',
    name: 'Büro Partner 1',
    lat: 49.4093,
    lng: 8.6944,
    radius: 150,
    color: '#3b82f6',
  },
  {
    id: 'work2',
    name: 'Büro Partner 2',
    lat: 49.4120,
    lng: 8.7050,
    radius: 150,
    color: '#f59e0b',
  },
  {
    id: 'gym',
    name: 'Fitnessstudio',
    lat: 49.4050,
    lng: 8.6800,
    radius: 100,
    color: '#8b5cf6',
  },
]

// Device battery info
export const deviceBatteryInfo = [
  {
    deviceId: 'd1',
    batteryLevel: 78,
    isCharging: false,
    lastUpdated: new Date(),
  },
  {
    deviceId: 'd2',
    batteryLevel: 92,
    isCharging: true,
    lastUpdated: new Date(),
  },
]

// Samsung Galaxy A33 specific features
export const deviceFeatures = {
  model: 'Samsung Galaxy A33 5G',
  display: '6.4" Super AMOLED',
  battery: '5000 mAh',
  camera: '48MP Quad Camera',
  storage: '128GB',
  ram: '6GB',
  android: 'Android 13 (One UI 5.0)',
  features: [
    'GPS, GLONASS, GALILEO, BDS',
    '5G Connectivity',
    'Accelerometer, Gyro, Proximity',
    'Samsung Knox Security',
    'Dual SIM Support',
  ],
}
