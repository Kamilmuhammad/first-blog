import Link from "next/link";
import { useState } from "react";
import AuthorInfo from "./AuthorInfo";

export default function PostCard({
    slug,
    featuredImageUrl,
    categoryName,
    categorySlug,
    title,
    firstName,
    lastName,
    date,
    content,
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
            className="md:h-48 h-auto md:flex items-center mb-4"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <div
                className={`relative h-48 md:h-full bg-cover basis-1/2 overflow-hidden`}
            >
                <div
                    className={`w-full h-full bg-cover duration-700 ${
                        hover && "scale-110"
                    }`}
                    style={{ backgroundImage: `url(${featuredImageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                <Link
                    href={`/category/`}
                    className="bg-rose-600 px-4 text-sm  py-1 font-normal cursor-pointer hover:bg-red-700 capitalize absolute bottom-10 left-6 text-white"
                >
                    {categoryName}
                </Link>
            </div>
            <div className="flex flex-col md:basis-3/4 justify-center gap-2 text-gray-600 px-4 ">
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
