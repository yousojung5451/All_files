import Home from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import StoryDetailPage from "./pages/StoryDetailPage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";
import { useEffect, useState } from "react";

const routes = {
  "/": Home,
  "/collection": CollectionPage,
  "/stories": StoriesPage,
  "/about": AboutPage,
};

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", "") || "/");

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace("#", "") || "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const Page = routes[route] || Home;

  if (route.startsWith("/collection/")) {
    return <ProductDetailPage slug={route.replace("/collection/", "")} />;
  }

  if (route.startsWith("/stories/")) {
    return <StoryDetailPage slug={route.replace("/stories/", "")} />;
  }

  return <Page />;
}
