'use client'

import useLocationStore from "@/store/location";
import clsx from "clsx";
import Image from "next/image";

export const RenderList = ({ 
    items, 
    title, 
    activeLocation,
    onClick,
    className 
}: RenderListProps) => {

  return (
    <>
        {title && <h3>{title}</h3>}
        <ul className={clsx(className ?? className)}>
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onClick?.(item)}
                    className={clsx(
                        "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
                        item.id === activeLocation?.id ? "active" : "not-active"
                    )}
                >
                    <Image
                        src={item.icon}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="size-4"
                    />

                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
            ))}
        </ul>
    </>
  );
};