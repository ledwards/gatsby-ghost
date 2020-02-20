import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'


const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)
    const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    return (
        <Link to={url} className="post-card">
            <header>
                {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div>}
                <h2 className="post-card-title">{post.title}</h2>
                <div className="post-card-subhead">
                    <div className="post-card-subhead-left">
                        <div>{date}{post.featured && <span> &mdash; Featured</span>}</div>
                    </div>
                    <div className="post-card-subhead-right">
                        <div>{readingTime}</div>
                    </div>
                </div>
            </header>
            <section className="post-card-excerpt">{post.excerpt}...</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                </div>
                <div className="post-card-footer-right">
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
