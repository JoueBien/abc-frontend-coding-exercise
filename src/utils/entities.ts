// Libs
// Comps
import { Json } from "../types/entities";

export function entitiesMatch(a: Json, b: Json) {
  return JSON.stringify(a) === JSON.stringify(b) ? true : false;
}
