import { ARPageProps } from "./api";

// ARPage Component
export function ARPage({ onCancel, onAdd }: ARPageProps) {
    return (
        <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1000}}>
            <a-scene embedded arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3_HAMMING63" vr-mode-ui="enabled: false;">
                <a-marker type="barcode" value="0">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-marker type="barcode" value="1">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-marker type="barcode" value="2">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-marker type="barcode" value="3">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-marker type="barcode" value="4">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-marker type="barcode" value="5">
                    <a-box position="0 0 0" color="yellow">
                    </a-box>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </div>
    );
}
