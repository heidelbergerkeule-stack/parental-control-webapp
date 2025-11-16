'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Progress } from '@/components/progress'
import { mockChildren, mockAlerts, mockActivityLogs } from '@/lib/mockData'
import { formatTime, formatDateTime, getTimeOfDay } from '@/lib/utils'
import { MapPin, Smartphone, Activity, Navigation, Clock } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/button'

const chartData = [
  { day: 'Mo', minutes: 245 },
  { day: 'Di', minutes: 298 },
  { day: 'Mi', minutes: 178 },
  { day: 'Do', minutes: 325 },
  { day: 'Fr', minutes: 205 },
  { day: 'Sa', minutes: 267 },
  { day: 'So', minutes: 189 },
]

export default function Dashboard() {
  const greeting = getTimeOfDay()
  const greetings = {
    morning: 'Guten Morgen',
    afternoon: 'Guten Tag',
    evening: 'Guten Abend',
  }

  const activeDevices = mockChildren.reduce((acc, person) => 
    acc + person.devices.filter(d => d.status === 'online').length, 0
  )
  const unreadAlerts = mockAlerts.filter(a => !a.read).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{greetings[greeting]}! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Live-Tracking und Aktivitätsübersicht
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Verbunden</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Geräte</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDevices}</div>
              <p className="text-xs text-muted-foreground">Geräte online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Standorte</CardTitle>
              <MapPin className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Live</div>
              <p className="text-xs text-muted-foreground">GPS aktiv</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updates</CardTitle>
              <Navigation className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadAlerts}</div>
              <p className="text-xs text-muted-foreground">Neue Meldungen</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Location Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockChildren.map((person) => {
            const onlineDevices = person.devices.filter(d => d.status === 'online').length

            return (
              <Card key={person.id} className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="h-16 w-16 rounded-full border-2 border-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Activity className="h-3 w-3 text-green-500" />
                        Online
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Auf Karte
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Aktueller Standort</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {person.location?.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Aktualisiert: {formatDateTime(person.location?.timestamp || new Date())}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Devices */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Geräte ({onlineDevices} online)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {person.devices.map((device) => (
                        <div 
                          key={device.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                            device.status === 'online' 
                              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                              : 'bg-secondary border-border'
                          }`}
                        >
                          <div className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-sm font-medium">{device.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Today */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Aktivität heute</p>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(person.usedScreenTime)}
                      </span>
                    </div>
                    <Progress value={Math.min((person.usedScreenTime / 480) * 100, 100)} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivität diese Woche</CardTitle>
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
                {mockActivityLogs.slice(0, 6).map((log) => {
                  const person = mockChildren.find(c => c.id === log.childId)
                  return (
                    <div key={log.id} className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{person?.name}</span> - {log.description}
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
              <CardTitle>Standort-Updates</CardTitle>
              <CardDescription>{unreadAlerts} neue Meldungen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.slice(0, 6).map((alert) => {
                  return (
                    <div 
                      key={alert.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${alert.read ? 'bg-secondary/50' : 'bg-blue-50 dark:bg-blue-950'}`}
                    >
                      <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
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
