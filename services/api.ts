import { API_BASE_URL, Header } from "./header";

class MoralisServices {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async getNft(chainData: any, walletAddress: string) {
    try {
      const request = await httpServices.get<any>(
        `${API_BASE_URL}${walletAddress}/nft?chain=${chainData}`,
        Header()
      );
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}

const moralisServices = new MoralisServices();

export default moralisServices;
