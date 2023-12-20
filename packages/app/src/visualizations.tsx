import { ReactNode, useEffect, useState } from "react";
import { $cryptoDataService } from "./services";

export interface IVisualizationComponentProps {
    settings: any;
    data: any;
}

export interface IVisualization {
    id: string;
    name: string;
    description: string;
    parameters: Array<{ name: string, description: string, type: string }>;
    component: (props: IVisualizationComponentProps) => ReactNode;
}

function VisualizeCurrentAvailableWalletBalance(
    props: {
        walletAddress: string;
    }
) {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () => {

            const api = $cryptoDataService.api!;

            const asyncLogic = async () => {
                const account = (await api.query.system.account(props.walletAddress)) as any;
                const totalBalance = account.data.free.toNumber();
                setBalance(totalBalance);
            };

            asyncLogic().then(
                () => {
                    setLoading(false);
                }
            ).catch(
                (e) => {
                    setError(`${e}`);
                    setLoading(false);
                }
            );

        }
    );

    return <>
        <p className="text-muted">Address: <b>{props.walletAddress}</b></p>
        <p>
            {
                loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <p className="fs-1">{balance}</p>
                )
            }
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
        </p>
    </>;
};

function VisualizeLastBlockNumber(
    props: {}
) {
    const [loading, setLoading] = useState(false);
    const [blockNumber, setBlockNumber] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () => {

            const api = $cryptoDataService.api!;
            let unsubscribe: (() => void) | null = null;

            const asyncLogic = async () => {
                unsubscribe = await api.rpc.chain.subscribeNewHeads(
                    async (header) => {
                        setBlockNumber(header.number.toNumber());
                    }
                )
            };

            asyncLogic().then(
                () => {
                    setLoading(false);
                }
            ).catch(
                (e) => {
                    setError(`${e}`);
                    setLoading(false);
                }
            );

            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };

        }
    );

    return <>
        <p>
            {
                loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <p className="fs-1">{blockNumber}</p>
                )
            }
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
        </p>
    </>;
}

export const CurrentAvailableWalletBalance: IVisualization = {
    id: 'current-available-wallet-balance',
    name: 'Current Available Wallet Balance',
    description: 'Displays the current available wallet balance of the given wallet address.',
    parameters: [
        {
            name: 'walletAddress',
            description: 'The wallet address to display the current available balance of.',
            type: 'string',
        }
    ],
    component: ({ settings }) => (
        <VisualizeCurrentAvailableWalletBalance walletAddress={settings.walletAddress} />
    )
};

export const LastBlockNumber: IVisualization = {
    id: 'last-block-number',
    name: 'Last Block Number',
    description: 'Displays the last block number.',
    parameters: [],
    component: ({ }) => (
        <VisualizeLastBlockNumber />
    )
};

export const ALL_VISUALIZATIONS: Array<IVisualization> = [
    CurrentAvailableWalletBalance,
    LastBlockNumber
];
