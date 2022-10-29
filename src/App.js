import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Pokemon.css'

function Pokemon (props) {
    const [pokemon, setPokemon] = useState([]);
    const [sprites, setSprites] = useState('');
    const [favorite, setFavorite] = useState( new Array(pokemon.length).fill(false));
    const [isLoading, setIsLoading] = useState(false);


    const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"
    useEffect(() => {
        setIsLoading(true);
        axios.get(API_URL).then(res => {
            setIsLoading(true);
            setPokemon(res.data.results);
            setSprites(res.data.front_default)
        });
    }, [API_URL]);

    const sortPokemon = (select) => {
        const options = {
            "a-z": [pokemon].sort((a, b) => (a < b ? -1 : 1)),
            "z-a": [pokemon].sort((a, b) => (a < b ? 1 : -1))
        };
        setPokemon(options[select.target.value]);
    };



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
                    <div className="pokelist" >
                        {pokemon.map((p) => (
                            <div className="pokecard" key={pokemon.id}>
                                <h3>{p.name}</h3>

                                <img src={sprites} alt="pokemon image"/>


                                <input
                                    type="checkbox"
                                    onChange={() => setFavorite(!favorite)}
                                />
                                <label htmlFor="favorite">Favorite</label>

                                <p>You {favorite ? 'liked' : 'did not like'} this.</p>
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