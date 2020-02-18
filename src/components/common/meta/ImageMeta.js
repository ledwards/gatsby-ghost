import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../../../utils/siteConfig'

const ImageMeta = ({ image }) => {
    if (!image) {
        return null
    }

    return (
        <Helmet>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content='./images/lee-af.png' />
            <meta property="og:image" content='./images/lee-af.png' />
            <meta property="og:image:width" content='1200px' />
            <meta property="og:image:height" content='630px' />
        </Helmet >
    )
}

ImageMeta.propTypes = {
    image: PropTypes.string,
}

export default ImageMeta
