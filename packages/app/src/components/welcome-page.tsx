import { WelcomeProps } from "./api";

// Welcome Component
export function Welcome({ onEnter }: WelcomeProps) {
    return (
        <div className="text-center mt-5">
            <h1>Welcome</h1>
            <button className="btn btn-primary mt-3" onClick={onEnter}>Enter</button>
        </div>
    );
}
