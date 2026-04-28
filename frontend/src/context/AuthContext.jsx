import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // 🔐 USER STATE
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("pigment_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // 🎨 THEME STATE
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    return saved;
  });

  // 🔥 NEW: GLOBAL UPLOADED DATA
  const [uploadedData, setUploadedData] = useState([]);

  // 🔐 LOGIN
  function login(role) {
    const u = {
      role,
      name: role === "RETAILER" ? "Manager" : "Guest",
      email:
        role === "RETAILER"
          ? "manager@pigment.studio"
          : "guest@pigment.studio",
    };
    localStorage.setItem("pigment_user", JSON.stringify(u));
    setUser(u);
  }

  // 🔐 LOGOUT
  function logout() {
    localStorage.removeItem("pigment_user");
    setUser(null);
  }

  // 🎨 TOGGLE THEME
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
        login,
        logout,
        theme,
        toggleTheme,
        uploadedData,      // 🔥 expose data
        setUploadedData,   // 🔥 expose setter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔁 HOOK
export function useAuth() {
  return useContext(AuthContext);
}