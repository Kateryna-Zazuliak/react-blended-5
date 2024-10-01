import {
  Container,
  ExchangeForm,
  ExchangeInfo,
  Heading,
  Loader,
  Section,
} from 'components';
import { useSelector } from 'react-redux';
import {
  selectError,
  selectExchangeInfo,
  selectIsLoading,
} from 'reduxState/selector';

const Home = () => {
  const exchangeInfo = useSelector(selectExchangeInfo);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <Section>
      <Container>
        {!error && !exchangeInfo && (
          <Heading info title="What currencies do you want to exchange?🙂" />
        )}
        <ExchangeForm />
        {exchangeInfo && (
          <ExchangeInfo
            amount={exchangeInfo.amount}
            from={exchangeInfo.from}
            to={exchangeInfo.to}
            rate={exchangeInfo.rate}
            result={exchangeInfo.result}
          />
        )}
        {isLoading && <Loader />}
        {error && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
