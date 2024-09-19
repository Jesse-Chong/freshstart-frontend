import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "./features/home/HomePage";
import LandingPage from "./features/landingpage/LandingPage";
import JobsPage from "./features/jobs/JobsPage";
import LoginPage from "./features/auth/LoginPage";
import SignUpPage from "./features/auth/SignUp";
import ProtectedRoute from "./features/favorite/ProtectedRoute";
import FavNavBar from "./features/favorite/FavNavBar";
import Geolocation from "./features/landingpage/Geolocation";
import Favorite from "./features/favorite/Favorite";
import MyDocs from "./features/favorite/MyDocs";
import { MapProvider } from "./features/context/MapContext";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  // Load coordinates from local storage on initial render
  useEffect(() => {
    const storedCoordinates = JSON.parse(localStorage.getItem("coordinates"));
    if (storedCoordinates) {
      setCoordinates(storedCoordinates);
    }
  }, []);

  // Update coordinates in local storage whenever it changes
  useEffect(() => {
    if (coordinates) {
      localStorage.setItem("coordinates", JSON.stringify(coordinates));
    }
  }, [coordinates]);

  return (
    <MapProvider>
    <Router>
      <FavNavBar user={user} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route
          path="/geolocation"
          element={
            <Geolocation
              setCoordinates={setCoordinates}
              coordinates={coordinates}
            />
          }
        />
        <Route
          path="/"
          element={
            <LandingPage
              setLanguageSelected={setLanguageSelected}
              setCoordinates={setCoordinates}
            />
          }
        />
        <Route
          path="/resources"
          element={<HomePage coordinates={coordinates} />}
        />
        <Route path="/jobs" element={<JobsPage coordinates={coordinates} />} />
        <Route
          path="/login"
          element={<LoginPage setUser={setUser} setToken={setToken} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage setUser={setUser} setToken={setToken} />}
        />
        <Route
          path="/favorite"
          element={
            <ProtectedRoute
              element={Favorite}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
        <Route
          path="/favorite/mydocs"
          element={
            <ProtectedRoute
              element={MyDocs}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
      </Routes>
    </Router>
    </MapProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  );
}