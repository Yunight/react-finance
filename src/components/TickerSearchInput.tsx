// AutoCompleteSearch.tsx
import { Transition } from "@headlessui/react";

import { useTickersSearchInput } from "@/hooks/useTickersSearchInput";
import ContentTitleDisplay from "./ContentTitleDisplay";

const TickerSearchInput = () => {
  const {
    showSuggestions,
    input,
    handleInputChange,
    filteredSuggestions,
    handleSuggestionClick,
  } = useTickersSearchInput();

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ContentTitleDisplay text="Search and Display Ticker's Informations" />

      <div className="relative flex items-center gap-4 pt-5">
        <input
          type="text"
          value={input}
          placeholder="Search Here"
          onChange={handleInputChange}
          className="input input-bordered w-1/2  font-semibold placeholder:italic"
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-1/2 z-10 rounded-xl p-2  max-h-48 overflow-auto bg-base-300 ">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer px-4 py-2 theme-controller btn btn-sm btn-block btn-ghost justify-start"
              >
                {suggestion.name} ({suggestion.ticker})
              </li>
            ))}
          </ul>
        )}
      </div>
    </Transition>
  );
};

export default TickerSearchInput;
