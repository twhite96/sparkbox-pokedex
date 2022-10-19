import React from "react";
import '../../styles/Pokemon.css'

export default function Pokemon(props) {
  const showPokemon = (props) => {
    const { pokemon } = props;
    if (pokemon !== null) {
      return pokemon.map((pokemon, i) => {
        console.table(pokemon);
        return (
          <div className="container">
            <div className="card" key={pokemon.id}>
              <h2 className="poke-name">{pokemon.name}</h2>
              <img src={pokemon.image} alt="pokemon card" />
              <p className="poke-effect">{pokemon.effect}</p>
            </div>
          </div>
        );
      });
    } else {
      return <h3>Loading...</h3>;
    }
  };
  return <>{showPokemon(props)}</>;
}
