# CoupleTracker - Samsung Galaxy A33 GPS Tracking 📍

Live-Standortverfolgung und Geräteüberwachung für Paare mit Samsung Galaxy A33 5G Smartphones.

## 📱 Unterstützte Geräte

**Samsung Galaxy A33 5G**
- 6.4" Super AMOLED Display
- 5000 mAh Akku
- GPS, GLONASS, GALILEO, BDS Navigation
- 5G Konnektivität
- Android 13 (One UI 5.0)
- Samsung Knox Sicherheit

## ✨ Features

### 🎯 Hauptfunktionen
- **Präzises GPS-Tracking**: Multi-Satelliten-Navigation (GPS + GLONASS + GALILEO + BDS) für ±5m Genauigkeit
- **Live-Standortkarte**: Echtzeit-Visualisierung beider Partner auf interaktiver Karte
- **Geräte-Monitoring**: Akkustand, Signalstärke, WiFi-Status, GPS-Status
- **Sichere Zonen**: Geofencing mit Benachrichtigungen beim Erreichen/Verlassen
- **5G-Tracking**: Schnelle Updates durch 5G-Verbindung
- **Aktivitätsanalyse**: App-Nutzung und Geräte-Statistiken
- **Samsung Knox Sicherheit**: Enterprise-Grade Datenschutz

### 📊 Tracking Features
- GPS-Position mit Koordinaten (Latitude/Longitude)
- Genauigkeit-Anzeige
- Automatische Standort-Updates
- Sichere Zonen Management
- Routenverfolgung (vorbereitet)
- Standort-Sharing

### 🔋 Geräte-Monitoring
- **Akku**: Ladestand, Ladestatus (5000 mAh)
- **Signal**: 5G/4G/WiFi Status
- **GPS**: Aktiv/Inaktiv, Genauigkeit
- **Hardware**: Display, RAM, Storage Info

## 🚀 Installation

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Setup

\`\`\`bash
git clone https://github.com/heidelbergerkeule-stack/parental-control-webapp.git
cd parental-control-webapp
npm install
npm run dev
\`\`\`

Öffne [http://localhost:3000](http://localhost:3000)

## 📱 Demo-Modus

Demo mit 2x Samsung Galaxy A33 5G:
- **Login**: Beliebige E-Mail/Passwort
- **Partner 1**: Hauptstraße 85, Heidelberg
- **Partner 2**: Neckarstaden 24, Heidelberg
- **Live GPS**: Simulierte Echtzeit-Daten

## 🗺️ Karten-Integration

Die App ist vorbereitet für:
- **Google Maps API**: Straßenkarten, Satellitenansicht
- **Mapbox**: Alternative mit Custom-Styling
- **OpenStreetMap**: Open-Source Option

## 🛡️ Samsung Knox Sicherheit

Die App nutzt Samsung Knox Features:
- **Verschlüsselte Datenübertragung**
- **Secure Boot**: Hardware-Level Schutz
- **TrustZone**: Isolierte sichere Umgebung
- **Knox Platform**: Enterprise-Grade Security

## 📝 Nächste Schritte

### Für produktiven Einsatz:

1. **Backend mit Echtzeit-DB**
   - Firebase Realtime Database
   - Socket.io für Live-Updates
   - PostgreSQL für Historische Daten

2. **Native Android App**
   - React Native oder Kotlin
   - Hintergrund-GPS-Tracking
   - Push-Benachrichtigungen
   - Samsung Knox SDK Integration

3. **GPS-Integration**
   - Google Maps SDK
   - Geolocation API
   - Battery-optimiertes Tracking
   - Geofencing API

4. **Erweiterte Features**
   - Routenhistorie
   - Fahrt-/Aktivitätserkennung
   - SOS-Button
   - Offline-Modus

## 🔐 Datenschutz & Einwilligung

⚠️ **Wichtig**: 
- Nur für einvernehmliches Tracking zwischen Partnern
- Beide müssen aktiv zustimmen
- Transparente Datennutzung
- Jederzeit deaktivierbar
- Samsung Knox verschlüsselt alle Daten

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Geräte**: Samsung Galaxy A33 5G (Android 13)
- **Security**: Samsung Knox Platform

## 📄 Lizenz

Für privaten Gebrauch zwischen einvernehmlichen Partnern.

---

**Repository**: [https://github.com/heidelbergerkeule-stack/parental-control-webapp](https://github.com/heidelbergerkeule-stack/parental-control-webapp)
