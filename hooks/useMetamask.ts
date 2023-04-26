import { MetaMaskInpageProvider } from "@metamask/providers";
/* This code is declaring a global interface for the `Window` object in TypeScript. It is adding a new
property `ethereum` to the `Window` object with a type of `any`. This allows the code to access the
`ethereum` object on the `window` object without TypeScript throwing an error. */
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function useMetamask() {
  let metamaskDefined = false;
  let currentAccount: string | null | undefined = "";
  const ethereum = window.ethereum as MetaMaskInpageProvider;

  /* This code is checking if the `window.ethereum` object is defined or not. If it is defined, it sets
  the `metamaskDefined` variable to `true`, indicating that MetaMask is installed and available. If
  it is not defined, it sets the `metamaskDefined` variable to `false`, indicating that MetaMask is
  not installed or not available. */
  if (typeof window.ethereum !== "undefined") {
    metamaskDefined = true;
  } else {
    metamaskDefined = false;
  }

  /**
   * The function checks if there are connected accounts and returns the first account if it is
   * different from the current account.
   * @param {string} accounts - The `accounts` parameter is a string array that contains the Ethereum
   * addresses of the user's MetaMask accounts.
   * @returns If `accounts` is an empty string, the function will log a message and return an empty
   * string. If `accounts` is not empty and the first account in the array is different from the
   * `currentAccount` variable, then the function will return the first account in the array. If
   * neither of these conditions are met, the function will not return anything.
   */
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
