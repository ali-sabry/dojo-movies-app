import React, { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext({
    Favorites: [],
    TotalFavorites: 0,
    AddFavorites: (FavoriteMovies)=> {},
    RemoveFavorite: (MovieId)=> {},
    ItemIsFavorite: (MovieId)=> {},
});

const FavoritesHandlerProvider = ({ children }) => {
    
    const [FavoritesContent, setFavoritesContent] = useState([]);

    useEffect(()=> {
        const data = localStorage.getItem('Dojo_Movies_Data');
        setFavoritesContent(JSON.parse(data));
    }, []);

    useEffect(()=> {
        localStorage.setItem('Dojo_Movies_Data', JSON.stringify(FavoritesContent));
    }, [FavoritesContent]);

    const AddFavorites = (FavoriteMovies)=> {
        setFavoritesContent((prevFavorites)=> {
            return prevFavorites.concat(FavoriteMovies);
        });
    };

    const RemoveFavorite = (MovieId)=> {
        setFavoritesContent((prevFavorites)=> {
            return prevFavorites.filter((movie) => movie.id !== MovieId);
        });
    };

    const ItemIsFavorite = (MovieId)=> {
        const FavStatus = FavoritesContent.some((movie)=> movie.id === MovieId);
        return FavStatus;
    };
    
    const context = {
        Favorites: FavoritesContent,
        TotalFavorites: FavoritesContent.length > 0 ?FavoritesContent.length :0 , 
        AddFavorites,
        RemoveFavorite,
        ItemIsFavorite,
    };

    return (
        <FavoritesContext.Provider value={context}>
            {children}
        </FavoritesContext.Provider>
    )
};

export {FavoritesHandlerProvider};
export default FavoritesContext;
