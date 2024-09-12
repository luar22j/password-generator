import React, { useState, useEffect } from "react"; // Importar useEffect
import "./App.css";
import Options from "./components/Options";
import Background from "./components/Background";
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

        <div className="w-full flex items-end justify-center gap-2">
          <input
            className={`w-full p-1 rounded border-2 bg-transparent text-gray-800 border-gray-600 hover:border-gray-800 focus:border-gray-800 outline-none shadow focus:shadow-lg transition-all ${
              validityMessage === respuestas[0]
                ? "border-red-600"
                : validityMessage === respuestas[1]
                ? "border-yellow-600"
                : validityMessage === respuestas[2]
                ? "border-green-600"
                : validityMessage === respuestas[3]
                ? "border-green-800"
                : ""
            } transition-all`}
            value={password}
            type="text"
            readOnly
          />

          <div className="flex items-center justify-center gap-1 text-gray-700 cursor-pointer">
            <div
              className="p-2 hover:bg-gray-200 hover:shadow rounded transition-all"
              onClick={() => {
                copyToClipboard(); // Asegúrate de que se llame a la función al hacer clic
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-gray-800 drop-shadow hover:drop-shadow-lg transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </div>
            <div
              className="p-2 hover:bg-gray-200 hover:shadow rounded transition-all"
              onClick={generatePassword}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-gray-800 drop-shadow hover:drop-shadow-lg transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          </div>
        </div>
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
