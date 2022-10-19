import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

export default function Deck() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [effect, setEffect] = useState("");
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const url = "https://pokeapi.co/api/v2/pokemon";
  const sortedData = useMemo(() => {
    let result = data;

    if (sortType === "descending") {
      result = [...data].sort((a, b) => {
        return b.name(a.name)
      });
    } else if (sortType === "ascending") {
      result = [...data].sort((a, b) => {
        return a.name(b.name)
      });
    }
    return result;
  }, [data, sortType]);
  useEffect(() => {
    async function getData() {
        await axios.get(`${url}/${name}`).then((response) => {
          setData(response.data).catch(error => {
            setError(error);
          });
          if (error) return `Error: ${error}`;
          setImage(response.data.sprites.front_default);
          setName(response.data.name);
          setEffect(response.data.effect);
        });
      return <Pokemon name={name} image={image} effect={effect} />;
    }
    getData();
  }, [name, image, effect]);
}
