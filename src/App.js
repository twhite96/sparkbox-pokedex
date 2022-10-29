import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/Pokemon.css'

function Pokemon (props) {
    const [pokemon, setPokemon] = useState([]);
    const [sprites, setSprites] = useState(front_default = '');
    const [sortStatus, setSortStatus] = useState(true);
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

    // Will need to figure out how to sort using the sort method, creating a shallow copy of
    // the array of objects coming from the PokeAPI and returning and rendering a list of pokemon
    const handleSort = () => {
        const newArr = [pokemon];
        if (sortStatus) {
            let isSorted = newArr.sort((a, b) => {return a[1] - b[1]});
            setPokemon(isSorted);
            setSortStatus(!sortStatus)
        } else {
            let isSorted = newArr.sort((a, b) =>{return b[1] - a[1]});;
            setPokemon(isSorted);
            setSortStatus(!sortStatus);
        }
        console.table(handleSort);
    };


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
                                {/* If I can't get these images rendered by tonight, I won't use them */}
                                <img key={p.id} src={sprites} alt="pokemon image"/>


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