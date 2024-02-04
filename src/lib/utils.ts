import { BASE_TIMER } from "@/consts/consts";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateConvert = (dataDate: string | number | Date) => {
  const date = new Date(dataDate);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
};

export const getCurrentTimePlusXMins = (): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + BASE_TIMER);

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export const timeHoursAndMinuteToMinutes = (hoursAndMineTime: string) => {
  const [hours, minutes] = hoursAndMineTime.split(":").map(Number);
  return hours * 60 + minutes;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
