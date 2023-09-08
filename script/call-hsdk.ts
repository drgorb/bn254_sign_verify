import { Client, ContractByteCodeQuery, ContractCallQuery, Hbar, HbarUnit } from '@hashgraph/sdk';
import { accountId, derPrivateKey } from "./account";

async function main() {
  const client = Client.forTestnet();
  client.setOperator(accountId, derPrivateKey);
  client.setMirrorNetwork('testnet.mirrornode.hedera.com:443')

  const contractId = "0.0.1183384";
  const scRead2 = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(1_000_000)
      .setFunction('verifyDefaultMessage')
  let cost = await scRead2.getCost(client);
  cost = new Hbar(cost.to(HbarUnit.Tinybar).multipliedBy(1).dividedToIntegerBy(1), HbarUnit.Tinybar);
  console.log(`- Cost to query the bytecode for the contract: ${cost.to(HbarUnit.Hbar).toString()}`);
  const scRead2Tx = await scRead2.setQueryPayment(cost).execute(client);
  const scRead2ReturnValue = scRead2Tx.getBool();
  console.log(`- The verifyDefaultMessage() returned: ${scRead2ReturnValue}`);
  return scRead2ReturnValue ? "Success" : "Failure";
}

main().then(res => {
  console.log(res);
  process.exit(0)
}).catch(err => {
  console.error(err);
  process.exit(1);
});

