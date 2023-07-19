import Layout from "@/components/Layout";
import MostPopular from "@/components/MostPopular";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/test-data";
import Head from "next/head";
import React, { useState, useEffect } from "react";

export default function Category({ posts }) {
    const { nodes } = posts;
    const popularNodes = nodes.slice(5, 8).reverse();

    const [timnas, setTimnas] = useState([]);
    const [news, setNews] = useState([]);
    const [liga1, setLiga1] = useState([]);

    useEffect(() => {
        const timnasFiltered = nodes.filter((node) =>
            node.categories.nodes.some((category) => category.slug === "timnas")
        );
        const newsFiltered = nodes.filter((node) =>
            node.categories.nodes.some((category) => category.slug === "news")
        );
        const liga1Filtered = nodes.filter((node) =>
            node.categories.nodes.some((category) => category.slug === "liga-1")
        );
        setTimnas(timnasFiltered);
        setNews(newsFiltered);
        setLiga1(liga1Filtered);
    }, [nodes]);

    return (
        <div>
            <Head>
                <title>Headless WP Next Starter</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Layout>
                <section className="flex md:flex-row flex-col w-full md:justify-between gap-6 h-auto">
                    <div className="md:basis-10/12 bg-white md:px-4 py-4 px-0">
                        <nav className="bg-slate-900 md:w-full w-11/12 mx-auto text-white px-4 py-2 font-semibold mb-4">
                            Categories
                        </nav>
                        <nav className="bg-slate-900 ml-3 md:ml-0 text-white px-4 py-2 font-semibold mb-4 inline rounded">
                            Liga 1
                        </nav>
                        <div className="flex flex-wrap mt-4">
                            {liga1.map((node, index) => (
                                <MostPopular
                                    key={node.id}
                                    category={true}
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
                        <nav className="bg-slate-900 ml-3 md:ml-0 text-white px-4 py-2 font-semibold mb-4 inline rounded">
                            Timnas
                        </nav>
                        <div className="flex flex-wrap mt-4">
                            {timnas.map((node, index) => (
                                <MostPopular
                                    key={node.id}
                                    category={true}
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
                        <nav className="bg-slate-900 ml-3 md:ml-0 text-white px-4 py-2 font-semibold mb-4 inline rounded">
                            News
                        </nav>
                        <div className="flex flex-wrap mt-4">
                            {news.map((node, index) => (
                                <MostPopular
                                    key={node.id}
                                    category={true}
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

export async function getServerSideProps() {
    const response = await getAllPosts();
    const posts = response?.data?.posts;
    return {
        props: {
            posts,
        },
    };
}
