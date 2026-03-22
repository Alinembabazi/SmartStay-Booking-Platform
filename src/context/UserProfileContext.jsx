/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const LEGACY_USER_KEY = "auth_user";
const USER_PROFILE_KEY = "auth_user_profile";
const UserProfileContext = createContext(null);

function readInitialUser() {
  const savedProfile = localStorage.getItem(USER_PROFILE_KEY);
  if (savedProfile) {
    try {
      return JSON.parse(savedProfile);
    } catch {
      localStorage.removeItem(USER_PROFILE_KEY);
    }
  }

  const legacyName = localStorage.getItem(LEGACY_USER_KEY);
  if (!legacyName) return null;

  const migrated = { name: legacyName.trim(), email: "" };
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(migrated));
  return migrated;
}

export function UserProfileProvider({ children }) {
  const [user, setUser] = useState(readInitialUser);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.name),
      login: (profile) => {
        const nextProfile = {
          name: profile?.name?.trim() || "",
          email: profile?.email?.trim() || "",
        };

        if (!nextProfile.name) return;

        setUser(nextProfile);
        localStorage.setItem(LEGACY_USER_KEY, nextProfile.name);
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(nextProfile));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(LEGACY_USER_KEY);
        localStorage.removeItem(USER_PROFILE_KEY);
      },
    }),
    [user]
  );

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used inside UserProfileProvider");
  return context;
}
