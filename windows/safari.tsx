'use client'

import Image from "next/image";
import Link from "next/link";

import { WindowControls } from "@/components/windowControls";
import { WindowWrapper } from "@/hoc/windowWrapper";
import { blogPosts } from "@/lib/constant";
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const SafariWindow = () => {
    return ( 
        <>
            <div id="window-header">
                <WindowControls target={'safari'}/>
                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon"/>
                    <ChevronRight className="icon"/>
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon"/>

                    <div className="search">
                        <Search className="icon"/>
                        <input 
                            type="text" 
                            placeholder="Search or enter the website name"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon"/>
                    <Plus className="icon"/>
                    <Copy className="icon"/>
                </div>
            </div>

            <div className="blog">
                <h2>My Developer Blog</h2>

                <div className="space-y-8">
                    {blogPosts.map((blog) => (
                        <div key={blog.id} className="blog-post">
                            <div className="col-span-2">
                                <Image 
                                    src={blog.image}
                                    alt={blog.title}
                                    width={250}
                                    height={250}
                                />
                            </div>
                            <div className="content">
                                <p>{blog.date}</p>
                                <h3>{blog.title}</h3>
                                <Link
                                    href={blog.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Check out the full post <MoveRight className="icon-hover"/>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export const Safari = WindowWrapper(SafariWindow, "safari")