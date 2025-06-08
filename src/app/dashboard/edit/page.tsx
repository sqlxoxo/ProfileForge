"use client";
import ProtectedPage from "@/components/profile/ProtectedPage";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/contexts/AuthContext";

function EditProfileContent() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileForm initialProfileData={currentUser} />
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <ProtectedPage>
      <EditProfileContent />
    </ProtectedPage>
  );
}
