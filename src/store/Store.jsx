import React, { createContext, useState } from "react";

const FavoritesContext = createContext({
  Favorites: [],
  TotalFavorites: 0,
  AddFavorites: (FavoriteMovies) => {},
  RemoveFavorite: (MovieId) => {},
  ItemIsFavorite: (MovieId) => {},
  SetAllFavorites: (value)=> {},
});

const FavoritesHandlerProvider = ({ children }) => {
  const [AllFavoritesContent, setAllFavoritesContent] = useState([]);

  const AddFavorites = (FavoriteMovies) => {
    setAllFavoritesContent((prevFavorites) => {
      return prevFavorites.concat(FavoriteMovies);
    });
  };

  const RemoveFavorite = (MovieId) => {
    setAllFavoritesContent((prevFavorites) => {
      return prevFavorites.filter((movie) => movie.id !== MovieId);
    });
  };

  const ItemIsFavorite = (MovieId) => {
    const FavStatus = AllFavoritesContent.some((movie) => movie.id === MovieId);
    return FavStatus;
  };

  const SetAllFavoritesHandler = (value)=> setAllFavoritesContent(value);

  const context = {
    Favorites: AllFavoritesContent,
    TotalFavorites: AllFavoritesContent.length, 
    SetAllFavorites: SetAllFavoritesHandler,
    AddFavorites,
    RemoveFavorite,
    ItemIsFavorite,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesHandlerProvider };
export default FavoritesContext;
