import { useEffect, useState } from "react";
import { $cryptoDataService } from "../services";
import { IVisualization } from "./api";

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
        <p className="fs-1">
            {
                loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <>{blockNumber}</>
                )
            }
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
        </p>
    </>;
}

export const LastBlockNumber: IVisualization = {
    id: 'last-block-number',
    name: 'Last Block Number',
    description: 'Displays the last block number.',
    parameters: [],
    component: ({ }) => (
        <VisualizeLastBlockNumber />
    )
};
