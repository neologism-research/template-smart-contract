import { ContractTransactionResponse } from "ethers";

async function sendTxn(txnPromise: Promise<ContractTransactionResponse>, label: string, verbose: boolean = false) {
  const txnResponse = await txnPromise;
  if (verbose) console.info(`Sending ${label}...`);
  const txnReceipt = await txnResponse.wait();
  if (verbose) console.info(`\t-> Sent at ${txnResponse.hash}`);
  return [txnReceipt, txnResponse];
}

export { sendTxn };
