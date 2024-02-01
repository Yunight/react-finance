import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HeaderBar() {
  return (
    <header className="bg-white mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>

      <Tabs defaultValue="account" className="w-[400px] mt-8">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}

export default HeaderBar;
