import Link from "next/link";
import React from "react";

function Tag({ name, slug }) {
    return (
        <Link
            href={`/tag/${slug}`}
            className="px-4 py-2 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 hover:text-rose-600 duration-500"
        >
            {name}
        </Link>
    );
}

export default Tag;
