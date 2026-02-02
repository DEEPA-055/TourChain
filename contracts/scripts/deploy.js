import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy TourToken
    const TourToken = await hre.ethers.getContractFactory("TourToken");
    const token = await TourToken.deploy();
    await token.waitForDeployment();
    console.log("TourToken deployed to:", await token.getAddress());

    // 2. Deploy TourPass
    const TourPass = await hre.ethers.getContractFactory("TourPass");
    const pass = await TourPass.deploy();
    await pass.waitForDeployment();
    console.log("TourPass deployed to:", await pass.getAddress());

    // 3. Deploy TourMarketplace
    const TourMarketplace = await hre.ethers.getContractFactory("TourMarketplace");
    const marketplace = await TourMarketplace.deploy(
        await token.getAddress(),
        await pass.getAddress()
    );
    await marketplace.waitForDeployment();
    console.log("TourMarketplace deployed to:", await marketplace.getAddress());

    // 4. Setup Roles: Authorize Marketplace to mint
    await token.setMinter(await marketplace.getAddress(), true);
    await pass.setMinter(await marketplace.getAddress(), true);
    console.log("Marketplace authorized as minter for Token and Pass.");

    // 5. Initialize Pass Types
    console.log("Initializing pass types...");
    const standardPrice = hre.ethers.parseEther("0.05");
    const premiumPrice = hre.ethers.parseEther("0.1");

    await marketplace.addPassType(0, standardPrice, "ipfs://standard-pass-metadata");
    await marketplace.addPassType(1, premiumPrice, "ipfs://premium-pass-metadata");
    console.log("Pass types initialized: Standard (0) and Premium (1)");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
