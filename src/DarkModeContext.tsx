import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context with the correct type
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Custom hook to use the DarkModeContext
export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

// Define the props type for the provider
interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
