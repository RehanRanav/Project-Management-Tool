import { customAlphabet, nanoid } from "nanoid";
import dayjs from "dayjs";

export const generateRandomNumber = () => {
  const nanoid = customAlphabet("1234567890", 4);
  const randomNumber = nanoid();
  return randomNumber;
};
export const generateId = () => {
  return nanoid();
};

export const emailValidation = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(email);
  return isValid;
};

export const differenceInDays = (date: string) => {
  const dateTosubtract = dayjs(date);
  const currentDate = dayjs();
  const differenceInDays = dateTosubtract.diff(currentDate, "days");
  return differenceInDays;
};

export const dateValidation = (date: string) => {
  const enteredDate = dayjs(date);
  const currentDate = dayjs();

  if (currentDate.isBefore(enteredDate)) {
    return true;
  } else {
    false;
  }
};

export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
