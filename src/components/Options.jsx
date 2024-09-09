import optionsData from "../assets/options.json";

export const Options = ({ optionsName }) => {
  // Aceptar la nueva prop
  return (
    <form className="flex items-center justify-around gap-2">
      <ul className="flex w-full gap-6">
        {Object.entries(optionsData).map(([key, { title, name }]) => (
          <li key={key}>
            <input
              type="radio"
              id={name}
              name="options"
              value={name}
              className="hidden peer"
              required
            />
            <label
              htmlFor={name}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 shadow hover:shadow-md border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-gray-800 peer-checked:text-gray-800 hover:text-gray-600 hover:border-gray-500 transition-all"
            >
              <div className="w-full">{title}</div>
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Options;
