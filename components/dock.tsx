'use client';

import gsap from 'gsap';
import Image from "next/image";
import useWindowStore from '@/store/window';

import { dockApps } from "@/lib/constant";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";

export const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore()

    const dockRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

        const animateIcons = (mouseX: number) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width: w } = icon.getBoundingClientRect();
                
                const center = iconLeft - left + w / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });
        };

        const onMouseMove: MouseMoveHandler = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const resetIcons: VoidFn = () => {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
        };

        dock.addEventListener("mousemove", onMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", onMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);

    const onOpenApp = (item: DockItemProps) => {
        const win = windows[item.id]
        if(!win) return

        if(win.isOpen){
            closeWindow(item.id)
        } else {
            openWindow(item.id)
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map((item: DockItemProps, i: number) => {
                    const win = windows[item.id]
                    const isOpen = !!win && win.isOpen

                    return (
                        <div key={i} className="relative flex justify-center">
                            <button
                                type="button"
                                className="dock-icon"
                                aria-label={item.name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={item.name}
                                data-tooltip-delay-show={150}
                                onClick={() => onOpenApp(item)}
                            >
                                <Image
                                    src={item.iconSrc}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                    loading="lazy"
                                />
                            </button>

                            {isOpen && (
                                <span className="absolute left-1/2 -bottom-1 size-1.5 -translate-x-1/2 rounded-full bg-white" />
                            )}
                        </div>
                    )
                })}

                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};
