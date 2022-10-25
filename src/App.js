import React, { useState, useEffect } from 'react';
import { pamperData } from './data';
import GiftBanners from './pages/giftBanners/GiftBanners';
import GiftBuilder from './pages/giftBuilder';

import PdpPopupContextProvider from './contexts/PdpPopupContext';
import SelectedProductContextProvider from './contexts/SelectedProductContext';
import ChosenProductContextProvider from './contexts/ChosenProductContext';

import './App.css';
import ErrorHandle from './components/ErrorHandle';
import SelectedGiftOptionContextProvider from './contexts/SelectedGiftOptionContext';

const App = () => {
  const [selectedBanner, setSelectedBanner] = useState(JSON.parse(localStorage.getItem('avon-mealdeal-preselected')) || null);

  const [choiceRenderData, setChoiceRenderData] = useState({});

  //const { setSelectedGiftOption } = useContext(selectedGiftOptionContext);

  const [httpErr, setHttpErr] = useState(false);

  // const { popupState } = useContext(PdpPopupContext);

  const bannerClickHandler = (data) => {
    setSelectedBanner(data);

    //setSelectedGiftOption(data);
  };
  useEffect(() => {
    const campaignID = window._ShopContext.CampaignNumber;
    const fetchURL = (campaignID, pIds) =>
      `/api/productsapi/getproducts?language=en&campaignNumber=${campaignID}&productIds=${pIds}`;

    if (!selectedBanner) {
      return;
    }
    const getSelectPageData = async () => {
      const { choice1, choice2, choice3 } = selectedBanner;
      const response1 = await fetch(fetchURL(campaignID, choice1.handles.join()));
      const jsonData1 = await response1.json();
      const data1 = jsonData1.Data;

      const response2 = await fetch(fetchURL(campaignID, choice2.handles.join()));
      const jsonData2 = await response2.json();
      const data2 = jsonData2.Data;

      const response3 = await fetch(fetchURL(campaignID, choice3.handles.join()));
      const jsonData3 = await response3.json();
      const data3 = jsonData3.Data;

      const finalData = {
        bundledPrice: selectedBanner.currentPrice,
        dealTitle: selectedBanner.dealTitle,
        allData: [
          { stepTitle: choice1.stepTitle, stepId: 1, data: data1 },
          { stepTitle: choice2.stepTitle, stepId: 2, data: data2 },
          { stepTitle: choice3.stepTitle, stepId: 3, data: data3 },
        ],
      };
      //console.log('finalData', finalData);
      setChoiceRenderData(finalData);
      localStorage.removeItem('avon-mealdeal-preselected');
    };

    getSelectPageData().catch((err) => {
      console.log(err);
      setHttpErr(true);
      localStorage.removeItem('avon-mealdeal-preselected');
    });
  }, [selectedBanner]);

  const renderApp = () => {
    if (selectedBanner && !httpErr) {
      return <GiftBuilder pageData={choiceRenderData} currentSelection={selectedBanner} />;
    } else if (!selectedBanner && !httpErr) {
      return <GiftBanners bannersData={pamperData} bannerClickHandler={bannerClickHandler} />;
    } else if (httpErr) {
      return <ErrorHandle />;
    }
  };

  return (
    <SelectedGiftOptionContextProvider>
      <ChosenProductContextProvider>
        <SelectedProductContextProvider>
          <PdpPopupContextProvider>
            <main className='appwrapper'>{renderApp()}</main>
          </PdpPopupContextProvider>
        </SelectedProductContextProvider>
      </ChosenProductContextProvider>
    </SelectedGiftOptionContextProvider>
  );
};

export default App;
