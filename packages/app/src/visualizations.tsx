import { IVisualization } from "./vis/api";
import { BlocksInTheChain } from "./vis/blocks-in-the-chain";
import { CurrentAvailableWalletBalance } from "./vis/current-available-wallet-balance";
import { LastBlockNumber } from "./vis/last-block-number";

export const ALL_VISUALIZATIONS: Array<IVisualization> = [
    CurrentAvailableWalletBalance,
    LastBlockNumber,
    BlocksInTheChain
];
