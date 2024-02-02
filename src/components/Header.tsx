import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import logo from "../assets/bourse.png";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { useCallback, useEffect } from "react";
import { resetError } from "@/redux/tickerSlice";
import { JSX } from "react/jsx-runtime";
import ThemeSelector from "./ThemeSelector";

const navigation = [
  { name: "Daily", path: "/", current: false, title: "Daily" },
  { name: "Search", path: "/search", current: true, title: "Search" },
  { name: "News", path: "/news", current: false, title: "News" },
];

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.ticker.error);

  const classNames = useCallback((...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(resetError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, errorMessage]);

  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className="flex bg-base-200 justify-around px-8 py-2"
      >
        <div className="flex items-center">
          <div className="flex ">
            <img className="h-8 w-8" src={logo} alt="Your Company" />
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "border border-base-content transition-all duration-500 ease-in-out scale-125 "
                        : " hover:bg-neutral text-base-content dark:text-neutral-content hover:text-neutral-100 transition-all duration-500 ease-in-out",
                      "rounded-lg px-3 py-2 text-sm font-medium"
                    )
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div>
          <ThemeSelector />
        </div>
      </Disclosure>
      {/* <div className="pt-4">
        <Transition
          show={!!errorMessage}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorMessage} : 5 calls per min wait a minute
            </AlertDescription>
          </Alert>
        </Transition>
      </div> */}
    </div>
  );
};

export default Header;
