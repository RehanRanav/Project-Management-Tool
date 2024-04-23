import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Spinner size={"lg"} color="info" aria-label="Info spinner example" />
    </div>
  );
}
