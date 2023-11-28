import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {

  const backgroundTema = localStorage.getItem("theme");
  const body = document.body;

  if (backgroundTema === "light") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else if (backgroundTema === "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
  } else if (backgroundTema === "transparent") {
    body.classList.remove("light");
    body.classList.add("dark");
  }

  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
