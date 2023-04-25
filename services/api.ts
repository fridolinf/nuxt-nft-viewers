import { API_BASE_URL, Header } from "./header";
import { MoralisResponseData } from "~/interfaces/IMoralis";

class MoralisServices {
  constructor() {}
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
