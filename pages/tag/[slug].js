import ContainerPost from "@/components/ContainerPost";
import Layout from "@/components/Layout";
import { getAllPosts, getPostsByTag } from "@/lib/test-data";
import Head from "next/head";
import React from "react";

function Tag({ data: nodes, popularPost, url }) {
    const popularNodes = popularPost.slice(5, 8).reverse();

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
                    title={`Postingan terkait : ${url}`}
                />
            </Layout>
        </div>
    );
}

export default Tag;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const response = await getPostsByTag(params.slug);
    const data = response?.data?.posts?.nodes;

    const getPopular = await getAllPosts();
    const popularPost = getPopular?.data?.posts?.nodes;

    return {
        props: {
            data: data,
            popularPost: popularPost,
            url: params.slug,
        },
    };
}
