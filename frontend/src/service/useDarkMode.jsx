import React from 'react';

function useDarkMode(iconRef) {
    
  const body = document.body;
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const toggleDarkMode = () => {
    const theme = body.classList.contains("dark") ? "white" : "dark";

    body.classList.toggle("dark");
    if (prefersDarkScheme.matches) {
      body.classList.toggle("light");
    }

    localStorage.setItem("theme", theme);
    iconRef.current.classList.toggle("fa-moon");
    iconRef.current.classList.toggle("fa-sun");
  };

  return toggleDarkMode;
}

export default useDarkMode;