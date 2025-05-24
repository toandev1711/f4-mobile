import React, { createContext, useState, useContext } from "react";

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [statusBarColor, setStatusBarColor] = useState("");

  return (
    <ColorContext.Provider value={{ statusBarColor, setStatusBarColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
