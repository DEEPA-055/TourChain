export const CONTRACT_ADDRESSES = {
    TOUR_TOKEN: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Default Hardhat address 1
    TOUR_PASS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",  // Default Hardhat address 2
    TOUR_MARKETPLACE: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // Default Hardhat address 3
};

export const TOUR_MARKETPLACE_ABI = [
    "function buyPass(uint256 passTypeId) public payable",
    "function verifyVisit(address tourist, string memory location, uint256 rewardAmount) public",
    "function getUserVisits(address user) public view returns (tuple(string location, uint256 timestamp, uint256 reward)[])",
    "function getPassTypeIds() public view returns (uint256[] memory)",
    "function passTypes(uint256) public view returns (uint256 price, string metadataURI, bool exists)",
    "event PassPurchased(address indexed buyer, uint256 tokenId, uint256 passTypeId)",
    "event VisitVerified(address indexed tourist, string location, uint256 reward)"
];

export const TOUR_PASS_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function name() view returns (string)",
    "function symbol() view returns (string)"
];

export const TOUR_TOKEN_ABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
];
