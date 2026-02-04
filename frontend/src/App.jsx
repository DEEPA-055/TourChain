import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import {
  CONTRACT_ADDRESSES,
  TOUR_MARKETPLACE_ABI,
  TOUR_PASS_ABI,
  TOUR_TOKEN_ABI
} from "./constants";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [passBalance, setPassBalance] = useState(0);

  // Connect MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }
    const _provider = new ethers.BrowserProvider(window.ethereum);
    const _signer = await _provider.getSigner();
    const address = await _signer.getAddress();

    setProvider(_provider);
    setSigner(_signer);
    setAccount(address);
  };

  // Load balances
  const loadBalances = async () => {
    if (!signer || !account) return;

    const token = new ethers.Contract(
      CONTRACT_ADDRESSES.TOUR_TOKEN,
      TOUR_TOKEN_ABI,
      signer
    );

    const pass = new ethers.Contract(
      CONTRACT_ADDRESSES.TOUR_PASS,
      TOUR_PASS_ABI,
      signer
    );

    const tokenBal = await token.balanceOf(account);
    const passBal = await pass.balanceOf(account);

    setTokenBalance(ethers.formatEther(tokenBal));
    setPassBalance(passBal.toString());
  };

  // Buy Standard Pass (passTypeId = 0)
  const buyPass = async () => {
    if (!signer) return;

    const marketplace = new ethers.Contract(
      CONTRACT_ADDRESSES.TOUR_MARKETPLACE,
      TOUR_MARKETPLACE_ABI,
      signer
    );

    const tx = await marketplace.buyPass(0, {
      value: ethers.parseEther("0.05")
    });

    await tx.wait();
    loadBalances();
  };

  useEffect(() => {
    loadBalances();
  }, [account]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        TourChain MVP
      </motion.h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-purple-600 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="mb-2">Wallet: {account}</p>
          <p className="mb-2">Tour Tokens: {tokenBalance}</p>
          <p className="mb-4">Pass NFTs Owned: {passBalance}</p>

          <button
            onClick={buyPass}
            className="px-6 py-3 bg-green-600 rounded"
          >
            Buy Standard Pass
          </button>
        </>
      )}
    </div>
  );
}

export default App;
