import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };
  handleChangeInput = evt => {
    this.setState({ query: evt.currentTarget.value.toLowerCase() });
  };
  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.button} type="submit">
            <FaSearch size={20} />
          </button>
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
