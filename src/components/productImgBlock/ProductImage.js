import React from 'react';
import ImageSlider from '../imageSlider/ImageSlider';

//import ReactReadMoreReadLess from 'react-read-more-read-less';

import './ProductImage.css';

const ProductImage = ({ title, images, position }) => {
  return (
    <div className='product-image-container'>
      <div className={`product-image ${position === 'modal' ? 'in-modal' : ''}`}>
        <ImageSlider images={images} title={title} position={position} />
      </div>
      <p className='product-name' title={title}>
        {title}
      </p>
    </div>
  );
};

export default ProductImage;
