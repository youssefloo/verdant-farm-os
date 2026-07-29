import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable:"--font-geist", subsets:["latin"] });
const mono = Geist_Mono({ variable:"--font-mono", subsets:["latin"] });

export const metadata: Metadata = {
  title:"Verdant Farm OS — Complete Farm Intelligence",
  description:"A premium operating system for livestock, workforce, resources, and farm performance.",
  icons:{ icon:"/favicon.svg", shortcut:"/favicon.svg" }
};

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html> }
