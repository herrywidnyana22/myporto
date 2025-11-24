'use client'

import clsx from "clsx";
import Image from "next/image";

import { locations } from "@/lib/constant";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import userWindowStore from "@/store/window";
import useLocationStore from "@/store/location";

export const Home = () => {
    const projects = locations.work?.children ?? []

    const { openWindow } = userWindowStore()
    const { setActiveLocation } = useLocationStore()

    const onOpenProject = (project: LocationValue) => {
        setActiveLocation(project)
        openWindow('finder')
    }

    useGSAP(() => {
        Draggable.create('.folder')
    }, [])

    return ( 
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li 
                        key={project.id}
                        onClick={() => onOpenProject(project)}
                        className={clsx('group folder', project.windowPosition)}
                    >
                        <Image 
                            src={'/images/folder.png'}
                            alt={project.name}
                            width={128}
                            height={128}
                            className="size-12"
                        />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}