import { Disclosure } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", path: "/dashboard", current: false, title: "Dashboard" },
  { name: "Search", path: "/", current: true, title: "Search" },
  { name: "Calendar", path: "/calendar", current: false, title: "Calendar" },
  { name: "Reports", path: "/reports", current: false, title: "Reports" },
];

function Header() {
  const location = useLocation();
  const currentTitle =
    navigation.find((item) => item.path === location.pathname)?.title || "Home";

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
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
          </h1>
        </div>
      </header>
    </div>
  );
}

export default Header;
