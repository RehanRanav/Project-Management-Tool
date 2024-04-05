import LoginForm from "@/app/ui/Login/Form";
import GoogleSignInButton from "@/app/ui/Login/AuthButton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn",
};

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (session) return redirect("/projects");

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div>
          <LoginForm />
          <div className="text-center p-2 text-gray-500">Or Continue with:</div>
          <div className="flex-1 rounded-lg bg-gray-50 p-4">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </main>
  );
}
