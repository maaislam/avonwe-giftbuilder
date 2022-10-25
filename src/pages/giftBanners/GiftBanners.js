import React, { useEffect } from 'react';
//import { selectedGiftOptionContext } from '../../contexts/SelectedGiftOptionContext';
import scrollToTop from '../../helpers/scrollTop';
import GiftBanner from './GiftBanner';

import './Giftbanners.css';

const GiftBanners = ({ bannersData, bannerClickHandler }) => {
  //const { setSelectedGiftOption } = useContext(selectedGiftOptionContext);

  useEffect(() => {
    scrollToTop();
  });
  //console.log(bannersData);
  const clickedTargetData = (data) => {
    bannerClickHandler(data);
    //setSelectedGiftOption(data);
  };
  const giftBanners = bannersData.map((data, index) => (
    <GiftBanner data={data} key={index} clickedTargetData={clickedTargetData} />
  ));

  return (
    <div className='giftbanners-wrapper'>
      <h1 className='giftbanners-headline'>Build A Gift</h1>
      <h4 className='giftbanners-subheadline'>
        Choose the perfect Christmas present using our step-by-step gift builder. Whether they’re a make-up guru, pamper lover or
        skincare obsessed, simply pick the pieces they’ll adore and create a gorgeous gift that’s personal to them. Your gift will
        also come with a free festive gift bag, so you don’t need to worry about the wrapping!
      </h4>
      <div class='giftbanners'>{giftBanners}</div>
    </div>
  );
};

export default GiftBanners;
