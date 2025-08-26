"use client";

import ProfileComponent, { mockProfileData } from "@/components/shared/ProfileComponent";
import { useState } from "react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
}

export default function EmployerProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData.employer);

  const handleSave = (data: ProfileData) => {
    // In a real app, this would make an API call to save the data
    setProfileData(data);
    console.log('Saving employer profile data:', data);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto py-6">
      <ProfileComponent
        userRole="employer"
        profileData={profileData}
        onSave={handleSave}
      />
    </div>
  );
}