import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/Pokemon.css'

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [favorited, setFavorite] = useState(true);
  const [image, setImage] = useState("");
  const [pokeName, setPokeName] = useState("");

  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = (id) => {
    axios
        .get(`${API_URL}/${id}`)
        .then((response) => {
      console.log(response.data)
      setPokemon(response.data)
    })
  }
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

  return (
      <div>
        <select name="sort A-Z" id="sort">
        </select>
        <h1>Pokedex</h1>
        <div className="pokecard-container">
          {pokemonCards.map((pokemon) => (
              <div className="pokecard" key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.sprites.front_default}/>
                <p>pokemon.abilities.ability.name</p>
                <input type="checkbox" aria-label={}/>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Pokemon;
