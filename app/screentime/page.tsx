'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { Progress } from '@/components/progress'
import { mockChildren, mockScreenTimeData } from '@/lib/mockData'
import { formatTime, calculatePercentage } from '@/lib/utils'
import { Clock, Calendar, Plus, Minus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ScreenTime() {
  const appData = [
    { name: 'WhatsApp', value: 35 },
    { name: 'Chrome', value: 28 },
    { name: 'Spotify', value: 22 },
    { name: 'Lernapps', value: 18 },
    { name: 'Spiele', value: 15 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bildschirmzeit</h1>
          <p className="text-muted-foreground mt-1">
            Verwalten Sie die Bildschirmzeit und setzen Sie Limits
          </p>
        </div>

        {/* Children Screen Time */}
        {mockChildren.map((child) => {
          const percentage = calculatePercentage(child.usedScreenTime, child.screenTimeLimit)
          const isNearLimit = percentage > 80

          return (
            <Card key={child.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={child.avatar} 
                      alt={child.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>Tägliches Limit: {formatTime(child.screenTimeLimit)}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Heute genutzt</p>
                      <p className={`text-3xl font-bold ${isNearLimit ? 'text-orange-500' : 'text-primary'}`}>
                        {formatTime(child.usedScreenTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Verbleibend</p>
                      <p className="text-3xl font-bold text-green-500">
                        {formatTime(child.screenTimeLimit - child.usedScreenTime)}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    indicatorClassName={isNearLimit ? 'bg-orange-500' : 'bg-primary'}
                    className="h-3"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {percentage}% des Tageslimits genutzt
                  </p>
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Wochenplan
                    </h3>
                    <Button variant="outline" size="sm">
                      Bearbeiten
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {child.schedule.map((schedule) => {
                      const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
                      return (
                        <div key={schedule.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <span className="font-medium">{days[schedule.dayOfWeek]}</span>
                          <span className="text-sm text-muted-foreground">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                          <span className="font-semibold">{formatTime(schedule.allowedMinutes)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Wöchliche Nutzung</CardTitle>
              <CardDescription>Bildschirmzeit der letzten 7 Tage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockScreenTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('de-DE', { weekday: 'short' })} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App-Nutzung</CardTitle>
              <CardDescription>Verteilung nach Anwendung</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {appData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-auto py-4">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Pause hinzufügen</p>
                  <p className="text-xs text-muted-foreground mt-1">30 Min Extra-Zeit</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Alle Geräte sperren</p>
                  <p className="text-xs text-muted-foreground mt-1">Sofort wirksam</p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Wochenend-Modus</p>
                  <p className="text-xs text-muted-foreground mt-1">Erweiterte Zeiten</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
