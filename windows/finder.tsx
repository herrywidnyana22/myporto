'use client'

import { RenderList } from "@/components/renderList";
import { WindowControls } from "@/components/windowControls";
import { WindowWrapper } from "@/hoc/windowWrapper";
import { locations } from "@/lib/constant";
import useLocationStore from "@/store/location";
import userWindowStore from "@/store/window";
import { Search } from "lucide-react";
import Image from "next/image";

const FinderWindow = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = userWindowStore()

    const openItem = (item: LocationValue) =>{

        if(item.fileType === 'pdf') return openWindow('resume')
        if(item.kind === 'folder') return setActiveLocation(item)
        if(['fig', 'url'].includes(item.fileType) && item.href){
            return window.open(item.href, "_blank")
        }

        openWindow(`${item.fileType}${item.kind}`, item)
    }

    return ( 
        <>
            <div id="window-header">
                <WindowControls target={'finder'}/>
                <Search className="icon" />
            </div>
            <div className="bg-white flex h-full">
                <div className="sidebar">
                    <RenderList 
                        title="Favorite"
                        items={Object.values(locations)} 
                        activeLocation={activeLocation}
                        onClick={(item) => setActiveLocation(item)} 
                    />
                    <RenderList 
                        title="Work"
                        items={locations.work.children} 
                        activeLocation={activeLocation}
                        onClick={(item) => setActiveLocation(item)} 
                    />
                </div>
                <ul className="content">
                    {activeLocation?.children.map((item: LocationValue) => (
                        <li
                            key={item.id}
                            onClick={() => openItem(item)}
                            className={item.position}
                        >
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={128}
                                height={128}
                            />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export const Finder = WindowWrapper(FinderWindow, "finder")