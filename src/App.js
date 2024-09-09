import "./App.css";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#4b5563",
  "& .MuiSlider-thumb": {
    backgroundColor: "#4b5563",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#4b5563",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#e5e7eb",
  },
  "& .MuiSlider-valueLabel": {
    background: "#4b5563",
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
  return (
    <div className="flex items-center justify-center h-screen">
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="bg-white shadow-md bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col gap-5 py-5 px-8 rounded-md">
        <h1 className="text-5xl text-gray-800 drop-shadow font-bold">
          Password Generator
        </h1>
        <div className="w-full flex items-center justify-center gap-2">
          <input className="w-full p-1 rounded border-2 border-gray-600 hover:border-gray-800 focus:border-gray-800 outline-none shadow focus:shadow-lg transition-all" />

          <div className="flex items-center justify-center gap-2 text-gray-600 cursor-pointer">
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
        <CustomSlider
          defaultValue={50}
          aria-label="Longitud de la contraseña"
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}

export default App;
