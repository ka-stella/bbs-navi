import { Href } from "expo-router";

export interface Board {
  id: string;
  name: string;
  url: string;
  path: Href;
}
