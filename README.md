# CoupleTracker - Live Location & Activity Tracking 📍

Eine moderne Web-App für Paare zum gegenseitigen Live-Standort-Tracking, Geräteüberwachung und Aktivitätsanalyse.

## ✨ Features

### 🎯 Hauptfunktionen
- **Live GPS-Tracking**: Echtzeit-Standortverfolgung beider Partner
- **Geräteüberwachung**: Überblick über alle verbundenen Geräte
- **Aktivitätsanalyse**: Detaillierte App- und Web-Nutzungsstatistiken
- **Sichere Zonen**: Benachrichtigungen beim Erreichen definierter Orte
- **Interaktive Karte**: Visualisierung der Standorte auf Karte (vorbereitet)
- **Benachrichtigungen**: Standort-Updates und Aktivitätsmeldungen
- **Detaillierte Berichte**: Wöchliche Analysen und Trends

### 🎨 Design & UX
- Modern und intuitiv
- Responsive Design (Mobile-First)
- Dark Mode Unterstützung
- Interaktive Charts und Visualisierungen
- Deutsche Lokalisierung

## 🚀 Installation

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Setup

1. **Repository klonen**
\`\`\`bash
git clone https://github.com/heidelbergerkeule-stack/parental-control-webapp.git
cd parental-control-webapp
\`\`\`

2. **Dependencies installieren**
\`\`\`bash
npm install
\`\`\`

3. **Development Server starten**
\`\`\`bash
npm run dev
\`\`\`

4. **App öffnen**
Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser

## 📱 Demo-Modus

Die App läuft im Demo-Modus mit vordefinierten Mock-Daten:
- **Login**: Beliebige E-Mail und Passwort eingeben
- **Partner-Profile**: 2 vordefinierte Profile mit realistischen Daten
- **Live-Tracking**: Simulierte GPS-Daten für Heidelberg

## 🗂️ Hauptseiten

### 1. Dashboard
- Echtzeit-Übersicht beider Partner
- Live-Standorte und Geräte-Status
- Schnellzugriff auf wichtige Metriken
- Aktivitäts-Timeline

### 2. Standorte (Profile)
- Interaktive Karte mit beiden Standorten
- Detaillierte Geräteübersicht
- Sichere Zonen Management
- GPS-Koordinaten und Zeitstempel

### 3. Aktivität
- Tagesübersicht der Geräte-Nutzung
- App-Nutzungsstatistiken mit Charts
- Wöchliche Trends
- Online-Status aller Geräte

### 4. Berichte
- Detaillierte Aktivitätsanalysen
- Wöchliche und monatliche Trends
- Export-Funktionen
- Individuelle Partner-Reports

### 5. Einstellungen
- Kontoeinstellungen
- Benachrichtigungspräferenzen
- Datenschutz & Sicherheit
- Dark Mode

## 🛠️ Technologie-Stack

- **Framework**: Next.js 14 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 📝 Nächste Schritte für Produktiveinsatz

1. **Backend-Integration**:
   - GPS-Tracking API (z.B. Geolocation API)
   - Datenbank für historische Daten
   - Authentifizierung & Sicherheit

2. **Mobile Apps**:
   - React Native Apps für iOS/Android
   - Hintergrund-GPS-Tracking
   - Push-Benachrichtigungen

3. **Erweiterte Features**:
   - Echte Kartenintegration (Google Maps/Mapbox)
   - Geofencing für sichere Zonen
   - Routenverfolgung
   - SOS-Funktion

## 🔐 Datenschutz

⚠️ **Wichtig**: Diese App ist nur für den privaten Gebrauch zwischen einvernehmlichen Partnern gedacht. 
- Beide Partner müssen der Überwachung zustimmen
- Keine heimliche Überwachung
- Transparente Datennutzung
- Jederzeit deaktivierbar

## 📄 Lizenz

Für den privaten Gebrauch.

---

**Repository**: [https://github.com/heidelbergerkeule-stack/parental-control-webapp](https://github.com/heidelbergerkeule-stack/parental-control-webapp)
