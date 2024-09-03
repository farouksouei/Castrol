"use client";  // Add this line at the top of your file


import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Image from "next/image";
import React from "react";
import TwoPartComponent from "@/components/castrol/TwoPartComponent";



export default function Header() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 480);
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
      <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center w-full">
              {
                  isMobile ? <Image src="/assets/ban1mob.svg" alt="castrol" width={1920} height={1080} className="w-full"/>: <Image src="/assets/ban1web.svg" alt="castrol" width={1920} height={1080} className="w-full"/>
              }
          </div>
          <div className="flex gap-8 justify-center items-center w-full">
              <TwoPartComponent imageUrl={'/assets/form.svg'} ></TwoPartComponent>
          </div>
          <div className="flex gap-8 justify-center items-center w-full">
              {
                  isMobile ? <Image src="/assets/ban2mob.svg" alt="castrol" width={1920} height={1080} className="w-full"/>: <Image src="/assets/ban2web.svg" alt="castrol" width={1920} height={1080} className="w-full"/>
              }
          </div>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"/>
      </div>
  );
}
