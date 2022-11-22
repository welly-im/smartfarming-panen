import { atom } from "jotai";

export const apiPost1 = atom("http://192.168.0.105/server-ta/");
export const apiGet1 = atom("http://192.168.0.105/server-ta/?smartfarming=");

export const apiPost = atom("https://sismartfarming.000webhostapp.com/");
export const apiGet = atom(
  "https://sismartfarming.000webhostapp.com/?smartfarming="
);
