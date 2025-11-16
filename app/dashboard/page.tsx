'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Progress } from '@/components/progress'
import { mockChildren, mockAlerts, mockActivityLogs, deviceBatteryInfo, deviceFeatures } from '@/lib/mockData'
import { formatTime, formatDateTime, getTimeOfDay } from '@/lib/utils'
import { MapPin, Smartphone, Activity, Navigation, Clock, Battery, Wifi, Signal } from 'lucide-react'
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
            Live-Tracking • 2x Samsung Galaxy A33 5G
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Geräte</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-green-500">● Beide online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPS Status</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Live</div>
              <p className="text-xs text-muted-foreground">Aktiv</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Akku Ø</CardTitle>
              <Battery className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Gesund</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updates</CardTitle>
              <Navigation className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadAlerts}</div>
              <p className="text-xs text-muted-foreground">Neu</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Location Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockChildren.map((person) => {
            const batteryInfo = deviceBatteryInfo.find(b => b.deviceId === person.devices[0]?.id)
            const device = person.devices[0]

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
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Signal className="h-3 w-3 text-green-500" />
                        Online • 5G
                      </CardDescription>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      Live
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">📍 Aktueller Standort</p>
                        <p className="text-sm text-muted-foreground">
                          {person.location?.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Genauigkeit: ±5m • {formatDateTime(person.location?.timestamp || new Date())}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <p className="font-semibold">Samsung Galaxy A33 5G</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Battery */}
                      <div className="flex items-center gap-2">
                        <Battery className={`h-4 w-4 ${batteryInfo && batteryInfo.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
                        <div>
                          <p className="text-sm font-medium">{batteryInfo?.batteryLevel}%</p>
                          <p className="text-xs text-muted-foreground">
                            {batteryInfo?.isCharging ? '⚡ Lädt' : 'Akku'}
                          </p>
                        </div>
                      </div>

                      {/* Signal */}
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Exzellent</p>
                          <p className="text-xs text-muted-foreground">5G Signal</p>
                        </div>
                      </div>

                      {/* WiFi */}
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Verbunden</p>
                          <p className="text-xs text-muted-foreground">WiFi 6</p>
                        </div>
                      </div>

                      {/* GPS */}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">GPS ON</p>
                          <p className="text-xs text-muted-foreground">Präzise</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Today */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Aktivität heute
                      </p>
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

        {/* Device Features Info */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Samsung Galaxy A33 5G Specs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold mb-2">Hardware</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {deviceFeatures.display}</li>
                  <li>• {deviceFeatures.battery}</li>
                  <li>• {deviceFeatures.camera}</li>
                  <li>• {deviceFeatures.storage} / {deviceFeatures.ram}</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Software</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {deviceFeatures.android}</li>
                  <li>• Samsung Knox Security</li>
                  <li>• Dual SIM Support</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Tracking Features</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• GPS + GLONASS + GALILEO</li>
                  <li>• 5G Connectivity</li>
                  <li>• Gyro + Accelerometer</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <CardTitle>GPS-Timeline</CardTitle>
              <CardDescription>Letzte Standort-Updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLogs.slice(0, 6).map((log) => {
                  const person = mockChildren.find(c => c.id === log.childId)
                  const isLocation = log.type === 'location'

                  return (
                    <div key={log.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isLocation ? 'bg-blue-100 dark:bg-blue-900' : 'bg-secondary'}`}>
                        {isLocation ? <MapPin className="h-4 w-4 text-blue-500" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
                      </div>
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
              <CardTitle>Benachrichtigungen</CardTitle>
              <CardDescription>{unreadAlerts} neue Meldungen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.slice(0, 6).map((alert) => {
                  return (
                    <div 
                      key={alert.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${alert.read ? 'bg-secondary/50' : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'}`}
                    >
                      <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(alert.timestamp)}
                        </p>
                      </div>
                      {!alert.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
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
