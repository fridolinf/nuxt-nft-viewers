import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function useMetamask() {
  let metamaskDefined = false;
  let currentAccount: string | null | undefined = "";
  const ethereum = window.ethereum as MetaMaskInpageProvider;

  if (typeof window.ethereum !== "undefined") {
    metamaskDefined = true;
  } else {
    metamaskDefined = false;
  }

  function handleAccountsChanged(accounts: string) {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
      return "";
    } else if (accounts[0] !== currentAccount) {
      return accounts[0];
    }
  }
  return {
    metamaskDefined,
    currentAccount,
    handleAccountsChanged,
    ethereum,
  };
}
