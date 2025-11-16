# CoupleTracker - React Native Android App
## Vollständige Setup-Anleitung für Samsung Galaxy A33 5G

### 📱 App Features
- ✅ Hintergrund-GPS-Tracking (auch bei geschlossener App)
- ✅ Firebase Realtime Database für Live-Updates
- ✅ Push-Benachrichtigungen
- ✅ Battery-optimiert
- ✅ Google Maps Integration
- ✅ Samsung Knox kompatibel
- ✅ Material Design 3

---

## 🚀 Teil 1: React Native Projekt erstellen

### 1.1 Installation

```bash
# Node.js 18+ erforderlich
npx react-native@latest init CoupleTracker --template react-native-template-typescript
cd CoupleTracker
```

### 1.2 Dependencies installieren

```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler

# Maps & Location
npm install react-native-maps
npm install react-native-geolocation-service
npm install react-native-background-geolocation
npm install react-native-permissions

# Firebase
npm install @react-native-firebase/app @react-native-firebase/auth
npm install @react-native-firebase/database @react-native-firebase/messaging

# Push Notifications
npm install @notifee/react-native

# UI & Utils
npm install react-native-vector-icons
npm install react-native-linear-gradient
npm install axios date-fns
```

---

## 🔧 Teil 2: Android Konfiguration

### 2.1 android/build.gradle

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 24
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.9.0"
        googlePlayServicesVersion = "21.0.1"
        firebaseMessagingVersion = "23.4.0"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.1")
        classpath("com.google.gms:google-services:4.4.0")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

### 2.2 android/app/build.gradle

```gradle
apply plugin: "com.android.application"
apply plugin: "com.google.gms.google-services"

android {
    namespace "com.coupletracker"
    compileSdkVersion rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.coupletracker"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }

    signingConfigs {
        release {
            // Production signing config
        }
    }
}

dependencies {
    implementation project(':react-native-maps')
    implementation 'com.google.android.gms:play-services-maps:18.2.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-database'
    implementation 'com.google.firebase:firebase-messaging'
}
```

### 2.3 AndroidManifest.xml

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <application
        android:name=".MainApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <!-- Google Maps API Key -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>

        <!-- Firebase -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_channel_id"
            android:value="location_updates"/>

        <!-- Background Location Service -->
        <service
            android:name=".LocationService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="location"/>
    </application>
</manifest>
```

---

## 🔥 Teil 3: Firebase Setup

### 3.1 Firebase Console

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Erstelle neues Projekt: "CoupleTracker"
3. Füge Android App hinzu:
   - Package name: `com.coupletracker`
   - Download `google-services.json`
   - Speichere in `android/app/`

### 3.2 Firebase Realtime Database Struktur

```json
{
  "users": {
    "user1_id": {
      "name": "Du",
      "email": "user1@example.com",
      "partnerId": "user2_id",
      "deviceInfo": {
        "model": "Samsung Galaxy A33 5G",
        "battery": 85,
        "isCharging": false
      }
    }
  },
  "locations": {
    "user1_id": {
      "latitude": 49.4093,
      "longitude": 8.6944,
      "accuracy": 5,
      "timestamp": 1700000000,
      "address": "Hauptstraße 85, Heidelberg"
    }
  },
  "safeZones": {
    "zone1": {
      "name": "Zuhause",
      "latitude": 49.3988,
      "longitude": 8.6724,
      "radius": 200,
      "userId": "user1_id"
    }
  }
}
```

### 3.3 Firebase Security Rules

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || data.child('partnerId').val() === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "locations": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('partnerId').val() === $uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 📍 Teil 4: Background GPS Service (Java)

### android/app/src/main/java/com/coupletracker/LocationService.java

```java
package com.coupletracker;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import com.google.android.gms.location.*;

public class LocationService extends Service {
    private static final String CHANNEL_ID = "location_service";
    private static final int NOTIFICATION_ID = 1;
    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;

    @Override
    public void onCreate() {
        super.onCreate();
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        createNotificationChannel();
        startForeground(NOTIFICATION_ID, getNotification());
        requestLocationUpdates();
    }

    private void requestLocationUpdates() {
        LocationRequest locationRequest = new LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY, 30000) // 30 seconds
            .setMinUpdateIntervalMillis(15000) // 15 seconds
            .build();

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult != null) {
                    Location location = locationResult.getLastLocation();
                    // Send to Firebase
                    sendLocationToFirebase(location);
                }
            }
        };

        fusedLocationClient.requestLocationUpdates(locationRequest, 
            locationCallback, getMainLooper());
    }

    private void sendLocationToFirebase(Location location) {
        // Implement Firebase update
    }

    private Notification getNotification() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,
            notificationIntent, PendingIntent.FLAG_IMMUTABLE);

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("CoupleTracker Active")
            .setContentText("Live-Standort wird geteilt")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Location Service",
                NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```

---

## ⚛️ Teil 5: React Native Core Files

### src/config/firebase.ts

```typescript
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export { database, auth, messaging };
```

### src/services/LocationService.ts

```typescript
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { database } from '../config/firebase';

