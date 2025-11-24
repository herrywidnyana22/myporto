'use client'

import { WindowControls } from "@/components/windowControls";
import { WindowWrapper } from "@/hoc/windowWrapper";
import { techStack } from "@/lib/constant";
import { Check, Flag } from "lucide-react";

const TerminalWindow = () => {
    return ( 
        <>
            <div id="window-header">
                <WindowControls target='terminal'/>
                <h2>Tech Stack</h2>
            </div>

            <div className="techstack">
                <p>
                    <span className="font-bold">@herry %</span>
                    show tech stack
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Tecnologies</p>
                </div>

                <ul className="content">
                    {techStack.map((tech, i) => (
                        <li key={i} className="flex items-center">
                            <Check className="check" size={20}/>
                            <h3>{tech.category}</h3>
                            <ul>
                                {tech.items.map((item, i) => (
                                    <li key={i}>
                                        {item} {i < tech.items.length - 1 ? ',' : ''}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote">
                    <p>
                        <Check size={20}/>
                        5 of 5 stack loaded successfully
                        (100%)
                    </p>
                    <p className="text-black">
                        <Flag size={15} fill="black"/>
                        Render time: 6ms
                    </p>
                </div>
            </div>
        </>
    );
}

export const Terminal = WindowWrapper(TerminalWindow, "terminal")