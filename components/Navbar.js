import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

function Navbar({ hamburgerMenu, setHamburgerMenu }) {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();
    const menus = [
        { name: "Dasboard", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Category", href: "/category" },
        { name: "Contact", href: "/" },
    ];
    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/search/${search}`);
        console.log(search);
    }
    const deleteSearch = (e) => {
        e.preventDefault();
        setSearch("");
    };

    const handdleHamburger = () => {
        setHamburgerMenu(!hamburgerMenu);
    };
    return (
        <nav className="relative h-8 md:h-12 ">
            <div className="bg-slate-900 flex px-4 md:px-16 py-2 text-slate-100 items-center justify-between box-border fixed top-0 w-full z-10 shadow-black/20 shadow-lg">
                <div className="flex items-center gap-4 ">
                    <Link href={"/"}>
                        <Image
                            className="rounded"
                            src={"/bird_2.jpg"}
                            alt="logo"
                            width={30}
                            height={30}
                        />
                    </Link>

                    <ul className="hidden md:flex">
                        {menus.map((menu) => (
                            <li
                                key={menu.name}
                                className="hover:bg-gray-800 duration-500 py-2 rounded  px-2"
                            >
                                <Link href={menu.href}>{menu.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-20">
                    <form
                        className="flex relative bg-gray-700 max-w-md py-1 text-zinc-400 focus-within:text-zinc-600 focus-within:bg-white rounded"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <label
                            htmlFor="search"
                            className="px-2 flex items-center"
                        >
                            <svg
                                className="w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"></path>
                            </svg>
                        </label>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent"
                            id="search"
                            value={search}
                            type="text"
                            placeholder="Search"
                        />
                        <span
                            className={`absolute top-1 right-1  px-2 font-bold text-red-800 ${
                                !search ? "invisible" : ""
                            }`}
                            onClick={(e) => deleteSearch(e)}
                        >
                            x
                        </span>
                    </form>
                    <div className="hidden md:flex items-center ">
                        {session && status == "authenticated" ? (
                            <>
                                {session.user.image ? (
                                    <Image
                                        onClick={() =>
                                            setHamburgerMenu(!hamburgerMenu)
                                        }
                                        className="rounded-full cursor-pointer"
                                        src={session.user.image}
                                        alt="logo"
                                        width={35}
                                        height={35}
                                    />
                                ) : (
                                    <Image
                                        onClick={() =>
                                            setHamburgerMenu(!hamburgerMenu)
                                        }
                                        className="rounded-full"
                                        src={"/user.png"}
                                        alt="logo"
                                        width={35}
                                        height={35}
                                    />
                                )}
                                {hamburgerMenu && (
                                    <div className="absolute w-auto right-10 top-14 bg-slate-100/95 shadow-slate-600/40 shadow-lg text-slate-900 pt-4 rounded">
                                        <div className="flex items-center gap-4 pb-4 border-b  px-6">
                                            {session.user.image ? (
                                                <Image
                                                    className="rounded-full h-auto"
                                                    src={session.user.image}
                                                    alt="logo"
                                                    width={50}
                                                    height={30}
                                                />
                                            ) : (
                                                <Image
                                                    className="rounded-full h-auto"
                                                    src={"/user.png"}
                                                    alt="logo"
                                                    width={50}
                                                    height={30}
                                                />
                                            )}
                                            <span>
                                                <p className="font-medium">
                                                    {session.user.name}
                                                </p>
                                                <p className="text-xs">
                                                    {session.user.email}
                                                </p>
                                            </span>
                                        </div>
                                        <div
                                            className="px-6 pt-2 pb-4 flex gap-2 hover:bg-slate-200 cursor-pointer "
                                            onClick={() => signOut()}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                                />
                                            </svg>
                                            <p>sign out</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={"/auth/signin"}
                                className="flex hover hover:text-zinc-300 gap-1"
                            >
                                <em className="hover:text-zinc-300">Sign In</em>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hamburger Button */}
                <button
                    className="md:hidden  rounded box-border"
                    onClick={() => handdleHamburger()}
                >
                    {hamburgerMenu ? (
                        <svg
                            className="w-8 bg-gray-700 p-1 rounded hover:bg-zinc-600  active:bg-gray-700 focus-within:border-2 focus-within:border-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                        </svg>
                    ) : (
                        <svg
                            className="w-8 bg-gray-700 p-1 rounded hover:bg-zinc-600  active:bg-gray-700 focus-within:border-2 focus-within:border-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"></path>
                        </svg>
                    )}
                </button>

                {/* Hamburge menu */}
                <div
                    className={`md:hidden bg-slate-800 w-full top-12 left-0  ${
                        hamburgerMenu ? "absolute" : "hidden"
                    }`}
                >
                    <ul className="py-2 px-4 ">
                        {menus.map((menu) => (
                            <li
                                key={menu.name}
                                className="hover:bg-gray-900 rounded  p-2"
                            >
                                <Link href={menu.href}>{menu.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="w-11/12 mx-auto" />
                    {session ? (
                        <>
                            <div className="flex my-2 mx-4 gap-4 p-2 items-center hover:bg-gray-900 rounded-lg">
                                {session.user.Image ? (
                                    <Image
                                        className="rounded-full h-auto"
                                        src={session.user.image}
                                        alt="logo"
                                        width={45}
                                        height={40}
                                    />
                                ) : (
                                    <Image
                                        className="rounded-full h-auto"
                                        src={"/user.png"}
                                        alt="logo"
                                        width={45}
                                        height={40}
                                    />
                                )}
                                <div>
                                    <p className="font-medium">
                                        {session.user.name}
                                    </p>
                                    <p>{session.user.email}</p>
                                </div>
                            </div>
                            <div
                                className="px-6 pt-2 pb-4 flex gap-2 hover:bg-slate-900 cursor-pointer "
                                onClick={() => signOut()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                    />
                                </svg>
                                <p>sign out</p>
                            </div>
                        </>
                    ) : (
                        <Link
                            href={"/auth/signin"}
                            className="flex my-2 mx-4 gap-4 p-2 items-center hover:bg-gray-900/50 rounded-lg hover:text-zinc-300"
                        >
                            <em className="hover:text-zinc-300">Sign In</em>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
