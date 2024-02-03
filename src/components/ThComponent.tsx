import { ReactNode, cloneElement } from "react";

interface ThComponentProps {
  children: ReactNode;
  icon?: ReactNode;
  size?: number;
}

export const ThComponent = ({
  children,
  icon,
  size = 30,
}: ThComponentProps) => (
  <th className="flex align-middle items-center gap-5">
    {icon && cloneElement(icon as React.ReactElement, { size })}
    {children}
  </th>
);
