'use client'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FONT_WEIGHTS } from "@/lib/constant";

const TextRender = ({text, className, weight=400}: TextRenderProps) =>{
    return [...text].map((char, i) => (
        <span 
            key={i} 
            className={className}
            style={{fontVariationSettings: `"wght" ${weight}`}}
        >
            {char === " "
                ? '\u00A0'
                : char
            }
        </span>
    ))
}

export const setHoverText: SetHoverText = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");

    const { min, max, base } = FONT_WEIGHTS[type];

    const animateLetter = (
        letter: HTMLSpanElement,
        weight: number,
        duration = 0.25
    ) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `"wght" ${weight}`
        });
    };

    const onMouseMove = (e: MouseEvent) => {
        const { left: containerLeft } = container.getBoundingClientRect();
        const mouseX = e.clientX - containerLeft;

        letters.forEach((letter) => {
            const { left: letterLeft, width } = letter.getBoundingClientRect();

            const distance = Math.abs(mouseX - (letterLeft - containerLeft + width / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

  const onMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3))
  

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);

  return () =>{
    container.removeEventListener("mousemove", onMouseMove)
    container.removeEventListener("mouseleave", onMouseLeave)
  }
};

export const Welcome = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subTitleRef = useRef<HTMLParagraphElement | null>(null);


    useGSAP(() => {
        const titleClean = setHoverText(titleRef.current, "title");
        const subTitleClean = setHoverText(subTitleRef.current, "subtitle");

        return () => {
           titleClean && titleClean();
           subTitleClean && subTitleClean()
        }
    }, [])

    return ( 
        <section id="welcome">
            <p ref={subTitleRef}>
               <TextRender
                    text="Hey, I'am Kang Gelud Welcome to my"
                    weight={100}
                    className="text-xl font-georama"
               />
            </p>
            <h1 ref={titleRef} className="mt-7">
                <TextRender
                    text="portfolio"
                    className="text-9xl font-georama italic"
               />
            </h1>

            <div className="small-screen">
                <p>
                    Designed for desktop / tabled screen only
                </p>
            </div>
        </section>
    );
}