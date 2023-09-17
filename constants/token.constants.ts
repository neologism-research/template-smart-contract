import type { Token, TokenInfo } from "/types/token.types";

const tokens: {
  [key in Token]?: TokenInfo;
} = {
  WETH: {
    decimals: 18,
  },
};

export { Token, tokens };
