import React, { useContext, useEffect} from "react";
import { Routes, Route } from "react-router-dom";

import classes from "./components/pages/styles/Style.module.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import PopularMovies from "./components/pages/PopularMovies";
import UpcomingMovies from "./components/pages/UpcomingMovies";
import TopratedMovies from "./components/pages/TopratedMovies";
import TrendingMovies from "./components/pages/TrendingMovies";
import FavoritesMovies from "./components/pages/FavoritesMovies";
import NotFound from "./components/pages/404.jsx";

import Details from "./components/global/TargetMovieDetails";
import SearchMovies from "./components/global/SearchMovies";
import Context from "./components/global/Store";

const App = () => {
  const favoritesCtx = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("Dojo_Movies_Data") !== null) {
      const data = localStorage.getItem("Dojo_Movies_Data");
      favoritesCtx.SetAllFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "Dojo_Movies_Data",
      JSON.stringify(favoritesCtx.Favorites)
    );
  }, [favoritesCtx.Favorites]);

  return (
    <>
      <section className={classes.container}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/index.html" element={<Home />}></Route>
          <Route path="/Popular" element={<PopularMovies />}></Route>
          <Route path="/Upcoming" element={<UpcomingMovies />}></Route>
          <Route path="/Toprated" element={<TopratedMovies />}></Route>
          <Route path="/Trending" element={<TrendingMovies />}></Route>
          <Route path="/Favorites" element={<FavoritesMovies />}></Route>
          <Route path="/Searched/:name" element={<SearchMovies />}></Route>
          <Route path="/Details/:id" element={<Details />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
};

export default App;
