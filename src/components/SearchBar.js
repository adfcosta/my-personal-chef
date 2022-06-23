import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import FormInput from './FormInput';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    searchValue: '',
    searchRadio: '',
  });
  const [data, setData] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;

  const { setRecipesFoods, setRecipesDrinks } = useContext(Context);

  useEffect(() => {
    switch (pathname) {
    case '/foods':
      if (data.length === 1) {
        history.push(`/foods/${data[0].idMeal}`);
      }
      break;
    case '/drinks':
      if (data.length === 1) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
      break;
    default:
      break;
    }
  }, [data, history, pathname]);

  const fetchAPI = async (URL) => {
    try {
      const MAX_N_RECIPES = 12;
      const response = await fetch(URL);
      const dataAPI = await response.json();
      switch (pathname) {
      case '/foods':
        if (dataAPI.meals === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setData(dataAPI.meals.slice(0, MAX_N_RECIPES));
        setRecipesFoods(dataAPI.meals.slice(0, MAX_N_RECIPES));
        break;
      case '/drinks':
        if (dataAPI.drinks === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setData(dataAPI.drinks.slice(0, MAX_N_RECIPES));
        setRecipesDrinks(dataAPI.drinks.slice(0, MAX_N_RECIPES));
        break;
      default:
        break;
      }
    } catch (error) {
      global.alert(error.message);
    }
  };

  const switchSearchAPIUrl = async (radioType, inputSearch, baseUrl) => {
    switch (radioType) {
    case 'Ingredient':
      await fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      break;
    case 'Name':
      await fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/search.php?s=${inputSearch}`);
      break;
    case 'First Letter':
      await fetchAPI(`https://www.${baseUrl}.com/api/json/v1/1/search.php?f=${inputSearch}`);
      break;
    default:
      return undefined;
    }
  };

  const handleChange = ({ target: { value, name } }) => (setSearchData(
    (prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }
    ),
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { searchValue, searchRadio } = searchData;
    if (searchValue.length > 1 && searchRadio === 'First Letter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    switch (pathname) {
    case '/foods':
      await switchSearchAPIUrl(searchRadio, searchValue, 'themealdb');
      break;
    case '/drinks':
      await switchSearchAPIUrl(searchRadio, searchValue, 'thecocktaildb');
      break;
    default:
      break;
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <FormInput
        dataTestId="search-input"
        placeholder="Search"
        name="searchValue"
        value={ searchData.searchValue }
        onChange={ handleChange }
      />
      <br />
      <FormInput
        labelText="Ingredient"
        dataTestId="ingredient-search-radio"
        type="radio"
        name="searchRadio"
        value="Ingredient"
        onChange={ handleChange }
      />
      <FormInput
        labelText="Name"
        dataTestId="name-search-radio"
        type="radio"
        name="searchRadio"
        value="Name"
        onChange={ handleChange }
      />
      <FormInput
        labelText="First Letter"
        dataTestId="first-letter-search-radio"
        type="radio"
        name="searchRadio"
        value="First Letter"
        onChange={ handleChange }
      />
      <br />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>

    </form>

  );
}
