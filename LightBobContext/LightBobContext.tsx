import React, { createContext, useState } from "react";

type ThemeType = "default" | "nevyBlue" | "armyGreen" | "darkBrown"; // Extend with more themes as needed

interface LightBobContextType {
  isOn: boolean;
  toggleLight: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const LightBobContext = createContext<LightBobContextType>({
  isOn: false,
  toggleLight: () => {},
  theme: "default",
  setTheme: () => {},
});

export const LightBobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOn, setIsOn] = useState(false);  
  const [theme, setTheme] = useState<ThemeType>("default");

    const toggleLight = () => {
        setIsOn((prev) => !prev);
    };

  return (
    <LightBobContext.Provider value={{ isOn, toggleLight, theme, setTheme }}>
      {children}
    </LightBobContext.Provider>
  );
};