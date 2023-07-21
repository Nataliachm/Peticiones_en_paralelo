export const getUniqueCharactes = (episodes) => {
  const characters = episodes.reduce((acum, episode) => {
    return acum.concat(episode.characters.slice(0, 10));
  }, []);
  const uniqueCharacters = [...new Set(characters)];

  return uniqueCharacters;
};

export const createCharacterStore = (allCharacters) =>
  allCharacters.reduce((acum, { data: character }) => {
    return {
      ...acum,
      [character.url]: {
        name: character.name,
        species: character.species,
        id: character.id,
      },
    };
  }, {});

export const getEpisodesWithCharcters = (episodes, characterStore) =>
  episodes.map((episode) => {
    return {
      name: episode.name,
      episode: episode.episode,
      air_date: episode.air_date,
      characters: episode.characters.slice(0, 10).map((url) => {
        return characterStore[url];
      }),
    };
  });
