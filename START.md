# 🚀 TourChain Quick Start

Follow these 3 steps to launch your decentralized tourist ecosystem:

### 1. Start Local Blockchain
Open a terminal in the `contracts` folder and run:
```bash
npx hardhat node
```

### 2. Deploy Contracts
Open a **new** terminal in the `contracts` folder and run:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
*Wait for the output and copy the deployed addresses!*

### 3. Launch Frontend
1. Update `frontend/src/constants.js` with the addresses from step 2.
2. Open a terminal in the `frontend` folder and run:
```bash
npm run dev
```

---

### Features Ready to Use:
- **Wallet Connection**: Connect via MetaMask.
- **Pass Minting**: Buy a Standard Pass for 0.05 ETH on the localhost network.
- **Dashboard**: View your (simulated) TOUR token balance and visit history.
- **Premium UI**: Experience the glassmorphic dark theme.
