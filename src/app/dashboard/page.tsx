"use client";
import ProtectedPage from "@/components/profile/ProtectedPage";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";

function DashboardContent() {
  const { currentUser } = useAuth(); // currentUser is guaranteed to be non-null here by ProtectedPage

  if (!currentUser) return null; // Should not happen due to ProtectedPage

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-headline">Your Dashboard</h1>
        <Button asChild variant="outline">
          <Link href="/dashboard/edit">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>
      
      {currentUser ? (
        <ProfileDisplay profile={currentUser} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">Your profile is looking a bit empty.</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/dashboard/edit">
              Create Your Profile Now
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedPage>
      <DashboardContent />
    </ProtectedPage>
  );
}
