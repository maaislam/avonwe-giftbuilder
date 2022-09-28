import React from 'react';
import './Ratings.css';

const Ratings = ({ rating, ratingCount }) => {
  const ratingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const rounderRating = Math.floor(rating);
      if (i <= rounderRating) {
        stars.push(<span key={i} className='yotpo-icon'></span>);
      } else if (i === rounderRating + 1 && (rating * 10) % 5) {
        stars.push(<span key={i} className='yotpo-icon half-star'></span>);
      } else {
        stars.push(<span key={i} className='yotpo-icon empty-star'></span>);
      }
    }
    //setStarsData({ stars, total_reviews });
    return stars;
  };

  return (
    <div className={`yotpo-bottomLine ${ratingCount ? '' : 'rating-invisible'}`}>
      <div className='yotpo-display-wrapper'>
        <div className='standalon-bottomline'>
          <div className='yotpo-bottomlie pull-left'>
            <div className='yotpo-stars'>{ratingStars(rating)}</div>
            <span className='yotpo-rev-count'>{ratingCount} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
