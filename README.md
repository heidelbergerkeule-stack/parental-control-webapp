# FamilyGuard - Parental Control Web App 🛡️

Eine moderne, vollständig funktionsfähige Parental Control Web-Anwendung mit umfangreichen Überwachungs- und Kontrollfeatures für digitale Eltern.

## ✨ Features

### 🎯 Hauptfunktionen
- **Dashboard**: Echtzeit-Übersicht aller Kinderaktivitäten
- **Bildschirmzeit-Management**: Tägliche Limits und Wochenpläne
- **App & Website Blockierung**: Schwarze und weiße Listen
- **Inhaltsfilterung**: Altersgerechte Content-Filter
- **Standortverfolgung**: GPS-basierte Standortüberwachung (simuliert)
- **Aktivitätsberichte**: Detaillierte Analysen und Statistiken
- **Mehrere Profile**: Verwaltung mehrerer Kinderprofile
- **Benachrichtigungssystem**: Echtzeit-Alerts für Eltern

### 🎨 Design & UX
- Modern und intuitiv
- Responsive Design (Mobile-First)
- Dark Mode Unterstützung
- Professionelle UI mit Tailwind CSS
- Interaktive Charts und Visualisierungen

## 🚀 Installation

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn

### Setup

1. **Repository klonen**
\`\`\`bash
git clone <repository-url>
cd parental-control-app
\`\`\`

2. **Dependencies installieren**
\`\`\`bash
npm install
# oder
yarn install
\`\`\`

3. **Development Server starten**
\`\`\`bash
npm run dev
# oder
yarn dev
\`\`\`

4. **App öffnen**
Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser

## 📱 Demo-Modus

Die App läuft im Demo-Modus mit vordefinierten Mock-Daten:
- **Login**: Beliebige E-Mail und Passwort eingeben
- **Kinder-Profile**: 2 vordefinierte Profile (Emma, Lukas)
- **Aktivitätsdaten**: Realistische Beispieldaten für Demonstrationszwecke

## 🗂️ Projektstruktur

\`\`\`
parental-control-app/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard-Seite
│   ├── profiles/          # Profilverwaltung
│   ├── screentime/        # Bildschirmzeit-Management
│   ├── blocking/          # App/Website-Blockierung
│   ├── reports/           # Aktivitätsberichte
│   ├── settings/          # Einstellungen
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Login-Seite
│   └── globals.css        # Globale Styles
├── components/            # Wiederverwendbare Komponenten
│   ├── layout.tsx         # Dashboard Layout
│   ├── card.tsx           # Card Component
│   ├── button.tsx         # Button Component
│   └── progress.tsx       # Progress Bar
├── lib/                   # Utility Functions & Data
│   ├── utils.ts           # Helper Functions
│   └── mockData.ts        # Demo-Daten
├── types/                 # TypeScript Definitionen
│   └── index.ts           # Type Interfaces
└── public/                # Statische Assets
\`\`\`

## 🛠️ Technologie-Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📊 Hauptseiten

### 1. Dashboard
- Übersicht aller Kinderaktivitäten
- Schnellzugriff auf wichtige Metriken
- Wöchliche Bildschirmzeit-Charts
- Benachrichtigungen und Alerts

### 2. Profile
- Verwaltung von Kinderprofilen
- Geräteübersicht
- Standortinformationen
- Schnellstatistiken

### 3. Bildschirmzeit
- Tägliche Limits setzen
- Wochenpläne erstellen
- Nutzungsstatistiken
- Schnellaktionen (Pause, Sperre)

### 4. Blockierung
- Apps blockieren/freigeben
- Websites blockieren/freigeben
- Inhaltsfilter konfigurieren
- Beliebte Apps/Sites Vorschläge

### 5. Berichte
- Detaillierte Aktivitätsanalysen
- Wöchliche Trends
- App/Website-Nutzung
- Export-Funktionen

### 6. Einstellungen
- Kontoeinstellungen
- Benachrichtigungspräferenzen
- Datenschutz & Sicherheit
- Erscheinungsbild (Dark Mode)

## 🔧 Konfiguration

### Tailwind CSS
Die Tailwind-Konfiguration inkludiert:
- Custom Color Scheme
- Dark Mode Support
- Responsive Breakpoints
- Custom Animations

### TypeScript
Vollständig typisiert mit Interfaces für:
- Child Profiles
- Devices
- Activity Logs
- Alerts
- Screen Time Data

## 🚦 Development

### Scripts
\`\`\`bash
npm run dev      # Development Server
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # ESLint Check
\`\`\`

### Weitere Entwicklung
Für ein produktionsreifes System sollten folgende Erweiterungen implementiert werden:

- **Backend Integration**: 
  - REST API oder GraphQL
  - Datenbank (PostgreSQL, MongoDB)
  - Authentifizierung (NextAuth, Auth0)

- **Echtzeitfunktionen**:
  - WebSocket Integration
  - Push-Benachrichtigungen
  - Live-Tracking

- **Mobile Apps**:
  - React Native Apps für iOS/Android
  - Geräte-Monitoring Agents

- **Erweiterte Features**:
  - KI-basierte Inhaltsanalyse
  - Geofencing
  - SOS-Funktionen
  - Multi-Faktor-Authentifizierung

## 📄 Lizenz

Dieses Projekt ist für Demonstrationszwecke erstellt.

## 👨‍💻 Autor

Erstellt mit Next.js, TypeScript und Tailwind CSS

---

**Hinweis**: Dies ist eine Demo-Anwendung. Für den produktiven Einsatz sind zusätzliche Sicherheitsmaßnahmen, Backend-Integration und umfassende Tests erforderlich.
