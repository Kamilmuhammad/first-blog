import { gql, useMutation } from "@apollo/client";
import { client } from "./apollo";

export async function getAllPosts() {
    const GET_POSTS = gql`
        query GetAllPosts {
            posts {
                nodes {
                    title
                    content
                    uri
                    date
                    id
                    author {
                        node {
                            firstName
                            lastName
                        }
                    }
                    featuredImage {
                        node {
                            title
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    const response = await client.query({
        query: GET_POSTS,
    });
    return response;
}

export async function getPostByUri(uri) {
    const GET_POST_BY_URI = gql`
        query GetPostByURI($id: ID = "hello-world") {
            post(id: $id, idType: URI) {
                title
                uri
                content
                date
                postId
                author {
                    node {
                        firstName
                        lastName
                    }
                }
                featuredImage {
                    node {
                        sourceUrl
                        title
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
                tags {
                    nodes {
                        name
                        slug
                    }
                }
                comments(first: 100, where: { parent: 0 }) {
                    nodes {
                        content
                        date
                        author {
                            node {
                                avatar {
                                    url
                                }
                                name
                            }
                        }
                        replies {
                            nodes {
                                content
                                date
                                author {
                                    node {
                                        name
                                        avatar {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    const response = await client.query({
        query: GET_POST_BY_URI,
        variables: {
            id: uri,
        },
    });
    return response;
}

export async function searchPost(query) {
    const SEARCH_POSTS = gql`
        query GetAllPosts($query: String) {
            posts(where: { search: $query }) {
                nodes {
                    title
                    content
                    uri
                    date
                    author {
                        node {
                            firstName
                            lastName
                        }
                    }
                    featuredImage {
                        node {
                            title
                            sourceUrl
                        }
                    }
                    categories {
                        nodes {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const response = await client.query({
        query: SEARCH_POSTS,
        variables: {
            query: query,
        },
    });

    return response;
}

export async function getPostsByTag(query) {
    const GET_POSTS_BY_TAG = gql`
        query getPostsByTag($query: [String]) {
            posts(where: { tagSlugAnd: $query }) {
                nodes {
                    title
                    uri
                    date
                    author {
                        node {
                            firstName
                            lastName
                        }
                    }
                    categories {
                        nodes {
                            slug
                            name
                        }
                    }
                    featuredImage {
                        node {
                            title
                            sourceUrl
                        }
                    }
                    content
                }
            }
        }
    `;

    const response = await client.query({
        query: GET_POSTS_BY_TAG,
        variables: {
            query: query,
        },
    });

    return response;
}

export const POST_COMMENT = gql`
    mutation CreateComment(
        $author: String!
        $authorEmail: String!
        $content: String!
        $date: String!
        $commentOn: Int
    ) {
        createComment(
            input: {
                author: $author
                authorEmail: $authorEmail
                content: $content
                date: $date
                commentOn: $commentOn
            }
        ) {
            comment {
                id
            }
        }
    }
`;
