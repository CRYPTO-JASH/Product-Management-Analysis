import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("pigment_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  });

  const [uploadedData, setUploadedData] = useState([]);

  function loginWithSupabaseUser(supabaseUser) {
    if (!supabaseUser) {
      logout();
      return;
    }

    const u = {
      role: "RETAILER",
      name: supabaseUser.user_metadata?.name || supabaseUser.email || "User",
      email: supabaseUser.email,
    };

    localStorage.setItem("pigment_user", JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("pigment_user");
    setUser(null);
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithSupabaseUser,
        logout,
        theme,
        toggleTheme,
        uploadedData,
        setUploadedData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}