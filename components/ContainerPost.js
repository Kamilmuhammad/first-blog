import React from "react";
import MostPopular from "./MostPopular";
import PostCard from "./PostCard";

function ContainerPost({ postNodes, popularNodes, title }) {
    return (
        <section className="flex md:flex-row flex-col w-full md:justify-between gap-6 h-auto">
            <div className="md:basis-10/12 bg-white md:px-4 py-4 px-0 strong">
                <nav className="bg-slate-900 md:w-full w-11/12 mx-auto text-white px-4 py-2 font-semibold mb-4">
                    {title}
                </nav>
                {postNodes.length !== 0 ? (
                    postNodes.map((node, index) => (
                        <PostCard
                            key={index}
                            slug={node.uri}
                            featuredImageUrl={node.featuredImage.node.sourceUrl}
                            categoryName={node.categories.nodes[0].name}
                            categorySlug={node.categories.nodes[0].slug}
                            title={node.title}
                            firstName={node.author.node.firstName}
                            lastName={node.author.node.lastName}
                            date={node.date}
                            content={node.content}
                        />
                    ))
                ) : (
                    <h1 className="font-medium text-xl text-center py-40 px-10">
                        Maaf...
                        <br /> Postingan yang anda cari belum tersedia
                    </h1>
                )}
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
                            featuredImageUrl={node.featuredImage.node.sourceUrl}
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
    );
}

export default ContainerPost;
