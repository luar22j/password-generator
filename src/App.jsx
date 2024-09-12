import React, { useState, useEffect } from "react"; // Importar useEffect
import "./App.css";
import Options from "./components/Options";
import Background from "./components/Background";
import Generator from "./components/Generator";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles"; // Importar useState

const CustomSlider = styled(Slider)(() => ({
  color: "#4b5563",
  "& .MuiSlider-thumb": {
    backgroundColor: "#1f2937",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#1f2937",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#e5e7eb",
  },
  "& .MuiSlider-valueLabel": {
    background: "#1f2937",
    color: "white",
    borderRadius: "20%",
    width: "32px",
    height: "32px",
    boxShadow: "1px 1px 2px rgba(75, 85, 99, 0.16)",
    "&:before": {
      display: "none",
    },
  },
}));

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(25);
  const [option, setOption] = useState("hard");
  const [copied, setCopied] = useState(false);
  const [validityMessage, setValidityMessage] = useState(""); // Nuevo estado para el mensaje de validez

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(password) // Copiar contraseña al portapapeles
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500); // Mostrar mensaje de copiado y luego volver a false
        })
        .catch((err) => console.error("Error al copiar: ", err));
    } else {
      // Método alternativo para copiar
      const textArea = document.createElement("textarea");
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Mostrar mensaje de copiado y luego volver a false
    }
  };

  const respuestas = ["Mala", "Buena", "Muy buena", "Excelente"];

  const generatePassword = () => {
    const options = {
      easy: "abcdefghijklmnopqrstuvwxyz",
      medium: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      hard: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-|?¿¡!{}",
    };
    const characters = options[option];
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    if (generatedPassword.length < 6) {
      setValidityMessage(respuestas[0]); // "Mala"
    } else if (generatedPassword.length <= 10) {
      setValidityMessage(respuestas[1]); // "Buena"
    } else if (generatedPassword.length <= 15) {
      setValidityMessage(respuestas[2]); // "Muy buena"
    } else {
      setValidityMessage(respuestas[3]); // "Excelente"
    }
    setPassword(generatedPassword);
  };

  // Llamar a generatePassword al cargar el componente
  useEffect(() => {
    generatePassword(); // Generar contraseña inicial
  }, [length, option]); // Dependencias para regenerar contraseña

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <Background />
      <div
        className={`copied-message ${
          copied ? "visible" : ""
        } absolute top-[150px] bg-gray-200 shadow-md rounded p-2 text-gray-800`}
      >
        <h2>Copiado</h2>
      </div>

      <div className="bg-white shadow-md mx-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col gap-5 py-5 px-8 rounded-md">
        <h1 className="lg:text-6xl text-4xl text-center text-gray-800 drop-shadow font-bold">
          Password Generator
        </h1>

        <Generator
          generatePassword={generatePassword}
          password={password}
          validityMessage={validityMessage}
          respuestas={respuestas}
          copyToClipboard={copyToClipboard}
        />

        <CustomSlider
          defaultValue={25}
          min={1}
          max={50}
          aria-label="Longitud de la contraseña"
          valueLabelDisplay="auto"
          onChange={(e, newValue) => {
            setLength(newValue); // Actualizar longitud
            generatePassword(); // Generar nueva contraseña
          }}
          className="my-5"
        />
        <Options
          onChange={(newOption) => {
            setOption(newOption); // Actualizar opción
            generatePassword(); // Generar nueva contraseña
          }}
          checked={option}
        />
      </div>
    </div>
  );
}

export default App;
