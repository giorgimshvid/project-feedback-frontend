import { ENV } from "../environments/environments";

const APP_URL = ENV.API_URL;

export async function request<T>(endpoint : string, options : RequestInit = {}) : Promise<T> {
  const headers = new Headers(options.headers);
  // This will make sure that the data we send is a JSON.
  if (headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  let data = undefined;
  try {
    // credentials: "include" is to include the Cookies.
    const response = await fetch(`${APP_URL}/${endpoint}`, {...options, headers, credentials: "include"});
    if (!response.ok) throw new Error("Error with fetching data.");

    data = await response.json();
  } catch(e) {
    console.error(e);
    return data;
  }

  return data;
}
