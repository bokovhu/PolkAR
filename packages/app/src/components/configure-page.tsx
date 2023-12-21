import { useState } from "react";
import { ConfigurePageProps } from "./api";

// ConfigurePage Component
export function ConfigurePage({ onBack, onSave, selectedWidget }: ConfigurePageProps) {
    const [widgetConfig, setWidgetConfig] = useState({});

    const handleChange = (paramName: string, value: string) => {
        setWidgetConfig({ ...widgetConfig, [paramName]: value });
    };

    const handleSave = () => {
        onSave({
            id: selectedWidget.id,
            name: selectedWidget.name,
            settings: widgetConfig,
        });
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" onClick={onBack}>Back</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
            <div className="mt-3">
                <h3>Configure Widget: {selectedWidget ? selectedWidget.name : ''}</h3>
                <form>
                    {selectedWidget && selectedWidget.parameters.map((param: any, index: number) => (
                        <div key={index} className="mb-3">
                            <label htmlFor={param.name} className="form-label">{param.name}</label>
                            <input type="text" className="form-control" id={param.name} placeholder={`Enter ${param.name}`}
                                onChange={(e) => handleChange(param.name, e.target.value)} />
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
}
