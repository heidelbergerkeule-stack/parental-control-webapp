'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren, mockAppUsage, mockWebsiteUsage, mockActivityLogs } from '@/lib/mockData'
import { formatDateTime } from '@/lib/utils'
import { Download, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const weeklyComparison = [
  { week: 'KW 44', minutes: 680 },
  { week: 'KW 45', minutes: 720 },
  { week: 'KW 46', minutes: 650 },
  { week: 'KW 47', minutes: 690 },
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
              <CardTitle className="text-sm font-medium">Gesamt-Bildschirmzeit</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.2 Std</div>
              <p className="text-xs text-muted-foreground">Diese Woche</p>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingDown className="h-3 w-3 mr-1" />
                -12% vs. letzte Woche
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ø pro Tag</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.0 Std</div>
              <p className="text-xs text-muted-foreground">Durchschnitt</p>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingDown className="h-3 w-3 mr-1" />
                -8% Verbesserung
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blockierte Zugriffe</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Diese Woche</p>
              <div className="flex items-center text-xs text-orange-500 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 vs. letzte Woche
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Limits überschritten</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Diese Woche</p>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2 vs. letzte Woche
              </div>
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
              <CardDescription>Bildschirmzeit über 4 Wochen</CardDescription>
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

        {/* Per Child Reports */}
        {mockChildren.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <img src={child.avatar} alt={child.name} className="h-10 w-10 rounded-full" />
                <div>
                  <CardTitle>{child.name} - Detailbericht</CardTitle>
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

              {/* Website Usage */}
              <div>
                <h3 className="font-semibold mb-3">Besuchte Webseiten</h3>
                <div className="space-y-2">
                  {mockWebsiteUsage.map((site) => (
                    <div key={site.website} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <p className="font-medium">{site.website}</p>
                        <p className="text-xs text-muted-foreground">{site.category}</p>
                      </div>
                      <p className="font-bold">{site.duration} Min</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="font-semibold mb-3">Aktivitäts-Timeline</h3>
                <div className="space-y-3">
                  {mockActivityLogs
                    .filter(log => log.childId === child.id)
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

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Berichte exportieren</CardTitle>
            <CardDescription>Laden Sie detaillierte Berichte in verschiedenen Formaten herunter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Als PDF exportieren
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Als CSV exportieren
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                E-Mail senden
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
