import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, auth, getProfile } from './supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Async function to fetch session
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };
    getSession();
  }, []);

  // Fetch profile when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.id) {
        const { data, error } = await getProfile(user.id);
        setProfile(data ?? null);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  // Listen for changes on auth state (sign in, sign out, etc.)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sessionData) => {
      setUser(sessionData?.session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    signUp: auth.signUp,
    signIn: auth.signIn,
    signOut: auth.signOut,
    user,
    profile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 