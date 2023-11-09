import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../AdoptedPetContext";
import fetchSearch from "../Fetches/fetchSearch";

// import { Animal } from "./types";
import useBreedList from "../useBreedList";
import Paginate from "./Paginate";
import Results from "./Results";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
    page: 0,
  });
  const [animal, setAnimal] = useState("");
  // Equivalent to:
  // const animalHook = useState("");
  // const animal = animalHook[0];
  // const setLocation = animalHook[1];

  const [breeds] = useBreedList(animal);
  const [adoptedPet, _] = useContext(AdoptedPetContext); // eslint-disable-line no-unused-vars

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      location: formData.get("location") ?? "",
      breed: formData.get("breed") ?? "",
      page: 0,
    };
    setRequestParams(obj);
  };

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
  };

  const handleNav = (newPage) => {
    setRequestParams({ ...requestParams, page: newPage });
  };

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const hasNext = results?.data?.hasNext ?? false;
  const pages = Math.ceil(results?.data?.numberOfResults / 10) ?? 1;

  return (
    <div className="search-params">
      <form onSubmit={handleFormSubmit}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            placeholder="Animal"
            onChange={handleAnimalChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            name="breed"
            placeholder="Breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
      <Paginate
        page={requestParams.page}
        next={hasNext}
        pages={pages}
        handleNav={handleNav}
      />
    </div>
  );
};

export default SearchParams;
