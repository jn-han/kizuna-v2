// What logic we want to run everytime we send a request to the Lens GraphQL server

import { isTokenExpired, readAccessToken } from "../auth/helpers";
import refreshAccessToken from "../auth/refreshAccessToken";

const endpoint = "https://api.lens.dev/"

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers']
): (() => Promise<TData>) => {


  async function getAccessToken() {
    // 1. Check the local storage for the access token
    const token = readAccessToken();

    // 2. If there isn't a token, then return null (not signed in)
    if (!token) return null;

    let accessToken = token.accessToken;

    // 3. If there is a token, then check it's expiration
    if (isTokenExpired(token.exp)) {
      // 4. If it's expired, update it using the refresh token
      const newToken = await refreshAccessToken();
      if (!newToken) return null;
      accessToken = newToken;
    }

    // Finally, return the token
    return accessToken;
  }

  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
        "x-access-token" : token ? token : "",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
 
    const json = await res.json()
 
    if (json.errors) {
      const { message } = json.errors[0] || {}
      throw new Error(message || 'Error…')
    }
 
    return json.data
  }
}