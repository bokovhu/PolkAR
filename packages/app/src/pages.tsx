import { useEffect, useState } from "react";
import { $dashboardService, $widgetSearchService } from "./services";
import { ALL_VISUALIZATIONS } from "./visualizations";

// Welcome Component
type OnEnterCb = () => void;
type OnAddCb = () => void;
type OnArCb = () => void;
type OnCancelCb = () => void;
type OnConfigureCb = (widget: any) => void;
type OnPrepareCb = () => void | Promise<void>;
type OnReadyCb = () => void;

interface WelcomeProps {
    onEnter: OnEnterCb;
}
interface DashboardProps {
    onAdd: OnAddCb;
    onAr: OnArCb;
}
interface AddPageProps {
    onCancel: OnCancelCb;
    onConfigure: OnConfigureCb;
}
interface ConfigurePageProps {
    onBack: OnCancelCb;
    onSave: OnConfigureCb;
    selectedWidget: any;
}
interface ARPageProps {
    onCancel: OnCancelCb;
    onAdd: OnAddCb;
}
interface LoadingPageProps {
    onPrepare: OnPrepareCb;
    onReady: OnReadyCb;
}

// Welcome Component
export function Welcome({ onEnter }: WelcomeProps) {
    return (
        <div className="text-center mt-5">
            <h1>Welcome</h1>
            <button className="btn btn-primary mt-3" onClick={onEnter}>Enter</button>
        </div>
    );
}

// Dashboard Component
export function Dashboard({ onAdd, onAr }: DashboardProps) {
    const configuredWidgets = $dashboardService.getWidgets("ui");
    const widgets = configuredWidgets.map(
        (configuredWidget: any) => {
            const widgetArchetype = ALL_VISUALIZATIONS.find(
                (archetype: any) => archetype.id === configuredWidget.id
            );
            return {
                ...widgetArchetype,
                settings: configuredWidget.settings,
                data: "Placeholder data",
            };
        }
    );

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h2>Dashboard</h2>
                <button className="btn btn-primary" onClick={onAdd}>Add</button>
            </div>
            {widgets.length === 0 && <p>Oh, it looks like your dashboard is empty, start building it!</p>}
            <div className="row">
                {widgets.map((widget: any, index: number) => (
                    <div key={index} className="col-12 col-xl-6 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="badge bg-primary rounded-pill">{widget.name}</span>
                                </h5>
                                <div className="card-text">
                                    {widget.component({ data: widget.data, settings: widget.settings })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-secondary floating-action-btn" onClick={onAr}>AR</button>
        </div>
    );
}

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

// ARPage Component
export function ARPage({ onCancel, onAdd }: ARPageProps) {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button className="btn btn-primary" onClick={onAdd}>Add</button>
            </div>
            <div className="mt-3">
                <h3>AR Feature</h3>
                <p>Placeholder content for AR features.</p>
            </div>
        </div>
    );
}

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
