import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChakraProvider, ButtonGroup, Button, Box } from '@chakra-ui/react';
import Pokemon from "../src/components/Pokemon/Pokemon.jsx"
import "./styles/Pokemon.css";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [favorite, setFavorite] = useState("");
  const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=20";

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setPokemons(res.data.results);
    });
  }, [API_URL]);

  const sorted = (direction) => {
    // Using the .sort() array method mutates the array directly.
    // mutating state and props directly in React is strongly discouraged
    // creating a shallow copy of the pokemons array by destructuring the original array
    // means we can call the sort function on the shallow copy
    const newArray = [...pokemons];
    const sortedPokemons = newArray.sort((a, b) => {
      if (direction === "ASC") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setPokemons(sortedPokemons);
  };

  return (
    <div>
      <div className="pokecard-container">
        <header>
          <h1 className="title">Pokemon App</h1>
        </header>

        <section className="pokecards">
          <h2>Find your favorite Pokemon!</h2>
          <p>{favorite && `Current favorite: ${favorite}`}</p>
        </section>
        <div>
          {/* Needed a quick way to get the sort direction working, so I chose
           two buttons for each direction instead of one */}
          <div className="sort-me">
            <ButtonGroup
              gap='4'
              border='3px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              mb={10}
            >
              <Button onClick={() => sorted("ASC")} colorScheme='linkedin'>ASC</Button>
              <Button onClick={() => sorted("DESC")} colorScheme='pink'>DESC</Button>
            </ButtonGroup>
          </div>
        </div>
        <section className="pokedex">
          <h2>Gotta check 'em all!</h2>
          <div className="pokelist">
            {pokemons.map((p) => (
              <Box boxShadow='xl' p='2' rounded='md' bg='white' key={p.key}>
                <Pokemon key={p.key} name={p.name} setFavorite={setFavorite} />
              </Box>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChakraProvider>
      <PokemonList />
    </ChakraProvider>
  )
}
