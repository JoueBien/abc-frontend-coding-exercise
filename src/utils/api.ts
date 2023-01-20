// Libs
// Comps
import {Json} from "../types/entities"

// Types
type FetchMethod = "POST" | "GET";

type CustomResponse<R> = Response & { data?: R };

// Custom Error class with data support
class FetchError<T> extends Error {
  data: T;

  constructor(m: string, data: any) {
    super(m);
    this.data = data;
  }
}

class API_BASE {
  // Generic fetch for all method
  // Return type can be set for convenience
  async _fetch<R>(
    method: FetchMethod,
    url: string,
    data?: JSON
  ): Promise<CustomResponse<R> | FetchError<R | undefined>> {
    // Set up options, data and headers
    const response = await fetch(url, {
      method: method,
      body: data && method !== "GET" ? JSON.stringify(data) : undefined,
    });
    // Process the JSON response
    try {
      const stringJson = (await response.json()) as Json;

      const res: CustomResponse<R> = {
        ...response,
        data: stringJson as R,
      };

      // If we got any non 200 code we still should have data
      if (response.ok === true) {
        return res;
      } else {
        throw new FetchError<R>("Api not ok", data);
      }
    } catch (e) {
      throw new FetchError<undefined>("Response Not Json", undefined);
    }
  }

  // Get method
  async get<R>(url: string) {
    return await this._fetch<R>("GET", url);
  }

  // Encode values into get params
  // You will need to add ? to the front of the string
  jsonToParams(data: Json): string {
    const keys = Object.keys(data);
    const getParams: string = keys.reduce((all, key) => {
      const ret = `${all}&${key}=${encodeURIComponent(data[key]?.trim())}`;
      return ret;
    }, "");
    // Remove the first & we added in the reduce
    return getParams.substring(1);
  }
}

export const API = new API_BASE();
