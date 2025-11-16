'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren, mockAppUsage, mockWebsiteUsage, mockActivityLogs } from '@/lib/mockData'
import { formatDateTime } from '@/lib/utils'
import { Download, MapPin, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const weeklyComparison = [
  { week: 'KW 44', minutes: 430 },
  { week: 'KW 45', minutes: 487 },
  { week: 'KW 46', minutes: 367 },
  { week: 'KW 47', minutes: 434 },
]

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Aktivitätsberichte</h1>
            <p className="text-muted-foreground mt-1">
              Detaillierte Analysen und Statistiken
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Bericht exportieren
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesamt-Aktivität</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.6 Std</div>
              <p className="text-xs text-muted-foreground">Diese Woche</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ø pro Tag</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.1 Std</div>
              <p className="text-xs text-muted-foreground">Durchschnitt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Standort-Updates</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">Diese Woche</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Geräte aktiv</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Von 4 Geräten</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>App-Nutzung (Minuten)</CardTitle>
              <CardDescription>Top 5 meistgenutzte Apps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAppUsage} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="appName" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="duration" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wöchlicher Trend</CardTitle>
              <CardDescription>Aktivität über 4 Wochen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Per Partner Reports */}
        {mockChildren.map((person) => (
          <Card key={person.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full" />
                <div>
                  <CardTitle>{person.name} - Detailbericht</CardTitle>
                  <CardDescription>Aktivitäten der letzten 7 Tage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* App Usage */}
              <div>
                <h3 className="font-semibold mb-3">Meistgenutzte Apps</h3>
                <div className="space-y-2">
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
                        <p className="font-bold">{app.duration} Min</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="font-semibold mb-3">Aktivitäts-Timeline</h3>
                <div className="space-y-3">
                  {mockActivityLogs
                    .filter(log => log.childId === person.id)
                    .map((log) => (
                      <div key={log.id} className="flex gap-3 pl-4 border-l-2 border-primary pb-3">
                        <div className="flex-1">
                          <p className="font-medium">{log.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(log.timestamp)}
                            {log.duration && ` • ${log.duration} Minuten`}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
