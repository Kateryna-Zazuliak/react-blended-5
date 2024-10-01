import { Wave } from 'react-animated-text';
import {
  Container,
  Filter,
  Heading,
  Loader,
  RatesList,
  Section,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectError,
  selectFilteredRates,
  selectIsLoading,
} from 'reduxState/selector';
import { useEffect } from 'react';
import { fetchLatestRates } from 'reduxState/operations';

const Rates = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectFilteredRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(fetchLatestRates(baseCurrency));
    }
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isLoading && <Loader />}
        <Filter />
        {rates.length > 0 && <RatesList rates={rates} />}
        {error && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
