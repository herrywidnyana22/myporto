import Image from "next/image";
import dayjs from "dayjs";

import { navLinks, navUtilsIcons } from "@/lib/constant";


export const Navbar = () => {
    return ( 
        <nav>
            <div>
                <Image
                    src={'/images/logo.svg'}
                    alt="logo"
                    height={14}
                    width={14}
                />
                <p>Herry Widnyana</p>

                <ul>
                    {navLinks.map(({id, name}) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navUtilsIcons.map(({id, imgSrc}) => (
                        <li key={id}>
                            <Image
                                src={imgSrc}
                                alt={`icon-${id}`}
                                height={14}
                                width={14}
                            />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd D MMM h:mm A')}</time>
            </div>
        </nav>
    );
}