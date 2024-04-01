import { customAlphabet } from "nanoid";

export const generateRandomNumber = () => {
  const nanoid = customAlphabet("1234567890", 4);
  const randomNumber = nanoid();
  return randomNumber;
};
