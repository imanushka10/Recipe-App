import React, { useState } from 'react'
import "./App.css"
import Axios from "axios"

import Alert from "./components/Alert"
import Recipe from "./components/Recipe"
import { v4 as uuidv4 } from "uuid";
const App = () => {

  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('')
  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url)
      if (!result.data.more) {
        return setAlert("No food with such name")
      }
      setRecipes(result.data.hits)
      console.log(result)
      setAlert("")
      setQuery('')
    } else {
      setAlert("please fill the form")
    }
  }

  const onChange = (e) => {
    setQuery(e.target.value)

  }
  const onSubmit = (e) => {
    e.preventDefault()
    getData()
  }

  return (
    <div className="App">
      <h1 onClick={getData}>Food searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />

        <input type="submit" value="search"></input>

      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe =>
          <Recipe
            key={uuidv4()}
            recipe={recipe} />
        )}
      </div>

    </div>
  )
}
export default App