'use client'

import { Dock } from "@/components/dock";
import { Navbar } from "@/components/navbar";
import { Welcome } from "@/components/welcome";
import { Finder } from "@/windows/finder";
import { Resume } from "@/windows/resume";
import { Safari } from "@/windows/safari";
import { Terminal } from "@/windows/terminal";
import { Text } from "@/windows/text";
import { Img } from "@/windows/img";
import { Contact } from "@/windows/contact";
import { Home } from "@/components/home";

export default function Page() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal />
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <Img/>
      <Contact/>
      <Home/>
    </main>
  );
}
