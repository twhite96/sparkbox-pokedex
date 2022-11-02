import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Pokemon.css";


export default function Pokemon({ name, setFavorite }) {
  const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [image, setImage] = useState("");
  useEffect(() => {
    axios.get(POKEMON_URL).then((res) => {
      console.log(res.data);
      setImage(res.data.sprites.front_default);
    });
  }, [POKEMON_URL]);
  return (
    <div className="pokecard">
      <h3>{name}</h3>

      {/* Discovered that I wasn't using the correct way to access the sprites property from the API
       which caused me confusion on how to grab each image */}
      <img src={image} alt={name} />
      {/* changed each checkbox to a radio button; favorite indicates just one thing, instead of multiple
       which is exactly why you'd use a radio button*/}
      <input className="form-control" name="pokemon" type="radio" onChange={() => setFavorite(name)} />
      <label htmlFor="favorite">Favorite</label>
    </div>
  );
}