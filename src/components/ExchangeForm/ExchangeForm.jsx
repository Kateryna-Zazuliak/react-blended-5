import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { fetchExchangeInfo } from 'reduxState/operations';
import { useState } from 'react';

export const ExchangeForm = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const [amount, from, , to] = inputValue.split(' ');
    dispatch(
      fetchExchangeInfo({
        from: from,
        to: to,
        amount: amount,
      }),
    );
    setInputValue('');
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        title="Request format 15 USD in UAH"
        className={styles.input}
        placeholder="15 USD in UAH"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        required
      />
    </form>
  );
};
