const API_BASE_URL = "https://deep-index.moralis.io/api/v2/";
/**
 * This function returns headers with an API key for making requests to a server.
 * @returns The code snippet is defining a function component named `Header` that returns an object
 * with a `headers` property. The `headers` property is an object with two key-value pairs: `Accept`
 * with a value of `"application/json"` and `"X-API-Key"` with a value of `config.public.moralis`. The
 * value of `config.public.moralis` is obtained by calling the
 */
export const Header = () => {
  const config = useRuntimeConfig();
  return {
    headers: {
      Accept: "application/json",
      "X-API-Key": config.public.moralis,
    },
  };
};

export { API_BASE_URL };
