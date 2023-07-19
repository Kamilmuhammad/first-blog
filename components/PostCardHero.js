import Link from "next/link";
import React, { useState } from "react";
import AuthorInfo from "./AuthorInfo";

function PostCardHero({
    bgImage,
    category,
    title,
    slug,
    firstName,
    lastName,
    date,
    subHero,
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
        <>
            <div
                className="text-white rounded relative h-full overflow-hidden"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
            >
                <div
                    className={`bg-cover h-full w-full rounded hover:scale-110 cursor-pointer duration-700 absolute -z-10 [background-position-y:-50px] ${
                        hover ? "scale-110" : ""
                    } `}
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                >
                    <div
                        className="h-full w-full bg-gradient-to-t to-black/10 hover:to-black/0
                        from-black/80"
                    ></div>
                </div>
                <div
                    className={`flex flex-col h-full justify-end items-start ${
                        subHero ? "p-2 md:space-y-2" : "md:p-8  lg:p-10 p-2"
                    } space-y-4`}
                >
                    <Link
                        href={`/category`}
                        className="bg-rose-600 px-6  py-1 font-normal cursor-pointer hover:bg-red-700 capitalize"
                    >
                        {category}
                    </Link>
                    <Link
                        href={`/blog${slug}`}
                        className={`font-medium lg:pr-10 hover:underline ${
                            subHero ? "text-base" : "text-base md:text-2xl"
                        }`}
                    >
                        {title}.
                    </Link>
                    <AuthorInfo
                        firstName={firstName}
                        lastName={lastName}
                        date={formatDate}
                    />
                </div>
            </div>
        </>
    );
}

export default PostCardHero;
