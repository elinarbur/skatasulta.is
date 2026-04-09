"use client";

import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header({
    startsScrolled,
    logo,
}: {
    startsScrolled?: true;
    logo: { urlDark?: string | null; urlLight?: string | null };
}) {
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const handleScroll = () => {
            setAtTop(window.scrollY === 0);
        };

        window.addEventListener("scroll", handleScroll, { signal: controller.signal });

        return () => {
            controller.abort();
        };
    });

    return (
        <>
            <header
                className={cn(
                    "absolute top-0 left-0 z-[500] flex h-[6.25rem] w-full items-center",
                    startsScrolled && "bg-white",
                )}
            >
                <div className="w-full">
                    <div className="mx-auto max-w-[1920px] px-8">
                        <div className="w-full">
                            <Link href="/" className="inline-block">
                                {!startsScrolled && logo.urlDark && (
                                    <Image
                                        src={logo.urlDark}
                                        alt="Merki Skátasultunnar"
                                        width={220}
                                        height={36}
                                    />
                                )}
                                {startsScrolled && logo.urlLight && (
                                    <Image
                                        src={logo.urlLight}
                                        alt="Merki Skátasultunnar"
                                        width={220}
                                        height={36}
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div
                data-scrolled-top={atTop ? "true" : "false"}
                className={cn(
                    "fixed left-0 z-[600] flex h-[6.25rem] w-full items-center bg-white",
                    !startsScrolled &&
                        "-top-[6.25rem] transition-transform duration-350 data-[scrolled-top=false]:translate-y-[6.25rem]",
                )}
            >
                <div className="w-full">
                    <div className="mx-auto max-w-[1920px] px-8">
                        <div className="w-full">
                            <Link href="/" className="inline-block">
                                {logo.urlLight && (
                                    <Image
                                        src={logo.urlLight}
                                        alt="Merki Skátasultunnar"
                                        width={220}
                                        height={36}
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Jam({ className }: { className: string }) {
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M37.82,9.377c-1.591-0.569-2.457-0.938-2.727-1.515C36.766,7.407,38,5.875,38,4.06V3.94C38,1.768,36.232,0,34.06,0H13.94
		C11.768,0,10,1.768,10,3.94V4.06c0,1.805,1.219,3.329,2.911,3.795c-0.265,0.581-1.131,0.95-2.73,1.522
		C7.572,10.31,4,11.588,4,16.423V18c0,0.332,0.165,0.642,0.439,0.828c0.275,0.186,0.623,0.224,0.932,0.101L6,18.677v2.671v9.92
		v7.348C6,43.79,10.209,48,15.383,48h9.506h7.727c0.276,0,0.548-0.017,0.818-0.041l0.011-0.001c0.069-0.006,0.139-0.011,0.207-0.019
		l0.516-0.046l0.007-0.034C38.609,47.113,42,43.258,42,38.616v-1.232V26.598v-6.249c1.151-0.335,2-1.387,2-2.645v-1.281
		C44,11.588,40.428,10.31,37.82,9.377z M34.451,45.76c0.015-2.314-0.89-5.002-1.993-6.456C31.348,37.84,29.656,37,27.817,37
		c-1.278,0-2.493,0.409-3.513,1.184c-2.447,1.855-3.006,5.283-1.351,7.816h-7.569C11.312,46,8,42.688,8,38.616v-6.151
		c0.471,0.177,0.93,0.275,1.365,0.275c0.357,0,0.702-0.061,1.023-0.18c2.82-1.047,3.006-6.067,2.163-8.344
		c-0.702-1.895-2.526-3.169-4.551-3.194v-3.146l0.977-0.391c0.342-0.137,0.752,0.004,0.939,0.316l1.221,2.035
		c0.504,0.84,1.391,1.342,2.372,1.342c0.602,0,1.174-0.191,1.656-0.554l1.212-0.908c0.298-0.221,0.736-0.19,0.999,0.072l0.479,0.479
		c0.156,0.156,0.331,0.284,0.515,0.396c0.43,0.265,0.922,0.414,1.439,0.413c0.879,0,1.685-0.402,2.212-1.105l0.368-0.491
		c0.291-0.389,0.886-0.45,1.268,0.062c0.527,0.702,1.332,1.104,2.209,1.104c0.96,0,1.836-0.485,2.345-1.299l1.744-2.79
		c0.043-0.069,0.093-0.122,0.143-0.167c0.176-0.16,0.378-0.192,0.5-0.192c0.258,0,0.582,0.131,0.72,0.497l0.41,1.093l0.205,0.548
		c0.099,0.263,0.234,0.501,0.397,0.715c0.006,0.008,0.01,0.017,0.016,0.024c0.031,0.04,0.069,0.074,0.103,0.113
		c0.513,0.587,1.256,0.941,2.077,0.941h0h0c0.656,0,1.272-0.227,1.761-0.636c0.163-0.136,0.312-0.293,0.443-0.468l0.068-0.091
		c0.236-0.314,0.706-0.396,1.034-0.177l1.871,1.247c0.095,0.063,0.194,0.12,0.295,0.17v5.887c-0.216-0.024-0.431-0.057-0.65-0.057
		c-2.038,0-3.951,1.084-4.995,2.83c-1.522,2.548-2.274,8.485,0.661,10.239c0.538,0.321,1.165,0.484,1.863,0.484
		c1.107,0,2.204-0.406,3.118-0.881C39.969,42.087,37.617,44.946,34.451,45.76z"
                />
                <path
                    d="M16.301,34.418c-0.473-0.179-0.968-0.269-1.47-0.269c-1.725,0-3.293,1.084-3.902,2.699c-0.715,1.895-0.562,6.09,1.82,6.989
		C13.034,43.945,13.34,44,13.658,44c2.128,0,4.426-2.493,5.073-4.21C19.542,37.64,18.452,35.229,16.301,34.418z"
                />
                <path
                    d="M20.167,24c-0.916,0-1.786,0.293-2.518,0.848c-0.887,0.673-1.459,1.651-1.611,2.755c-0.152,1.104,0.136,2.199,0.809,3.087
		c0.996,1.313,3.303,2.719,5.148,2.719c0.681,0,1.266-0.181,1.738-0.539c2.028-1.538,0.981-5.605-0.242-7.22
		C22.696,24.602,21.485,24,20.167,24z"
                />
                <path
                    d="M34.704,25.71c0.849-2.135-0.198-4.564-2.334-5.415C31.876,20.1,31.359,20,30.831,20c-1.719,0-3.24,1.032-3.875,2.63
		c-0.748,1.882-0.669,6.081,1.696,7.021c0.298,0.118,0.62,0.179,0.956,0.179C31.72,29.83,34.037,27.39,34.704,25.71z"
                />
            </g>
        </svg>
    );
}
