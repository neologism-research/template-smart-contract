import { tokens } from "/constants/token.constants";
import { Token } from "/types/token.types";

function toTokenDecimals(value: bigint | number, token?: Token, decimals?: number): bigint {
  const tokenDecimals = decimals ?? tokens[token ?? Token.WETH]?.decimals ?? 18;
  const tokenValue = typeof value === "number" ? BigInt(value) : value;

  return tokenValue * BigInt(10) ** BigInt(tokenDecimals);
}

function toBPS(value: number): bigint {
  if (value === 0) return 0n;
  if (value < 0.01 || value > 100) throw new Error("BPS value must be either (0) or (between 0.01 and 100)");
  return BigInt(value * 100);
}

function calculateBPSValue(value: bigint, bps: bigint): bigint {
  return (value * bps) / BigInt(10000);
}

export { toTokenDecimals, toBPS, calculateBPSValue };
