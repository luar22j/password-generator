import optionsData from "../assets/options.json";

export const Options = ({ onChange, checked }) => {
  // Aceptar la nueva prop
  return (
    <form className="flex items-center justify-center">
      <ul className="flex justify-around lg:gap-0 gap-3 w-full">
        {Object.entries(optionsData).map(([key, { title, name }]) => {
          return (
            <li key={key}>
              <input
                type="radio"
                id={name}
                name="options"
                value={name}
                className="hidden peer"
                required
                onChange={() => onChange(name)} // Llamar a onChange al seleccionar
                checked={name === checked} // Cambiar 'hard' por 'option'
              />
              <label
                htmlFor={name}
                className="inline-flex items-center justify-between w-full lg:p-5 p-3 text-gray-500 shadow hover:shadow-md border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-gray-800 peer-checked:text-gray-800 hover:text-gray-500 hover:border-gray-400 transition-all"
              >
                <div className="w-full">{title}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default Options;
