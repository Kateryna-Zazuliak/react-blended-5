import { Header, Heading } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUserInfo } from 'service/opencagedataApi';

export const App = () => {
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;
      const result = await getUserInfo({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
      console.log(result.results[0].annotations.currency.iso_code);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Header>
  );
};
