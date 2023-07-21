import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  getUniqueCharactes,
  createCharacterStore,
  getEpisodesWithCharcters,
} from "./utils";

function App() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const {
          data: { results: episodes },
        } = await axios.get("https://rickandmortyapi.com/api/episode");
        const uniqueCharacters = getUniqueCharactes(episodes);
        const characterRequests = uniqueCharacters.map((url) => axios.get(url));
        const allCharacters = await Promise.all(characterRequests);
        const characterStore = createCharacterStore(allCharacters);
        const episodesWithCharacters = getEpisodesWithCharcters(
          episodes,
          characterStore
        );
        return episodesWithCharacters;
      } catch (error) {
        console.log(error);
      }
    };
    getEpisodes().then((episodes) => setEpisodes(episodes));
  }, []);

  return (
    <div>
      {episodes.map((episode) => {
        return (
          <div key={episode.id}>
            <h1>
              {episode.name} - {episode.episode}
            </h1>
            ,<h2>Fecha al aire: {episode.air_date} </h2>,<h2>Personajes:</h2>,
            <ul>
              {episode.characters.map((character) => {
                return (
                  <li key={character.id}>
                    {" "}
                    {character.name} - {character.species}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
