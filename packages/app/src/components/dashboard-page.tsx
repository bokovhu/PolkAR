import { $dashboardService } from "../services";
import { ALL_VISUALIZATIONS } from "../visualizations";
import { DashboardProps } from "./api";

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
