import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges
    const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout>
                <div className="container">
                    <header className="author-header">
                        <div className="author-header-image">
                            {author.profile_image && <img src={author.profile_image} alt={author.name} />}
                        </div>
                        <div className="author-header-content">
                            <h1>{author.name}</h1>
                            {author.bio && <p>{author.bio}</p>}
                            <div className="author-header-meta">
                                {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                <a className="author-header-item" href="https://www.linkedin.com/in/leeredwards" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a className="author-header-item" href="https://github.com/ledwards" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a className="author-header-item" href="https://root.vc" target="_blank" rel="noopener noreferrer">root.vc</a>
                            </div>
                        </div>
                    </header>
                    <section className="about">
                        <h2>About this blog</h2>
                        <p>
                            Random thoughts on <a href="/tag/software">software</a>,&nbsp;
                            <a href="/tag/vc">venture capital</a>, and&nbsp;
                            <a href="/tag/olin">engineering education at Olin College of Engineering</a>.
                            Most posts are 30m of thought put to paper. Ones that are not terrible will
                            show up as <a href="/featured/">Featured</a>.&nbsp;
                            <a hred="#subscribe">Subscribe</a> below!
                        </p>
                    </section>
                    <section>
                        <h2>Interviews</h2>
                        <ul>
                            <li><a href="https://vchunting.com/lee-edwards">VC Hunting - My First Year at Root</a></li>
                            <li><a href="https://corecursive.com/043-lee-edwards-developer-tools">Corecursive - Investing in Open Source</a></li>
                            <li><a href="https://www.youtube.com/watch?v=k4hZxxGHdjI&feature=youtu.be">Sand Hill Road - Financing Hard Tech</a></li>
                            <li><a href="https://podcasts.apple.com/us/podcast/episode-4-what-is-hard-tech-or-deep-tech-why-are-companies/id1477671920?i=1000449154107">Disruptive Innovation - Hard Tech Startups</a></li>
                            <li><a href="https://podcasts.apple.com/us/podcast/requests-for-startups-hard-tech-trae-vassallo-lee-edwards/id1316769266?i=1000444589418">Village Global - Hard Tech w/ Trae Vasallo</a></li>
                            <li><a href="https://podtail.com/podcast/the-neolib-podcast/getting-to-the-root-of-venture-capital-ft-lee-edwa">Neoliberal Podcast - What is Venture Capital?</a></li>
                            <li><a href="https://podcasts.apple.com/ie/podcast/episode-25-the-future-of-consumer-products/id1316769266?i=1000414303169">Village Global - CPG & DTC w/ Nikki Quinn</a></li>
                        </ul>
                    </section>
                    <section>
                        <h2>in Media</h2>
                        <ul>
                            <li><a href="https://www.businessinsider.com/i-tried-barrys-bootcamp-a-vc-favorite-intense-fitness-program-2019-5">I Tried Barry's Bootcamp</a></li>
                            <li><a href="https://www.inc.com/jessica-stillman/this-tiny-college-produces-5-times-more-entreprene.html">This Tiny College Produces 5 Times as Many Entrepreneurs as Stanford</a></li>
                        </ul>
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
