import { useState } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const hendlChange = evt => {
    setQuery(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      return alert('Введите запрос');
    }
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <FaSearch />
        </button>

        <input
          name="query"
          value={query}
          onChange={hendlChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
