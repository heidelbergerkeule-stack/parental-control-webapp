import { Child, ActivityLog, Alert, AppUsage, WebsiteUsage, ScreenTimeData } from '@/types'

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Du',
    age: 28,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Partner1',
    screenTimeLimit: 0, // No limits for adults
    usedScreenTime: 245,
    devices: [
      {
        id: 'd1',
        name: 'iPhone 15 Pro',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
      {
        id: 'd2',
        name: 'MacBook Pro',
        type: 'computer',
        status: 'online',
        lastActive: new Date(Date.now() - 600000),
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
        id: 'd3',
        name: 'iPhone 14',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
      {
        id: 'd4',
        name: 'iPad Pro',
        type: 'tablet',
        status: 'offline',
        lastActive: new Date(Date.now() - 3600000),
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
    description: 'Standort aktualisiert - Hauptstraße',
  },
  {
    id: 'a2',
    childId: '2',
    timestamp: new Date(Date.now() - 1200000),
    type: 'location',
    description: 'Standort aktualisiert - Neckarstaden',
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
]

export const mockAlerts: Alert[] = [
  {
    id: 'al1',
    childId: '2',
    type: 'location',
    message: 'Freundin hat den Heimbereich erreicht',
    timestamp: new Date(Date.now() - 900000),
    read: false,
  },
  {
    id: 'al2',
    childId: '1',
    type: 'location',
    message: 'Du hast das Büro verlassen',
    timestamp: new Date(Date.now() - 1800000),
    read: false,
  },
]

export const mockAppUsage: AppUsage[] = [
  { appName: 'WhatsApp', duration: 85, category: 'Communication', icon: '💬' },
  { appName: 'Instagram', duration: 62, category: 'Social', icon: '📷' },
  { appName: 'Chrome', duration: 45, category: 'Browser', icon: '🌐' },
  { appName: 'Spotify', duration: 120, category: 'Music', icon: '🎵' },
  { appName: 'Gmail', duration: 38, category: 'Email', icon: '📧' },
]

export const mockWebsiteUsage: WebsiteUsage[] = [
  { website: 'google.com', duration: 22, category: 'Search' },
  { website: 'youtube.com', duration: 65, category: 'Video' },
  { website: 'netflix.com', duration: 180, category: 'Streaming' },
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
  },
  {
    id: 'work1',
    name: 'Büro Partner 1',
    lat: 49.4093,
    lng: 8.6944,
    radius: 150,
  },
  {
    id: 'work2',
    name: 'Büro Partner 2',
    lat: 49.4120,
    lng: 8.7050,
    radius: 150,
  },
]
