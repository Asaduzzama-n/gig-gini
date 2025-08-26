"use client";

import SettingsComponent, { mockSettingsData } from "@/components/shared/SettingsComponent";
import { useState } from "react";

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  competitionUpdates: boolean;
  messageNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
  allowConnections: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

interface SettingsData {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
  security: SecuritySettings;
}

export default function EmployeeSettingsPage() {
  const [settingsData, setSettingsData] = useState<SettingsData>(mockSettingsData);

  const handleSave = (data: SettingsData) => {
    // In a real app, this would make an API call to save the data
    setSettingsData(data);
    console.log('Saving employee settings data:', data);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto py-6">
      <SettingsComponent
        userRole="employee"
        settingsData={settingsData}
        onSave={handleSave}
      />
    </div>
  );
}