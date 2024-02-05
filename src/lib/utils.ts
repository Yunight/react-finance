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

export const getLastOpenDay = (date: Date) => {
  const lastOpenDay = new Date(date);
  switch (lastOpenDay.getDay()) {
    case 0:
      lastOpenDay.setDate(lastOpenDay.getDate() - 2);
      break;
    case 1:
      lastOpenDay.setDate(lastOpenDay.getDate() - 3);
      break;
    case 6:
      lastOpenDay.setDate(lastOpenDay.getDate() - 1);
      break;
    default:
      lastOpenDay.setDate(lastOpenDay.getDate() - 1);
  }
  return lastOpenDay;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
