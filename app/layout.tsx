import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable:"--font-geist", subsets:["latin"] });
const mono = Geist_Mono({ variable:"--font-mono", subsets:["latin"] });

export const metadata: Metadata = {
  title:"Verdant — Your whole farm, clearly managed",
  description:"A simple operating system for real livestock, workforce, resource and finance records.",
  icons:{ icon:"/favicon.svg", shortcut:"/favicon.svg" }
};

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html> }
