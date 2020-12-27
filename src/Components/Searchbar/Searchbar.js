import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

function Searchbar({ onSubmitForm }) {
  const [search, setSearch] = useState('');

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (search.trim() === '') {
      return toast.error('Please enter something to start your search!');
    }

    onSubmitForm(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
          value={search}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
