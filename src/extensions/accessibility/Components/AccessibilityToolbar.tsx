import React, { useState, useEffect } from "react";
import { Toggle } from "@fluentui/react/lib/Toggle";

import styles from "../AppCustomizer.module.scss";
const AccessibilityToolbar: React.FC = () => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // State to control dark mode

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("userDarkMode");
    const isSavedDarkMode = savedDarkMode === "true";
    setIsDarkMode(isSavedDarkMode);
    document.body.classList.toggle(styles.InvolvDarkMode, isSavedDarkMode);
  }, []);

  const handleThemeToggle = (checked: boolean): void => {
    setIsDarkMode(checked);
    document.body.classList.toggle(styles.InvolvDarkMode, checked);
    localStorage.setItem("userDarkMode", checked.toString());
  };
  const setZoom = (scale: number): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document.body.style as any).zoom = scale.toString();
    localStorage.setItem("userZoom", scale.toString());
    console.log("Zoom scale applied: ", scale);
  };
  const zoomLevels = [
    { scale: 1.6, fontSize: "gigalarge" },
    { scale: 1.4, fontSize: "xlarge" },
    { scale: 1.2, fontSize: "large" },
    { scale: 1, fontSize: "medium" },
    { scale: 0.8, fontSize: "small" },
  ];
  const handleHighContrastToggle = (checked: boolean): void => {
    setHighContrast(checked);
    document.body.classList.toggle(styles.InvolvcontrastMode, checked);
  };

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        {zoomLevels.map(({ scale, fontSize }) => (
          <button
            key={scale}
            className={`${styles[fontSize as keyof typeof styles]} ${
              styles.fontSizeButton
            }`}
            onClick={() => setZoom(scale)}
          >
            A
          </button>
        ))}
      </div>
      <div className={styles.toggle}>
        <Toggle
          label="Contrast"
          onText="On"
          offText="Off"
          checked={highContrast}
          onChange={(ev, checked: boolean) => handleHighContrastToggle(checked)}
        />
      </div>
      <div className={styles.toggle}>
        <Toggle
          label={isDarkMode ? "Dark Mode" : "Normal Mode"}
          onText="On"
          offText="Off"
          checked={isDarkMode}
          onChange={(ev, checked: boolean) => handleThemeToggle(checked)}
        />
      </div>
    </div>
  );
};

export default AccessibilityToolbar;
