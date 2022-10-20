import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/Pokemon.css'

const Pokemon = () => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [sorted, setSorted] = useState(false);
  const API_URL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    if(pokemonCards.length === 0) {
      axios.get(`${API_URL}`).then((response) => {
        console.table(response);
        setPokemonCards(response.data);
      }).catch((error) => {
        console.warn(`Error: ${error}`);
      });
    }
  }, []);

  const sortPokemon = () => {
    const pokeArray = !sorted;
    setSorted(pokeArray);
    setPokemonCards((data) => {
      data.sort((a, b) => {
        return pokeArray
        ? a.name - b.name : b.name - a.name;
      })
    })
  }

  return (
      <div>
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
