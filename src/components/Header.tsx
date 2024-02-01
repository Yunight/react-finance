import { Disclosure, Transition } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/bourse.png";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCallback, useEffect, useMemo } from "react";
import { resetError } from "@/redux/tickerSlice";
import { JSX } from "react/jsx-runtime";

const navigation = [
  { name: "Daily", path: "/", current: false, title: "Daily" },
  { name: "Search", path: "/search", current: true, title: "Search" },
  { name: "News", path: "/news", current: false, title: "News" },
];

const Header = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.ticker.error);

  const currentTitle = useMemo(
    () =>
      navigation.find((item) => item.path === location.pathname)?.title ||
      "Home",
    [location.pathname]
  );
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
      <Disclosure as="nav" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src={logo} alt="Your Company" />
              </div>
              <div className=" md:block">
                <div className="ml-10 flex items-baseline space-x-4 ">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "border border-blue-950 text-blue-950 transition-all duration-500 ease-in-out scale-125"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black",
                          "rounded-lg px-3 py-2 text-sm font-medium "
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
          </div>
        </div>
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {currentTitle}
            <div className="pt-4">
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
            </div>
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
