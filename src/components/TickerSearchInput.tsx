// AutoCompleteSearch.tsx
import { Transition } from "@headlessui/react";

import { useAutoCompleteSearch } from "@/hooks/useTickersSearchInput";
import ContentTitleDisplay from "./ContentTitleDisplay";

const TickerSearchInput = () => {
  const {
    showSuggestions,
    input,
    handleInputChange,
    filteredSuggestions,
    handleSuggestionClick,
  } = useAutoCompleteSearch();

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

      <div className="relative flex items-center gap-4 py-5">
        <input
          type="text"
          value={input}
          placeholder="Search Here"
          onChange={handleInputChange}
          className="input input-bordered w-1/2 "
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-1/2 bg-gray-100 text-gray-900 z-10 rounded-3xl p-2  max-h-48 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-white px-4 py-2 hover:rounded-3xl"
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
