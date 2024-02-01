import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function LoadingCard({ title, message }: { title: string; message: string }) {
  return (
    <Card className="w-full mb-4 animate-in duration-1000">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>{message}</CardContent>
    </Card>
  );
}

export default LoadingCard;
