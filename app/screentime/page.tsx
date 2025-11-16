'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { mockChildren, mockScreenTimeData, mockAppUsage } from '@/lib/mockData'
import { formatTime } from '@/lib/utils'
import { Clock, Smartphone, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ScreenTime() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Aktivitätsübersicht</h1>
          <p className="text-muted-foreground mt-1">
            Geräte- und App-Nutzung im Überblick
          </p>
        </div>

        {/* Partner Activity */}
        {mockChildren.map((person) => (
          <Card key={person.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={person.avatar} 
                    alt={person.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <CardTitle>{person.name}</CardTitle>
                    <CardDescription>Aktivität heute: {formatTime(person.usedScreenTime)}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{formatTime(person.usedScreenTime)}</p>
                  <p className="text-xs text-muted-foreground">Heute</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                  <Smartphone className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">{person.devices.filter(d => d.status === 'online').length}</p>
                  <p className="text-xs text-muted-foreground">Online Geräte</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg text-center">
                  <Activity className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-xs text-muted-foreground">Erreichbar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Wöchliche Aktivität</CardTitle>
              <CardDescription>Nutzung der letzten 7 Tage</CardDescription>
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
                      data={mockAppUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ appName, percent }) => `${appName} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="duration"
                    >
                      {mockAppUsage.map((entry, index) => (
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

        {/* Detailed App Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Detaillierte App-Nutzung</CardTitle>
            <CardDescription>Meistgenutzte Anwendungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAppUsage.map((app) => (
                <div key={app.appName} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <p className="font-medium">{app.appName}</p>
                      <p className="text-xs text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatTime(app.duration)}</p>
                    <p className="text-xs text-muted-foreground">Heute</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
