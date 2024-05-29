import * as snarkjs from "snarkjs";
import { buildPoseidon } from "circomlibjs";
import { poseidon } from "circomlib";

function uint8ArrayToBigInt(uint8Array) {
  let result = 0n; // Initialize a BigInt
  for (let i = 0; i < uint8Array.length; i++) {
    result = (result << 8n) | BigInt(uint8Array[i]); // Shift and combine each byte
  }
  return result;
}

async function main() {
  const input = [0];

  await snarkjs.wtns.calculate(
    {
      inputs: input,
    },
    "./test-poseidon_js/test-poseidon.wasm",
    "w.wtns"
  );

  const wtns = await snarkjs.wtns.exportJson("w.wtns");
  console.log(wtns[1]);

  const poseidon2 = await buildPoseidon();
  const po = poseidon2(input);
  console.log(uint8ArrayToBigInt(po));

  console.log(poseidon(input));
}

main();
