"use client";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { useAuth } from "@/contexts/AuthContext"; // Using this for getUserProfile
import type { UserProfile } from "@/lib/types";
import { Loader2, ServerCrash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { getUserProfile } = useAuth(); // Assuming getUserProfile is part of AuthContext for simulation

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
          // Simulate fetching profile data
          // In a real app, this would be an API call: `fetch('/api/profiles/${userId}')`
          const fetchedProfile = await getUserProfile(userId); // Using simulated fetch from AuthContext
          if (fetchedProfile) {
            setProfile(fetchedProfile);
          } else {
            setError("Profile not found.");
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setError("Failed to load profile.");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [userId, getUserProfile]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
        <p className="text-xl font-headline">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-headline text-destructive mb-2">Oops! Something went wrong.</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  if (!profile) {
     // This case should ideally be handled by the error state if profile is not found
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
            <UserCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-headline text-muted-foreground mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-6">The profile you are looking for does not exist or could not be loaded.</p>
            <Button asChild>
            <Link href="/">Go to Homepage</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileDisplay profile={profile} />
    </div>
  );
}

// Helper icon if needed for UserCircle
const UserCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
);

