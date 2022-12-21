import {createContext} from "react";
import {v5} from "uuid";

// create context for id from localStorage if it doesn't exist generate new id and save it to localStorage using uuid package
export const IdContext = createContext(localStorage.getItem("id") || localStorage.setItem("id", v5()));
