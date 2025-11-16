'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Progress } from '@/components/progress'
import { mockChildren, mockAlerts, mockActivityLogs } from '@/lib/mockData'
import { formatTime, formatDateTime, calculatePercentage, getTimeOfDay } from '@/lib/utils'
import { AlertCircle, CheckCircle, Clock, MapPin, Smartphone, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { day: 'Mo', minutes: 95 },
  { day: 'Di', minutes: 110 },
  { day: 'Mi', minutes: 78 },
  { day: 'Do', minutes: 125 },
  { day: 'Fr', minutes: 105 },
  { day: 'Sa', minutes: 92 },
  { day: 'So', minutes: 85 },
]

export default function Dashboard() {
  const greeting = getTimeOfDay()
  const greetings = {
    morning: 'Guten Morgen',
    afternoon: 'Guten Tag',
    evening: 'Guten Abend',
  }

  const totalChildren = mockChildren.length
  const activeDevices = mockChildren.reduce((acc, child) => 
    acc + child.devices.filter(d => d.status === 'online').length, 0
  )
  const unreadAlerts = mockAlerts.filter(a => !a.read).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{greetings[greeting]}! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Hier ist eine Übersicht über die Aktivitäten Ihrer Kinder
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kinder Profile</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChildren}</div>
              <p className="text-xs text-muted-foreground">Aktiv überwacht</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Geräte</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDevices}</div>
              <p className="text-xs text-muted-foreground">Geräte online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Benachrichtigungen</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadAlerts}</div>
              <p className="text-xs text-muted-foreground">Neue Meldungen</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ø Bildschirmzeit</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98 Min</div>
              <p className="text-xs text-muted-foreground">Pro Tag diese Woche</p>
            </CardContent>
          </Card>
        </div>

        {/* Children Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockChildren.map((child) => {
            const percentage = calculatePercentage(child.usedScreenTime, child.screenTimeLimit)
            const isNearLimit = percentage > 80

            return (
              <Card key={child.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img 
                      src={child.avatar} 
                      alt={child.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>{child.age} Jahre alt</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Bildschirmzeit heute</span>
                      <span className={`text-sm font-bold ${isNearLimit ? 'text-orange-500' : 'text-green-500'}`}>
                        {formatTime(child.usedScreenTime)} / {formatTime(child.screenTimeLimit)}
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      indicatorClassName={isNearLimit ? 'bg-orange-500' : 'bg-green-500'}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{child.location?.address}</span>
                  </div>

                  <div className="flex gap-2">
                    {child.devices.map((device) => (
                      <div 
                        key={device.id}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs"
                      >
                        <div className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {device.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bildschirmzeit diese Woche</CardTitle>
            <CardDescription>Durchschnittliche tägliche Nutzung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Alerts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Letzte Aktivitäten</CardTitle>
              <CardDescription>Aktuelle Ereignisse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLogs.slice(0, 4).map((log) => {
                  const child = mockChildren.find(c => c.id === log.childId)
                  return (
                    <div key={log.id} className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{child?.name}</span> - {log.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(log.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungen</CardTitle>
              <CardDescription>{unreadAlerts} neue Meldungen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.slice(0, 4).map((alert) => {
                  const icons = {
                    blocked_attempt: '🚫',
                    limit_exceeded: '⚠️',
                    location: '📍',
                    inappropriate_content: '⛔',
                  }
                  return (
                    <div 
                      key={alert.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${alert.read ? 'bg-secondary/50' : 'bg-orange-50 dark:bg-orange-950'}`}
                    >
                      <span className="text-xl">{icons[alert.type]}</span>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
