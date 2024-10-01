import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchBaseCurrency } from 'reduxState/operations';
import { selectBaseCurrency } from 'reduxState/selector';
import { setBaseCurrency } from 'reduxState/slice';

export const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    if (!baseCurrency) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      async function success(pos) {
        const crd = pos.coords;
        dispatch(
          fetchBaseCurrency({
            latitude: crd.latitude,
            longitude: crd.longitude,
          }),
        );
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        dispatch(setBaseCurrency('USD'));
      }

      window.navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, [baseCurrency, dispatch]);

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
