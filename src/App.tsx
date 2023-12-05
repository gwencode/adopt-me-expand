import { useState, lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
// import Details from "./Components/Details";
// import SearchParams from "./Components/SearchParams";
import { Pet } from "./APIResponsesTypes";

const Details = lazy(() => import("./Components/Details"));
const SearchParams = lazy(() => import("./Components/SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as Pet | null);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="loading-pane">
            <h2 className="loader">🐶</h2>
          </div>
        }
      >
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
