"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="flex h-screen gap-2 flex-col items-center justify-center">
      <div className="text-center">
        <BiSolidErrorAlt color="red" size={120} />
      </div>
      <h2 className="text-center text-2xl">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => router.refresh()}
      >
        <Link href={"/"}>Try again</Link>
      </button>
    </main>
  );
}