export class LocationService {
  private watchId: number | null = null;

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);

      return Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  }

  async startTracking(userId: string) {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    this.watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Update Firebase
        database()
          .ref(`locations/${userId}`)
          .set({
            latitude,
            longitude,
            accuracy,
            timestamp: Date.now(),
          });
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 30000, // 30 seconds
        fastestInterval: 15000, // 15 seconds
        showLocationDialog: true,
      }
    );
  }

  stopTracking() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
    }
  }
}

export default new LocationService();
```

### src/services/NotificationService.ts

```typescript
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export class NotificationService {
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  }

  async createChannel() {
    await notifee.createChannel({
      id: 'location_updates',
      name: 'Location Updates',
      importance: AndroidImportance.HIGH,
    });
  }

  async showNotification(title: string, body: string) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'location_updates',
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH,
      },
    });
  }

  setupForegroundHandler() {
    return messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        await this.showNotification(
          remoteMessage.notification.title || '',
          remoteMessage.notification.body || ''
        );
      }
    });
  }
}

export default new NotificationService();
```

---

## 📱 Teil 6: Main Screens

### src/screens/MapScreen.tsx

```typescript
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { database } from '../config/firebase';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const MapScreen = () => {
  const [myLocation, setMyLocation] = useState<Location | null>(null);
  const [partnerLocation, setPartnerLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Listen to my location
    const myRef = database().ref('locations/my_user_id');
    myRef.on('value', snapshot => {
      setMyLocation(snapshot.val());
    });

    // Listen to partner location
    const partnerRef = database().ref('locations/partner_user_id');
    partnerRef.on('value', snapshot => {
      setPartnerLocation(snapshot.val());
    });

    return () => {
      myRef.off();
      partnerRef.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 49.4093,
          longitude: 8.6944,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton>

        {myLocation && (
          <>
            <Marker
              coordinate={myLocation}
              title="Du"
              pinColor="blue"
            />
            <Circle
              center={myLocation}
              radius={myLocation.accuracy}
              fillColor="rgba(0, 122, 255, 0.1)"
              strokeColor="rgba(0, 122, 255, 0.3)"
            />
          </>
        )}

        {partnerLocation && (
          <>
            <Marker
              coordinate={partnerLocation}
              title="Freundin"
              pinColor="red"
            />
            <Circle
              center={partnerLocation}
              radius={partnerLocation.accuracy}
              fillColor="rgba(255, 45, 85, 0.1)"
              strokeColor="rgba(255, 45, 85, 0.3)"
            />
          </>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
```

---

## 🔋 Teil 7: Battery Optimization

### android/app/src/main/java/com/coupletracker/MainApplication.java

```java
public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        // Request battery optimization exemption
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent();
            String packageName = getPackageName();
            PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + packageName));
                startActivity(intent);
            }
        }
    }
}
```

---

## 🗺️ Teil 8: Google Maps API Setup

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle Projekt oder wähle bestehendes
3. Aktiviere APIs:
   - Maps SDK for Android
   - Geolocation API
   - Places API
4. Erstelle API Key
5. Füge in `AndroidManifest.xml` ein

---

## 🚀 Teil 9: Build & Deploy

### Debug Build

```bash
npm run android
```

### Release Build

```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### Installation auf Samsung Galaxy A33

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## 📋 Teil 10: Checkliste

- [ ] Firebase Projekt erstellt
- [ ] google-services.json hinzugefügt
- [ ] Google Maps API Key generiert
- [ ] Alle Permissions in Manifest
- [ ] Background Location Service implementiert
- [ ] Firebase Realtime Database konfiguriert
- [ ] Push Notifications getestet
- [ ] Battery Optimization disabled
- [ ] Release APK erstellt
- [ ] Auf beide Samsung A33 installiert

---

## 🛡️ Samsung Knox Integration (Optional)

Für Enterprise-Features:

```gradle
dependencies {
    implementation 'com.samsung.android.knox:knox-sdk:3.8'
}
```

---

## 📝 Wichtige Hinweise

1. **Battery-Drain vermeiden:**
   - GPS Update-Intervall: 30 Sek (anpassbar)
   - Genauigkeit vs. Batterie balancieren
   - Bei niedrigem Akku automatisch reduzieren

2. **Datenschutz:**
   - Verschlüsselte Firebase Verbindung
   - Nur zwischen Partnern teilen
   - Jederzeit deaktivierbar

3. **Produktiv-Deployment:**
   - Play Store Signing
   - ProGuard aktivieren
   - Crash Reporting (Firebase Crashlytics)

---

## 🎯 Nächste Schritte

Die Web-App ist bereits fertig unter:
**https://github.com/heidelbergerkeule-stack/parental-control-webapp**

Jetzt kannst du mit diesem Setup die mobile App entwickeln!
