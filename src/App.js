import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import classes from "./styles/PagesStyles.module.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import PopularMovies from "./pages/PopularMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import TopratedMovies from "./pages/TopratedMovies";
import TrendingMovies from "./pages/TrendingMovies";
import FavoritesMovies from "./pages/FavoritesMovies";
// import NotFound from "./pages/404.jsx";

import Details from "./components/global/TargetMovieDetails";
import SearchMovies from "./components/global/SearchMovies";
import Context from "./store/Store";

const App = () => {
  const favoritesCtx = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("Dojo_Movies_Data") !== null) {
      const data = localStorage.getItem("Dojo_Movies_Data");
      favoritesCtx.SetAllFavorites(JSON.parse(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </section>
      <Footer />
    </>
  );
};

export default App;
