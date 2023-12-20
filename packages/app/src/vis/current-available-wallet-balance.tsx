import { useEffect, useState } from "react";
import { $cryptoDataService } from "../services";
import { IVisualization } from "./api";

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
