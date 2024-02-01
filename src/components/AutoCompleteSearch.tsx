// AutoCompleteSearch.tsx
import { Transition } from "@headlessui/react";
import { Input } from "@/components/ui/input";
import { useAutoCompleteSearch } from "@/hooks/useAutoCompleteSearch";

const AutoCompleteSearch = () => {
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
      <div className="flex items-center space-x-2 mb-8 ">
        <div className="text-2xl">Search and Display Ticker's Informations</div>
      </div>
      <div className="relative  w-1/3 mb-8">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search Here"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-gray-100 text-gray-900 z-10 rounded-3xl p-2  max-h-48 overflow-auto">
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

export default AutoCompleteSearch;
