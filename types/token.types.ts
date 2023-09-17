enum Token {
  ETH = "ETH",
  WETH = "WETH",
  USDC = "USDC",
  USDT = "USDT",
  BTC = "BTC",
}

interface TokenInfo {
  address?: string;
  decimals: number;
}

export { Token, TokenInfo };
