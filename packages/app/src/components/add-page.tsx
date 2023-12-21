import { useState } from "react";
import { AddPageProps } from "./api";
import { $widgetSearchService } from "../services";

// AddPage Component
export function AddPage({ onCancel, onConfigure }: AddPageProps) {
    const [selectedWidget, setSelectedWidget] = useState<any>(null);
    const availableWidgets = $widgetSearchService.getAvailableWidgets();

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button className="btn btn-primary" onClick={() => onConfigure(selectedWidget)} disabled={!selectedWidget}>Configure</button>
            </div>
            <div className="input-group mt-3">
                <input type="text" className="form-control" placeholder="Search widgets" />
                <button className="btn btn-outline-secondary" type="button">Help me!</button>
            </div>
            <ul className="list-group mt-3">
                {availableWidgets.map((widget, index) => (
                    <li key={index} className={`list-group-item ${selectedWidget && selectedWidget.name === widget.name ? 'active' : ''}`} onClick={() => setSelectedWidget(widget)}>
                        {widget.name}
                        <span className="badge bg-primary rounded-pill">{widget.parameters.map(p => p.name).join(', ')}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
