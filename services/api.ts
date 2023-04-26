import { API_BASE_URL, Header } from "./header";
import { MoralisResponseData } from "../interfaces/IMoralis";
import httpServices from "../utils/httpServices";

class MoralisServices {
  constructor() {}
  /**
   * This is an asynchronous function that retrieves NFT data for a specific wallet address and chain
   * from an API endpoint.
   * @param {any} chainData - The `chainData` parameter is a variable that contains information about
   * the blockchain network that the user is interacting with. It is used to construct the API endpoint
   * URL for fetching NFT data.
   * @param {string} walletAddress - The wallet address is a unique identifier for a cryptocurrency
   * wallet. It is a string of alphanumeric characters that represents the location where a user stores
   * their cryptocurrency assets. In this code, the wallet address is used to retrieve NFT
   * (non-fungible token) data from an API.
   * @returns a Promise that resolves to a MoralisResponseData object, which is obtained by making an
   * HTTP GET request to a specific API endpoint with the provided chainData and walletAddress
   * parameters. If the request is successful (status code 200), the function returns the response data
   * as a MoralisResponseData object. If there is an error, the function throws the error.
   */
  async getNft(chainData: any, walletAddress: string) {
    try {
      const request = await httpServices.get(
        `${API_BASE_URL}${walletAddress}/nft?chain=${chainData}&normalizeMetadata=true&mediaItems=true`,
        Header()
      );
      if (request.status === 200) {
        const { data } = request;
        return data as MoralisResponseData;
      }
    } catch (error: any) {
      throw error;
    }
  }
}

const moralisServices = new MoralisServices();

export default moralisServices;
