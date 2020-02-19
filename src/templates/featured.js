import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Featured page (/featured)
*
* Loads all posts that are featured incl. pagination.
*
*/
const Featured = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout>
                <div className="container">
                    <header className="tag-header">
                        <h1>Featured Posts</h1>
                        <p>most popular blog posts</p>
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                </div>
            </Layout>
        </>
    )
}

Featured.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Featured

export const pageQuery = graphql`
    query GhostFeaturedQuery {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {featured: {eq: true}}
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
