import Head from "next/head";
import { getAllPosts } from "../lib/test-data";
import Layout from "@/components/Layout";
import PostCardHero from "../components/PostCardHero";
import Link from "next/link";
import ContainerPost from "@/components/ContainerPost";

export default function Home({ posts }) {
    const { nodes } = posts;
    const postNodes = nodes.slice(3);
    const popularNodes = nodes.slice(5, 8).reverse();
    return (
        <div>
            <Head>
                <title>Headless WP Next Starter</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <Layout>
                <section
                    className={`grid grid-rows-3 md:grid-rows-2 grid-flow-row  md:grid-flow-col  gap-4  md:h-[500px] h-screen`}
                >
                    <div className={`md:col-span-2 md:row-span-2`}>
                        <PostCardHero
                            bgImage={nodes[0].featuredImage.node.sourceUrl}
                            category={nodes[0].categories.nodes[0].name}
                            title={nodes[0].title}
                            slug={nodes[0].uri}
                            firstName={nodes[0].author.node.firstName}
                            lastName={nodes[0].author.node.lastName}
                            date={nodes[0].date}
                            subHero={false}
                        />
                    </div>
                    <div className="row-span-1">
                        <PostCardHero
                            bgImage={nodes[1].featuredImage.node.sourceUrl}
                            category={nodes[1].categories.nodes[0].name}
                            title={nodes[1].title}
                            slug={nodes[1].uri}
                            firstName={nodes[1].author.node.firstName}
                            lastName={nodes[1].author.node.lastName}
                            date={nodes[1].date}
                            subHero={true}
                        />
                    </div>
                    <div className="row-span-1  ">
                        <PostCardHero
                            bgImage={nodes[2].featuredImage.node.sourceUrl}
                            category={nodes[2].categories.nodes[0].name}
                            title={nodes[2].title}
                            slug={nodes[2].uri}
                            firstName={nodes[2].author.node.firstName}
                            lastName={nodes[2].author.node.lastName}
                            date={nodes[2].date}
                            subHero={true}
                        />
                    </div>
                </section>

                {/* Breaking News */}
                <section className="bg-white mt-2 mb-6 py-2 px-4">
                    <p className="font-medium">
                        <span className="font-bold text-red-600">
                            Breaking News:{" "}
                        </span>
                        <Link
                            href={`blog${nodes[4].uri}`}
                            className="hover:underline"
                        >
                            {nodes[4].title}
                        </Link>
                    </p>
                </section>

                {/* Latest News */}
                <ContainerPost
                    postNodes={postNodes}
                    popularNodes={popularNodes}
                    title={"Latest New"}
                />
            </Layout>
        </div>
    );
}

export async function getStaticProps() {
    const response = await getAllPosts();
    const posts = response?.data?.posts;
    return {
        props: {
            posts,
        },
    };
}
