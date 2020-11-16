import React, { useState } from 'react'
import "./App.css"
import Axios from "axios"

const App = () => {

  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([]);


  const APP_ID = "7936d2f6"
  const APP_KEY = "f29c70bfd3ee74dc112aad0df5e8d6d1"
  const url = `https://api.edamam.com/search?$q=${query}&$app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`

  const getData = async () => {
    const result = await Axios.get(url)
    console.log(result)

    setRecipes(result.data.hits);
    setQuery('')
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
        <input type="text" placeholder="search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />

        <input type="submit" value="search"></input>

      </form>

    </div>
  )
}
export default App