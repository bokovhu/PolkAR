import { useEffect, useState } from "react";
import { LoadingPageProps } from "./api";

// LoadingPage Component
export function LoadingPage({ onPrepare, onReady }: LoadingPageProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () => {
            const prep = async () => {
                await onPrepare();
            };
            prep().then(
                () => {
                    onReady();
                }
            ).catch(
                (e) => {
                    setError(`${e}`);
                    setLoading(false);
                }
            );
        },
        []
    );

    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        {loading ? (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <></>
        )}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
    </div>
}
