import { useState, useContext, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../AdoptedPetContext";
import fetchSearch from "../Fetches/fetchSearch";

import useBreedList from "../useBreedList";
import Navbar from "./Navbar";
import Paginate from "./Paginate";
import Results from "./Results";
import { Animal } from "../APIResponsesTypes";

const ANIMALS: Animal[] = ["", "bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "" as Animal,
    location: "",
    breed: "",
    page: 0,
  });
  const [animal, setAnimal] = useState("" as Animal);
  // Equivalent to:
  // const animalHook = useState("");
  // const animal = animalHook[0];
  // const setLocation = animalHook[1];

  const [breeds] = useBreedList(animal);
  console.log(breeds);
  const [adoptedPet, _] = useContext(AdoptedPetContext); // eslint-disable-line no-unused-vars

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
      location: formData.get("location")?.toString() ?? "",
      breed: formData.get("breed")?.toString() ?? "",
      page: 0,
    };
    setRequestParams(obj);
  };

  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimal(e.target.value as Animal);
  };

  const handleNav = (newPage: number) => {
    setRequestParams({ ...requestParams, page: newPage });
  };

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const hasNext = results?.data?.hasNext ?? false;
  const pages = results?.data?.numberOfResults
    ? Math.ceil(results.data.numberOfResults / 10)
    : 1;

  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default SearchParams;
