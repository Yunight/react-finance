import { useEffect } from "react";
import { themeChange } from "theme-change";

const lightThemes = [
  "Light",
  "Cupcake",
  "Bumblebee",
  "Emerald",
  "Corporate",
  "Retro",
  "Cyberpunk",
  "Valentine",
  "Garden",
  "Lofi",
  "Pastel",
  "Fantasy",
  "Wireframe",
  "Cmyk",
  "Autumn",
  "Acid",
  "Lemonade",
  "Winter",
  "Nord",
];

const darkThemes = [
  "Dark",
  "Synthwave",
  "Halloween",
  "Forest",
  "Aqua",
  "Black",
  "Luxury",
  "Dracula",
  "Business",
  "Night",
  "Coffee",
  "Dim",
  "Sunset",
];

const ThemeSelector = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex">
      <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn m-1">
          Light Themes
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
          className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 overflow-y-auto max-h-60"
        >
          {lightThemes.map((theme) => (
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
      <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn m-1">
          Dark Themes
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
          className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 overflow-y-auto max-h-60"
        >
          {darkThemes.map((theme) => (
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
      <div className="inline-flex flex-wrap content-center">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default ThemeSelector;
