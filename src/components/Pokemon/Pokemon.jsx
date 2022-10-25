// noinspection JSCheckFunctionSignatures

import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/Pokemon.css'

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [favorited, setFavorite] = useState(true);
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(true);


  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"
  useEffect(() => {
    setLoading(true);
    axios.get(API_URL).then(res => {
      setLoading(false);
      setPokemon(res.data.results);
    });
  }, [API_URL]);

  const sortPokemon = (select) => {
    const options = {
      "a-z": [...pokemon].sort((a, b) => (a < b ? -1 : 1)),
      "z-a": [...pokemon].sort((a, b) => (a < b ? 1 : -1))
    };

    setPokemon(options[select.target.value]);

  };



  const handleChange = (e) => {
    setFavorite(e.target.checked);
  }
  if (loading) return 'Loading...'

  return (
      <div>
        <div>
          <select onChange={sortPokemon}>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
        <div className="pokecard-container">
          <header>
            <h1 className="title">Pokemon App</h1>
          </header>

          <section className="pokecards">
            <h2>Find your favorite Pokemon!</h2>
            <h3>{pokemon.name}</h3>
          </section>

          <section className="pokedex">
            <h2>Gotta check 'em all!</h2>
            <div className="pokelist" key={pokemon.id}>
              {pokedex.map((pokemon) => (
                  <div className="pokecard">
                    <h3>{pokemon.name}</h3>
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon" + pokemon.id + ".png"} alt="pokemon image"/>
                    <label>
                      <input
                          type="checkbox"
                          checked={favorited}
                          onChange={handleChange}
                      />
                      Favorite
                    </label>
                    <p>You {favorited ? 'liked' : 'did not like'} this.</p>
                  </div>
              ))}
            </div>
          </section>

        </div>
      </div>
  );
}



export default Pokemon;
