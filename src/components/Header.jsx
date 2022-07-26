import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchTopBTN from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [title, setTitle] = useState('');
  const [hasSearchBtn, setHasSearchBtn] = useState(false);
  const [hasSearchBar, setHasSearchBar] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const titleNames = pathname.split(/-|\//gi);
    const handleTitles = [];
    titleNames.forEach((titleWord) => {
      if (titleWord !== '') {
        handleTitles.push(titleWord.charAt(0).toUpperCase() + titleWord.slice(1));
      }
    });
    if (handleTitles.length > 1) {
      setTitle(`${handleTitles[0]} ${handleTitles[handleTitles.length - 1]}`);
    } else {
      setTitle(`${handleTitles[0]}`);
    }

    if (pathname === '/foods'
      || pathname === '/drinks'
      || pathname.includes('nationalities')) setHasSearchBtn(true);
  }, [pathname]);

  return (
    <header className="border-bottom pb-2 mb-4">
      <section className="d-flex justify-content-between align-items-center mx-2">
        <button
          type="button"
          className="icon-button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
        </button>
        <h5 className="name-title" data-testid="page-title">{title}</h5>
        { hasSearchBtn
        && (
          <button
            type="button"
            onClick={ () => setHasSearchBar(!hasSearchBar) }
            className="icon-button"
          >
            <img src={ searchTopBTN } alt="Search Icon" data-testid="search-top-btn" />
          </button>)}
      </section>
      { hasSearchBar && <SearchBar />}
    </header>
  );
}
