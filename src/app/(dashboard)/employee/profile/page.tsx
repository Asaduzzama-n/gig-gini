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
  skills?: string[];
  experience?: string;
  education?: string;
  portfolio?: string;
}

export default function EmployeeProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData.employee);

  const handleSave = (data: ProfileData) => {
    // In a real app, this would make an API call to save the data
    setProfileData(data);
    console.log('Saving employee profile data:', data);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto py-6">
      <ProfileComponent
        userRole="employee"
        profileData={profileData}
        onSave={handleSave}
      />
    </div>
  );
}