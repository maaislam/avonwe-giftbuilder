import React from 'react';

const Variant = ({ variant, index, onSelectionChange, selectedSwatchIdx, setSelectedSwatchIdx }) => {
  //const swatchName = variant.Name;
  const isAvailableClass = variant.Availability === 1 ? '' : 'not-available';
  return (
    <div
      className={`${isAvailableClass} variant-option ${selectedSwatchIdx === index ? 'active-swatch' : ''}`}
      onClick={() => {
        onSelectionChange(variant);
        setSelectedSwatchIdx(index);
      }}
    >
      <div
        className={` variant-circle-img ${variant.Image ? '' : 'hide'}`}
        style={{ backgroundImage: `url(${variant.Image})` }}
      ></div>
      {/* <p>{swatchName}</p> */}
    </div>
  );
};

export default Variant;
