import Link from "next/link";
import { useState } from "react";
import AuthorInfo from "./AuthorInfo";

export default function MostPopular({
    slug,
    featuredImageUrl,
    title,
    firstName,
    lastName,
    date,
    content,
    category,
}) {
    const [hover, setHover] = useState(false);
    function handleHover() {
        setHover(!hover);
    }

    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const dates = new Date(date);
    const day = dates.getDate();
    const monthIndex = dates.getMonth();
    const year = dates.getFullYear();
    const formatDate = day + " " + monthNames[monthIndex] + " " + year;

    return (
        <div
            className={`h-auto items-center mb-4 ${
                category ? "md:w-1/3 md:pr-4" : ""
            } `}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <div className={`relative h-40 bg-cover basis-1/2 overflow-hidden`}>
                <div
                    className={`w-full h-full bg-cover duration-700 ${
                        hover && "scale-110"
                    }`}
                    style={{ backgroundImage: `url(${featuredImageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
            </div>
            <div className="flex flex-col md:basis-3/4 justify-center gap-2 text-gray-600 px-2 md:px-0">
                <Link
                    href={`/blog${slug}`}
                    className="font-bold xl:text-lg text-black hover:text-rose-600 duration-300 leading-5"
                >
                    {title}
                </Link>
                <AuthorInfo
                    firstName={firstName}
                    lastName={lastName}
                    date={formatDate}
                />
                <div
                    className="h-12 overflow-hidden text-xs font-light"
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </div>
        </div>
    );
}
