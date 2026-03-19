import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import AppRouter from "../router/AppRouter";
import "../styles/App.css"

function App() {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      {/* BOTÓN DARK MODE GLOBAL */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg 
        bg-black text-white 
        dark:bg-yellow-400 dark:text-black 
        hover:scale-105 transition"
      >
        <MdDarkMode />
      </button>

      {/* APP */}
      <AppRouter />
    </>
  );
}

export default App;