"use client";
import type { UserProfile } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
  getUserProfile: (userId: string) => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory store for users and profiles for simulation
// In a real app, this would interact with a backend API.
const USER_STORE: { [email: string]: { passwordHash: string, profileId: string } } = {};
const PROFILE_STORE: { [profileId: string]: UserProfile } = {};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('currentUserEmail');
    if (storedUserEmail) {
      const userRecord = USER_STORE[storedUserEmail];
      if (userRecord && PROFILE_STORE[userRecord.profileId]) {
        setCurrentUser(PROFILE_STORE[userRecord.profileId]);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const userRecord = USER_STORE[email];
    if (userRecord && userRecord.passwordHash === pass) { // WARNING: Plain text password comparison (simulation only)
      const profile = PROFILE_STORE[userRecord.profileId];
      setCurrentUser(profile);
      localStorage.setItem('currentUserEmail', email);
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
    setLoading(false);
  };

  const register = async (email: string, pass: string, fullName: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (USER_STORE[email]) {
      alert('User already exists');
      setLoading(false);
      return;
    }
    const profileId = `profile_${email.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;
    const newUserProfile: UserProfile = {
      id: profileId,
      email,
      fullName,
      headline: 'New ProfileForge User',
      bio: 'Excited to build my profile!',
      profilePictureUrl: `https://placehold.co/200x200.png?text=${fullName.substring(0,1)}`,
      workExperience: [],
      education: [],
      skills: [],
    };
    USER_STORE[email] = { passwordHash: pass, profileId }; // WARNING: Storing plain text password
    PROFILE_STORE[profileId] = newUserProfile;
    setCurrentUser(newUserProfile);
    localStorage.setItem('currentUserEmail', email);
    router.push('/dashboard/edit');
    setLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserEmail');
    router.push('/login');
  };
  
  const updateProfile = async (profileData: UserProfile) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (currentUser && profileData.id === currentUser.id) {
      PROFILE_STORE[profileData.id] = profileData;
      setCurrentUser(profileData);
      alert('Profile updated successfully!');
      router.push('/dashboard');
    } else {
      alert('Failed to update profile. Not authorized or profile not found.');
    }
    setLoading(false);
  };

  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const profile = PROFILE_STORE[userId] || null;
    setLoading(false);
    return profile;
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout, updateProfile, getUserProfile }}>
      {!loading && children}
      {loading && <div className="flex h-screen items-center justify-center"><p className="text-xl font-headline">Loading ProfileForge...</p></div>}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
