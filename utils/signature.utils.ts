import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers } from "ethers";

function hashPayload({ types, values }: { types: Array<any>; values: Array<any> }) {
  const packedValue = ethers.solidityPacked(types, values);
  const hashedValue = ethers.solidityPackedKeccak256(["bytes"], [packedValue]);
  return hashedValue;
}

function hashSignature(payloadHash: string, signer: string, nonce: bigint) {
  const packedValue = ethers.solidityPacked(["bytes", "address", "uint256"], [payloadHash, signer, nonce]);
  const hashedValue = ethers.solidityPackedKeccak256(["bytes"], [packedValue]);
  return hashedValue;
}

async function signSignature(signer: HardhatEthersSigner, hashedSignature: string) {
  const signature = await signer.signMessage(ethers.getBytes(hashedSignature));
  return signature;
}

function generateMerkleTree(hashes: Array<string>): Array<Array<string>> {
  // zero hashes
  if (hashes.length === 0) {
    return [[]];
  }

  // only one hash, return self
  if (hashes.length === 1) {
    return [[hashes[0]]];
  }

  // making sure hashes is even
  if (hashes.length % 2 !== 0) {
    hashes.push(ethers.ZeroHash);
  }

  // begin walking up the merkle tree
  const tree = [[...hashes]];

  while (tree[tree.length - 1].length > 1) {
    const level = [];

    for (let i = 0; i < tree[tree.length - 1].length; i += 2) {
      // sort the two hashes
      const hash1 = tree[tree.length - 1][i] ?? ethers.ZeroHash;
      const hash2 = tree[tree.length - 1][i + 1] ?? ethers.ZeroHash;
      const sortedHashes = [hash1, hash2].sort((a, b) => (a < b ? -1 : 1));
      const concatenatedHash = ethers.solidityPacked(["bytes32", "bytes32"], sortedHashes);
      const intermediateHash = ethers.solidityPackedKeccak256(["bytes"], [concatenatedHash]);
      level.push(intermediateHash);
    }

    tree.push(level);
  }

  return tree;
}

function getMerkleProof(tree: Array<Array<string>>, leafIndex: number): Array<string> {
  const proof = [];

  for (let i = 0; i < tree.length - 1; i++) {
    const siblingIndex = leafIndex % 2 === 0 ? leafIndex + 1 : leafIndex - 1;

    if (siblingIndex < tree[i].length) {
      proof.push(tree[i][siblingIndex]);
    } else {
      proof.push(ethers.ZeroHash);
    }

    leafIndex = Math.floor(leafIndex / 2);
  }

  return proof;
}

export { hashPayload, hashSignature, signSignature, generateMerkleTree, getMerkleProof };
