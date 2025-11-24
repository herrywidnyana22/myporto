import Image from "next/image";
import Link from "next/link";

import { WindowWrapper } from "@/hoc/windowWrapper";
import { WindowControls } from "@/components/windowControls";
import { dockApps, socials } from "@/lib/constant";

const ContactWindow = () => {

    const app = dockApps.find(a => a.id === 'contact')

    const name = app?.name ?? 'Contact'
    const icon = app?.iconSrc
    
    return ( 
        <>
            <div id="window-header" className="flex items-center justify-between">
                <div className="controls-area w-24">
                    <WindowControls target={'contact'} />
                </div>

                <div className="flex items-center gap-1">
                    {icon && (
                        <div className="size-4 overflow-hidden rounded-md">
                            <Image
                                src={icon}
                                alt={`${name} icon`}
                                width={32}
                                height={32}
                                className="object-cover size-4"
                            />
                        </div>
                    )}

                    <h2 className="text-center">{name}</h2>
                </div>

                <div className="w-24" />
            </div>

            <div className="p-5 space-y-5">
                <Image
                    src={'/images/adrian.jpg'}
                    alt="Herry"
                    width={128}
                    height={128}
                    className="size-20 rounded-full"
                />

                <h3>Let's Connect</h3>
                <p>
                    Got an idea? A bug to squash? 
                    or just want to talk tech?
                    i'am in
                </p>

                <ul>
                    {socials.map((social) => (
                        <li 
                            key={social.id}
                            style={{backgroundColor: social.bg}}
                        >
                            <Link
                                href={''}
                            >
                                <Image 
                                    src={social.icon}
                                    alt={social.text}
                                    width={128}
                                    height={128}
                                    className="size-5 object-contain"
                                />
                                <p>{social.text}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export const Contact = WindowWrapper(ContactWindow, "contact")