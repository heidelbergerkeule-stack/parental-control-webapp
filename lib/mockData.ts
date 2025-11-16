import { Child, ActivityLog, Alert, AppUsage, WebsiteUsage, ScreenTimeData } from '@/types'

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Schmidt',
    age: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    screenTimeLimit: 120, // 2 hours
    usedScreenTime: 85,
    devices: [
      {
        id: 'd1',
        name: 'iPhone 13',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
      {
        id: 'd2',
        name: 'iPad Air',
        type: 'tablet',
        status: 'offline',
        lastActive: new Date(Date.now() - 3600000),
      },
    ],
    blockedApps: ['TikTok', 'Instagram', 'Snapchat'],
    blockedWebsites: ['facebook.com', 'twitter.com', 'reddit.com'],
    schedule: [
      {
        id: 's1',
        dayOfWeek: 1,
        startTime: '15:00',
        endTime: '19:00',
        allowedMinutes: 120,
      },
      {
        id: 's2',
        dayOfWeek: 6,
        startTime: '09:00',
        endTime: '21:00',
        allowedMinutes: 240,
      },
    ],
    location: {
      lat: 49.3988,
      lng: 8.6724,
      address: 'Hauptstraße 123, Heidelberg',
      timestamp: new Date(),
    },
  },
  {
    id: '2',
    name: 'Lukas Müller',
    age: 9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lukas',
    screenTimeLimit: 90, // 1.5 hours
    usedScreenTime: 65,
    devices: [
      {
        id: 'd3',
        name: 'Samsung Galaxy',
        type: 'phone',
        status: 'online',
        lastActive: new Date(),
      },
    ],
    blockedApps: ['YouTube', 'TikTok', 'WhatsApp'],
    blockedWebsites: ['youtube.com', 'twitch.tv'],
    schedule: [
      {
        id: 's3',
        dayOfWeek: 1,
        startTime: '16:00',
        endTime: '18:00',
        allowedMinutes: 90,
      },
    ],
    location: {
      lat: 49.4001,
      lng: 8.6850,
      address: 'Schulstraße 45, Heidelberg',
      timestamp: new Date(),
    },
  },
]

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'a1',
    childId: '1',
    timestamp: new Date(Date.now() - 600000),
    type: 'app',
    description: 'Opened WhatsApp',
    duration: 15,
  },
  {
    id: 'a2',
    childId: '1',
    timestamp: new Date(Date.now() - 1200000),
    type: 'website',
    description: 'Visited google.com',
    duration: 5,
  },
  {
    id: 'a3',
    childId: '2',
    timestamp: new Date(Date.now() - 1800000),
    type: 'app',
    description: 'Opened Minecraft',
    duration: 30,
  },
  {
    id: 'a4',
    childId: '1',
    timestamp: new Date(Date.now() - 3600000),
    type: 'location',
    description: 'Arrived at school',
  },
]

export const mockAlerts: Alert[] = [
  {
    id: 'al1',
    childId: '1',
    type: 'blocked_attempt',
    message: 'Emma versuchte auf TikTok zuzugreifen',
    timestamp: new Date(Date.now() - 900000),
    read: false,
  },
  {
    id: 'al2',
    childId: '2',
    type: 'limit_exceeded',
    message: 'Lukas hat 80% seiner Bildschirmzeit genutzt',
    timestamp: new Date(Date.now() - 1800000),
    read: false,
  },
  {
    id: 'al3',
    childId: '1',
    type: 'location',
    message: 'Emma hat die sichere Zone verlassen',
    timestamp: new Date(Date.now() - 7200000),
    read: true,
  },
]

export const mockAppUsage: AppUsage[] = [
  { appName: 'WhatsApp', duration: 35, category: 'Social', icon: '💬' },
  { appName: 'Chrome', duration: 28, category: 'Browser', icon: '🌐' },
  { appName: 'Spotify', duration: 22, category: 'Entertainment', icon: '🎵' },
  { appName: 'Khan Academy', duration: 18, category: 'Education', icon: '📚' },
  { appName: 'Minecraft', duration: 15, category: 'Games', icon: '🎮' },
]

export const mockWebsiteUsage: WebsiteUsage[] = [
  { website: 'google.com', duration: 12, category: 'Search' },
  { website: 'wikipedia.org', duration: 25, category: 'Education' },
  { website: 'youtube.com', duration: 18, category: 'Video' },
  { website: 'github.com', duration: 8, category: 'Development' },
]

export const mockScreenTimeData: ScreenTimeData[] = [
  { date: '2025-11-10', minutes: 95 },
  { date: '2025-11-11', minutes: 110 },
  { date: '2025-11-12', minutes: 78 },
  { date: '2025-11-13', minutes: 125 },
  { date: '2025-11-14', minutes: 105 },
  { date: '2025-11-15', minutes: 92 },
  { date: '2025-11-16', minutes: 85 },
]
