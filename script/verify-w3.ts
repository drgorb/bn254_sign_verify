import { Contract, Web3 } from "web3";
import { abi } from "../out/Verify.sol/Verify.json"

async function main() {
  const web3 = new Web3("https://relay.dev.hashgraph-group.com/");
  // const web3 = new Web3("https://testnet.hashio.io/api");
  console.log(await web3.eth.getBlockNumber());

  var verifier = new Contract(abi, "0x0000000000000000000000000000000000120e98");
  verifier.setProvider(web3.provider)
  const verify = verifier.methods.verifyDefaultMessage()
  console.log(verify.encodeABI())
  const result = await verify.call({gas: "8000000"});
  console.log(result)
  return result ? "Success" : "Failure";
}

main()
    .then(res => {
      console.log(res);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1)
    })
