import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Pokemon.css'

function Pokemon (props) {
  const [pokemon, setPokemon] = useState([]);
  const [favorite, setFavorite] = useState( new Array(pokemon.length).fill(false));

  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"
  const SPRITES_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"


  useEffect(() => {
    axios.get(API_URL).then(res => {
      setPokemon(res.data.results);
    });
  }, [API_URL]);


  // Using `Array.from()` to create a shallow copy of the pokemon array
  // to not mutate the original array
  // we never want to mutate state directly
  const handleSort = () => {
    const sorted = [...pokemon].sort((a, b) => a - b)
    const sortAcs = sorted.name.toLocaleLowerCase();
    const sortDesc = sorted.name.toLowerCase();
    if (sortAcs < sortDesc) {
      return -1;
    }
    if (sortAcs > sortDesc) {
      return 1;
    }
    return 0;
  }

  return (
    <div>

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
          <div className="pokelist" >
            <div>
              <select defaultValue="default" onChange={handleSort}>
                <option>A - Z</option>
                <option>Z - A</option>

              </select>
            </div>
            {pokemon.map((p) => (
              <div className="pokecard" key={pokemon.id}>
                <h3>{p.name}</h3>
                <div>


                </div>
                {/* If I can't get these images rendered by tonight, I won't use them */}


                <input
                  type="checkbox"
                  onChange={() => setFavorite(!favorite)}
                />
                <label htmlFor="favorite">Favorite</label>

                {/*<p>You {favorite ? 'liked' : 'did not like'} this.</p>*/}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}


export default function App() {
  return (
    <Pokemon />
  )
}