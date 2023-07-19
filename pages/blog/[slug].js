import Head from "next/head";
import { getPostByUri, getAllPosts, POST_COMMENT } from "@/lib/test-data";
import Layout from "@/components/Layout";
import MostPopular from "@/components/MostPopular";
import Image from "next/image";
import AuthorInfo from "@/components/AuthorInfo";
import Link from "next/link";
import Tag from "@/components/Tag";
import getDate from "@/lib/getDate";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function SlugPage({ posts, post }) {
    const { nodes } = posts;
    const comments = post.comments.nodes;
    const [alert, setAlert] = useState(false);
    const popularNodes = nodes.slice(5, 8).reverse();
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

    const dates = new Date(post.date);
    const day = dates.getDate();
    const monthIndex = dates.getMonth();
    const year = dates.getFullYear();
    const formatDate = day + " " + monthNames[monthIndex] + " " + year;

    function dateComment(date) {
        const dates = new Date(date);
        const day = dates.getDate();
        const monthIndex = dates.getMonth();
        const year = dates.getFullYear();
        const hours = dates.getHours();
        const minutes = dates.getMinutes().toString().padStart(2, "0");
        return (
            day +
            " " +
            monthNames[monthIndex] +
            " " +
            year +
            " " +
            hours +
            ":" +
            minutes
        );
    }

    const [postCommentMutation] = useMutation(POST_COMMENT);

    const postComment = async (input) => {
        try {
            const response = await postCommentMutation({
                variables: input,
            });

            return response.data;
        } catch (error) {
            console.error("Error posting comment:", error);
            throw new Error("Failed to post comment");
        }
    };

    const handleSubmit = async (event) => {
        if (
            !event.target[0].value ||
            !event.target[1].value ||
            !event.target[2].value
        ) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            event.preventDefault();
        } else {
            const scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;
            const input = {
                author: event.target[0].value,
                authorEmail: event.target[1].value,
                content: event.target[2].value,
                date: getDate(new Date()),
                commentOn: post.postId,
            };

            try {
                const result = await postComment(input);
                console.log("Comment posted successfully:", result);
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
            event.target.reset();

            // Menyimpan posisi scroll sebelum refresh ke dalam sessionStorage
            sessionStorage.setItem("scrollPosition", scrollPosition);

            // Mengatur history.scrollRestoration ke 'manual' sebelum melakukan refresh halaman
            history.scrollRestoration = "manual";

            setTimeout(() => {
                // Mengambil posisi scroll dari sessionStorage setelah halaman dimuat ulang
                const storedScrollPosition =
                    sessionStorage.getItem("scrollPosition");

                // Mengatur posisi scroll kembali ke nilai yang disimpan setelah halaman dimuat ulang
                window.scrollTo(0, storedScrollPosition);

                // Menghapus nilai posisi scroll dari sessionStorage
                sessionStorage.removeItem("scrollPosition");

                // Mengatur kembali history.scrollRestoration ke 'auto' setelah halaman dimuat ulang
                history.scrollRestoration = "auto";
            }, 3000);
        }
    };

    return (
        <div>
            <Head>
                <title>Headless WP Next Starter</title>
            </Head>

            <Layout>
                <section className="flex md:flex-row flex-col w-full md:justify-between gap-6 h-auto text-zinc-900">
                    <div className="md:basis-11/12 bg-white md:px-4 py-4 px-0 relative">
                        <Image
                            className="max-w-full h-auto mx-auto rounded-sm mb-6 sm:px-2 md:px-0"
                            src={post.featuredImage.node.sourceUrl}
                            alt={"featuredImage"}
                            width={800}
                            height={200}
                        />
                        <div className="px-2 sm:px-4 md:px-0">
                            <Link
                                href={`/category`}
                                className="bg-rose-600 px-6 text-white py-1 font-semibold cursor-pointer hover:bg-red-700 capitalize"
                            >
                                {post.categories.nodes[0].name}
                            </Link>
                            <h1 className="font-bold text-3xl py-4">
                                {post.title}
                            </h1>

                            <AuthorInfo
                                firstName={post.author.node.firstName}
                                lastName={post.author.node.lastName}
                                date={formatDate}
                            />
                            <div
                                className="space-y-4 md:space-y-2 leading-5 md:leading-6 mt-8"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />

                            <div className="mt-4 text-2xl font-medium flex">
                                Tags{" "}
                                <div className="w-10 h-1 bg-zinc-900 mt-4 ml-2 rounded-s-xl rounded-e-xl"></div>
                            </div>
                            <div className="flex mt-2 flex-wrap gap-3">
                                {post.tags.nodes.map((tag, i) => (
                                    <Tag
                                        key={i}
                                        name={tag.name}
                                        slug={tag.slug}
                                    />
                                ))}
                            </div>
                            <h1 className="mt-6 mb-4 text-2xl font-medium capitalize">
                                comments
                            </h1>

                            {comments.length > 0 ? (
                                comments
                                    .slice()
                                    .reverse()
                                    .map((comment, index) => (
                                        <div
                                            key={index}
                                            className="md:ml-8 mb-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                {comment.author.node.avatar &&
                                                    comment.author.node.avatar
                                                        .url && (
                                                        <Image
                                                            className="w-10 rounded-full mt-2   "
                                                            src={
                                                                comment.author
                                                                    .node.avatar
                                                                    .url
                                                            }
                                                            height={20}
                                                            width={20}
                                                            alt={"ava"}
                                                        />
                                                    )}

                                                <div className="w-full md:pr-2">
                                                    <p className="font-medium capitalize">
                                                        {
                                                            comment.author.node
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-xs mb-3">
                                                        {dateComment(
                                                            comment.date
                                                        )}
                                                    </p>
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: comment.content,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {comment.replies.nodes &&
                                                comment.replies.nodes
                                                    .slice()
                                                    .reverse()
                                                    .map((reply, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-4 md:ml-8 ml-4 mt-3"
                                                        >
                                                            <Image
                                                                className="w-8 rounded-full"
                                                                src={
                                                                    reply.author
                                                                        .node
                                                                        .avatar
                                                                        .url
                                                                }
                                                                height={20}
                                                                width={20}
                                                                alt={"ava"}
                                                            />
                                                            <div className="w-full md:pr-2">
                                                                <p className="font-medium capitalize">
                                                                    {
                                                                        reply
                                                                            .author
                                                                            .node
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-xs">
                                                                    {dateComment(
                                                                        reply.date
                                                                    )}
                                                                </p>
                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: reply.content,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                        </div>
                                    ))
                            ) : (
                                <p className="text-center text-zinc-500 py-20">
                                    Belum ada komentar!
                                </p>
                            )}
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-zinc-200 p-4 space-y-4 rounded"
                        >
                            <label
                                htmlFor="name"
                                className="font-medium text-xl capitalize block"
                            >
                                add comments!
                            </label>
                            {alert && (
                                <div className="bg-red-100 text-red-900 font-base px-4 py-2 rounded-lg">
                                    Nama, Email, atau Komentar tidak boleh
                                    kosong!!!
                                </div>
                            )}
                            <div className="flex gap-4 flex-wrap md:flex-nowrap">
                                <input
                                    type="text"
                                    className="p-3 w-full"
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    className="p-3 w-full"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <textarea
                                className="p-3 w-full"
                                placeholder="Message"
                                name="message"
                                cols="20"
                                rows="4"
                            ></textarea>
                            <div className="text-center">
                                <button className="px-5 py-3 bg-rose-600 font-medium text-white rounded">
                                    Send Comment!
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* MOST POPULAR */}

                    <div className="bg-white md:basis-4/12 md:px-4 py-4 px-0">
                        <nav className="bg-slate-900 md:w-full w-11/12 mx-auto text-white px-4 py-2 font-semibold mb-4">
                            Most Popular
                        </nav>

                        <div className="">
                            {popularNodes.map((node, index) => (
                                <MostPopular
                                    key={node.id}
                                    slug={node.uri}
                                    featuredImageUrl={
                                        node.featuredImage.node.sourceUrl
                                    }
                                    categoryName={node.categories.nodes[0].name}
                                    categorySlug={node.categories.nodes[0].slug}
                                    title={node.title}
                                    firstName={node.author.node.firstName}
                                    lastName={node.author.node.lastName}
                                    date={node.date}
                                    content={node.content}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const response = await getPostByUri(params.slug);
    const getposts = await getAllPosts();
    const posts = getposts?.data?.posts;
    const post = response?.data?.post;
    if (!post) {
        return {
            notFound: true, //redirects to 404 page
        };
    }

    return {
        props: {
            post,
            posts,
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
