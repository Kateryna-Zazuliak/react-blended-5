import Select from 'react-select';
import symbols from './symbols.json';
import styles from './SelectRates.module.css';
import './ReactSelect.css';
import { setBaseCurrency } from 'reduxState/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency } from 'reduxState/selector';

export const SelectRates = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);
  const handleSetCurrency = ({ value }) => {
    dispatch(setBaseCurrency(value));
  };
  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        options={symbols}
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        onChange={handleSetCurrency}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};
