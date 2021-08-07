import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ rating, numReviews, color }) => {
    return (
        <div className = 'rating'>
            <div className='ml-1'></div>
            <span>
               <i style = {{color: color}} className = { rating >= 1 ? 'fas fa-star':
                    rating >= 0.5 ? 'fas fa-star-half-alt': 'far fa-star'
               }>
               </i>
            </span>
            <span>
               <i style = {{color: color}} className = { rating >= 2 ? 'fas fa-star':
                    rating >= 1.5 ? 'fas fa-star-half-alt': 'far fa-star'
               }>
               </i>
            </span>
            <span>
               <i style = {{color: color}} className = { rating >= 3 ? 'fas fa-star':
                    rating >= 2.5 ? 'fas fa-star-half-alt': 'far fa-star'
               }>
               </i>
            </span>
            <span>
               <i style = {{color: color}} className = { rating >= 4 ? 'fas fa-star':
                    rating >= 3.5 ? 'fas fa-star-half-alt': 'far fa-star'
               }>
               </i>
            </span>
            <span>
               <i style = {{color: color}} className = { rating >= 5 ? 'fas fa-star':
                    rating >= 4.5 ? 'fas fa-star-half-alt': 'far fa-star'
               }>
               </i>
            </span>
            <span>  </span>
            <span>
                {numReviews =! null ? `from ${numReviews} reviews`: ``}
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'orange',
    numReviews: 0,
    rating: 0
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default Rating
