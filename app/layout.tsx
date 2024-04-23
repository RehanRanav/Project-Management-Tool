import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/app/redux/provider";
import { inter, lusitana, roboto } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: '%s | Jira Dashboard',
    default: 'Jira Dashboard',
  },
  description: "The Jira Dashboard Project Management Tool designed for understanding of the Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
