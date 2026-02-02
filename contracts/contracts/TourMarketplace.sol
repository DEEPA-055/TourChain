// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TourToken.sol";
import "./TourPass.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TourMarketplace is Ownable {
    TourToken public tourToken;
    TourPass public tourPass;

    struct PassType {
        uint256 price;
        string metadataURI;
        bool exists;
    }

    struct Visit {
        string location;
        uint256 timestamp;
        uint256 reward;
    }

    mapping(uint256 => PassType) public passTypes;
    uint256[] public passTypeIds;
    mapping(address => Visit[]) public userVisits;

    event PassPurchased(address indexed buyer, uint256 tokenId, uint256 passTypeId);
    event VisitVerified(address indexed tourist, string location, uint256 reward);
    event PassTypeAdded(uint256 indexed id, uint256 price, string metadataURI);

    constructor(address _tokenAddress, address _passAddress) Ownable(msg.sender) {
        tourToken = TourToken(_tokenAddress);
        tourPass = TourPass(_passAddress);
    }

    // Admin adds a pass type
    function addPassType(uint256 id, uint256 price, string memory metadataURI) public onlyOwner {
        if (!passTypes[id].exists) {
            passTypeIds.push(id);
        }
        passTypes[id] = PassType(price, metadataURI, true);
        emit PassTypeAdded(id, price, metadataURI);
    }

    // User buys a pass with ETH
    function buyPass(uint256 passTypeId) public payable {
        PassType memory pass = passTypes[passTypeId];
        require(pass.exists, "Pass type does not exist");
        require(msg.value >= pass.price, "Insufficient funds");
        
        // Mint the pass
        uint256 tokenId = tourPass.safeMint(msg.sender, pass.metadataURI);
        
        emit PassPurchased(msg.sender, tokenId, passTypeId);
    }

    // Admin verifies a visit and rewards user
    function verifyVisit(address tourist, string memory location, uint256 rewardAmount) public onlyOwner {
        tourToken.mint(tourist, rewardAmount);
        
        userVisits[tourist].push(Visit({
            location: location,
            timestamp: block.timestamp,
            reward: rewardAmount
        }));

        emit VisitVerified(tourist, location, rewardAmount);
    }
    
    // Data Retrieval Functions
    function getUserVisits(address user) public view returns (Visit[] memory) {
        return userVisits[user];
    }

    function getPassTypeIds() public view returns (uint256[] memory) {
        return passTypeIds;
    }

    // Allow owner to update pass type price
    function updatePassPrice(uint256 id, uint256 _newPrice) public onlyOwner {
        require(passTypes[id].exists, "Pass type does not exist");
        passTypes[id].price = _newPrice;
    }

    // Allow withdrawing funds
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
