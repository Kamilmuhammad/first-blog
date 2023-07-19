import ContainerPost from "@/components/ContainerPost";
import Layout from "@/components/Layout";
import { getAllPosts } from "@/lib/test-data";
import Head from "next/head";
import React from "react";

function Blog({ posts }) {
    const { nodes } = posts;
    const postNodes = nodes;
    const popularNodes = nodes.slice(5, 8).reverse();

    return (
        <div>
            <Head>
                <title>Headless WP Next Starter</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Layout>
                <ContainerPost
                    postNodes={postNodes}
                    popularNodes={popularNodes}
                    title={"Blog"}
                />
            </Layout>
        </div>
    );
}

export default Blog;

export async function getServerSideProps() {
    const response = await getAllPosts();
    const posts = response?.data?.posts;
    return {
        props: {
            posts,
        },
    };
}
