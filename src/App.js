import React, { useState, useEffect } from 'react';
import { pamperData } from './data';
import GiftBanners from './pages/giftBanners/GiftBanners';
import GiftBuilder from './pages/giftBuilder';

import PdpPopupContextProvider from './contexts/PdpPopupContext';
import SelectedProductContextProvider from './contexts/SelectedProductContext';
import ChosenProductContextProvider from './contexts/ChosenProductContext';

import './App.css';
import ErrorHandle from './components/ErrorHandle';

const App = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [choice1, setChoice1] = useState([]);
  const [choice2, setChoice2] = useState([]);
  const [choice3, setChoice3] = useState([]);
  const [choiceRenderData, setChoiceRenderData] = useState({});

  const [httpErr, setHttpErr] = useState(false);

  // const { popupState } = useContext(PdpPopupContext);

  const bannerClickHandler = (data) => {
    setSelectedBanner(data);
    setChoice1(data.choice1);
    setChoice2(data.choice2);
    setChoice3(data.choice3);
  };
  useEffect(() => {
    const campaignID = window._ShopContext.CampaignNumber;
    const fetchURL = (campaignID, pIds) =>
      `/api/productsapi/getproducts?language=en&campaignNumber=${campaignID}&productIds=${pIds}`;
    if (!selectedBanner) return;
    const getSelectPageData = async () => {
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
      console.log('finalData', finalData);
      setChoiceRenderData(finalData);
    };

    getSelectPageData().catch((err) => {
      console.log(err);
      setHttpErr(true);
    });
  }, [selectedBanner, choice1, choice2.handles, choice2.stepTitle, choice3.handles, choice3.stepTitle]);

  const renderApp = () => {
    if (selectedBanner && !httpErr) {
      return <GiftBuilder pageData={choiceRenderData} />;
    } else if (!selectedBanner && !httpErr) {
      return <GiftBanners bannersData={pamperData} bannerClickHandler={bannerClickHandler} />;
    } else if (httpErr) {
      return <ErrorHandle />;
    }
  };

  return (
    <ChosenProductContextProvider>
      <SelectedProductContextProvider>
        <PdpPopupContextProvider>
          <main className='appwrapper'>{renderApp()}</main>
        </PdpPopupContextProvider>
      </SelectedProductContextProvider>
    </ChosenProductContextProvider>
  );
};

export default App;
// fetch("https://www.shopwithmyrep.co.uk/api/productsapi/getproducts?language=en&campaignNumber=202209&productIds=17651", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9",
//     "if-none-match": ":dtagent10249220905100923ypYa",
//     "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://www.shopwithmyrep.co.uk/product/17122/true-colour-ultra-satin-lipstick?ticket=Oy9kZXNrdG9wLXNlYXJjaC9zZWFyY2gtYXNzaXN0YW50L3N1Z2dlc3RlZC1wcm9kdWN0czsjO3Byb2R1Y3Rfa2V5OzE3MTIyX1VLOzE3MTIyLTIxMjM5ODQyNTA3OTtPQkpFQ1RJVkUkO05PTkU6Tk9ORTsyOw&attach=25034594",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });
