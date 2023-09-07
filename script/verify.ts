//call verify contract with ethers
import { ethers, getBigInt } from "ethers";
import { abi } from "../out/Verify.sol/Verify.json"
import { hexPrivateKey } from "./account";

const verifyMessage = async () => {
  const provider = new ethers.WebSocketProvider("wss://relay-ws.dev.hashgraph-group.com", {
    name: "hedera",
    chainId: 296
  });
  const wallet = new ethers.Wallet(hexPrivateKey, provider);
  const contract = new ethers.Contract("0x0000000000000000000000000000000000120e98", abi, wallet);
  const message = "0x321580d53f250a51ed527f5f7856bdd2ecbbf19f722ee6acc1804f63462375f3";
  const domain = "0x0000000000000000000000000000000000000000000000000000000000000020";
  const publicKey = new Array(4);
  const signature = new Array(2);

  publicKey[0] = getBigInt("1877680754511875309899085821046020641041516699522550968201931210511122361188");
  publicKey[1] = getBigInt("1879687745237862349771417085220368195630510774060410176566704734657946401647");
  publicKey[2] = getBigInt("10177664824327229270631241062558466194853353905576267792570130720130119743401");
  publicKey[3] = getBigInt("2617838070911723228053200997531205923494421078683439118196637157934995837361");
  signature[0] = getBigInt("3789870118542016974105699138161781008918636358438246688710078193373583696417");
  signature[1] = getBigInt("20766815278548398344257910495536643911108480586016736348038320126600861929561");
  const m = ethers.parseUnits("1", "wei");
  return contract.verify(domain, publicKey, signature, message);
}

verifyMessage()
    .then(res => {
      console.log(res);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1)
    })
