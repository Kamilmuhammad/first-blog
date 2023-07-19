import ContainerPost from "@/components/ContainerPost";
import Layout from "@/components/Layout";
import { getAllPosts, searchPost } from "@/lib/test-data";
import Head from "next/head";
import React from "react";

export default function Search({ posts, url, popularPost }) {
    const { nodes } = posts;
    const popularNodes = popularPost.nodes.slice(5, 8).reverse();
    return (
        <div>
            <Head>
                <title>Headless WP Next Starter</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Layout>
                <ContainerPost
                    postNodes={nodes}
                    popularNodes={popularNodes}
                    title={"Pencarian:" + " " + url}
                />
            </Layout>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const response = await searchPost(params.slug);
    const getPopular = await getAllPosts();
    const posts = response?.data?.posts;
    const popularPost = getPopular?.data?.posts;
    return {
        props: {
            posts: posts,
            popularPost: popularPost,
            url: params.slug,
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}
