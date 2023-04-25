const API_BASE_URL = "https://deep-index.moralis.io/api/v2/";

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
