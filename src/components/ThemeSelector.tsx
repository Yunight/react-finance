import { useEffect } from "react";
import { themeChange } from "theme-change";

const themes = [
  "Light",
  "Dark",
  "Cupcake",
  "Bumblebee",
  "Emerald",
  "Corporate",
  "Synthwave",
  "Retro",
  "Cyberpunk",
  "Valentine",
  "Halloween",
  "Garden",
  "Forest",
  "Aqua",
  "Lofi",
  "Pastel",
  "Fantasy",
  "Wireframe",
  "Black",
  "Luxury",
  "Dracula",
  "Cmyk",
  "Autumn",
  "Business",
  "Acid",
  "Lemonade",
  "Night",
  "Coffee",
  "Winter",
  "Dim",
  "Nord",
  "Sunset",
];

const ThemeSelector = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme.toLowerCase()}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
