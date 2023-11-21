import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "../APIResponsesTypes";

const fetchSearch: QueryFunction<
  PetAPIResponse,
  [
    "search",
    {
      animal: string;
      location: string;
      breed: string;
      page: number;
    }
  ]
> = async ({ queryKey }) => {
  const { animal, location, breed, page } = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
  );

  if (!res.ok) {
    throw new Error(
      `pet search not ${animal} ${location} ${breed} page=${page}`
    );
  }

  return res.json();
};

export default fetchSearch;
