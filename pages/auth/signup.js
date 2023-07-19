import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SignIn() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [hintPass, setHintPass] = useState(false);
    const [hintCPass, setHintCPass] = useState(false);

    const [alertName, setAlertName] = useState(false);
    const [alertEmail, setAlertEmail] = useState(false);
    const [alertPass, setAlertPass] = useState(false);
    const [alertCPass, setAlertCPass] = useState(false);

    const router = useRouter();
    async function handleSubmit(event) {
        event.preventDefault();
        const regex = /^(?=.*\d)(?!.*\s).*$/;
        const emailPattern = /^[\w.-]+@[\w.-]+\.\w+$/;
        const isValid = regex.test(userInfo.username);
        if (!isValid || !userInfo.username) {
            setAlertName(true);
            setTimeout(() => {
                setAlertName(false);
            }, 2000);
        } else if (!emailPattern.test(userInfo.email)) {
            setAlertEmail(true);
            setTimeout(() => {
                setAlertEmail(false);
            }, 2000);
        } else if (userInfo.password.length <= 6) {
            setAlertPass(true);
            setTimeout(() => {
                setAlertPass(false);
            }, 2000);
        } else if (
            userInfo.password !== event.target[3].value ||
            !event.target[3].value
        ) {
            setAlertCPass(true);
            setTimeout(() => {
                setAlertCPass(false);
            }, 2000);
        } else {
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-4 md:left-8 md:top-12 hover:bg-slate-300 duration-300 rounded-full p-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="md:w-10 md:h-10 w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-10 w-auto"
                    src="/next.svg"
                    alt="Your Company"
                    width={200}
                    height={200}
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create New Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            {alertName && (
                                <p className="text-sm text-red-600">
                                    username must have at least 1 number.
                                </p>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={({ target }) =>
                                    setUserInfo({
                                        ...userInfo,
                                        username: target.value,
                                    })
                                }
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            {alertEmail && (
                                <p className="text-sm text-red-600">
                                    *Invalid email
                                </p>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={({ target }) =>
                                    setUserInfo({
                                        ...userInfo,
                                        email: target.value,
                                    })
                                }
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            {alertPass && (
                                <p className="text-sm text-red-600">
                                    Your password must be at least 6 characters
                                    long.
                                </p>
                            )}
                        </div>
                        <div className="mt-2 relative">
                            <input
                                onChange={({ target }) =>
                                    setUserInfo({
                                        ...userInfo,
                                        password: target.value,
                                    })
                                }
                                id="password"
                                name="password"
                                type={hintPass ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label
                                htmlFor="password"
                                onClick={() => setHintPass(!hintPass)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute bottom-1.5 right-2 hover:text-black cursor-pointer duration-200 text-black/40"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                    />
                                </svg>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm Password
                            </label>
                            {alertCPass && (
                                <p className="text-sm text-red-600">
                                    must be the same as the password
                                </p>
                            )}
                        </div>
                        <div className="mt-2 relative">
                            <input
                                onChange={({ target }) =>
                                    setUserInfo({
                                        ...userInfo,
                                        confirmPassword: target.value,
                                    })
                                }
                                id="confirmPassword"
                                name="confirmPassword"
                                type={hintCPass ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label
                                htmlFor="confirmPassword"
                                onClick={() => setHintCPass(!hintCPass)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute bottom-1.5 right-2 hover:text-black cursor-pointer duration-200 text-black/40"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                    />
                                </svg>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div>
                    <p className="text-sm font-normal text-zinc-800 text-center mt-2">
                        Or login with:
                    </p>
                    <Image
                        onClick={async () =>
                            await signIn("google", {
                                callbackUrl: "http://localhost:3000/",
                            })
                        }
                        className="bg-white hover:bg-zinc-200 duration-300 rounded-full mx-auto mt-2 p-2 cursor-pointer"
                        src={"/google.png"}
                        alt="google"
                        width={60}
                        height={40}
                    />
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    have account?
                    <Link
                        href="/auth/signin"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        &nbsp; Sign In!
                    </Link>
                </p>
            </div>
        </div>
    );
}
