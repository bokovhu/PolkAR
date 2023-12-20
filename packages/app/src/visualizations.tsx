import { ReactNode } from "react";

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
    component: ({ data, settings }) => <>
        <p className="text-muted">Address: <b>{settings.walletAddress}</b></p>
        <p>{data}</p>
    </>,
};

export const ALL_VISUALIZATIONS: Array<IVisualization> = [
    CurrentAvailableWalletBalance,
];
