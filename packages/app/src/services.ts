import { ALL_VISUALIZATIONS } from "./visualizations";

// DashboardService Class
export class DashboardService {

    private _addingWidgetTo: 'ui' | 'ar' = 'ui';

    startAddingWidgetTo(dashboardType: 'ui' | 'ar') {
        this._addingWidgetTo = dashboardType;
    }

    get addingWidgetTo() {
        return this._addingWidgetTo;
    }

    getWidgets(
        dashboardType?: 'ui' | 'ar'
    ) {
        const actualDashboardType = dashboardType || 'ui';
        return JSON.parse(localStorage.getItem(`widgets-${actualDashboardType}`) || '[]');
    }

    addWidget(widget: any, dashboardType?: 'ui' | 'ar') {
        const widgets = this.getWidgets(dashboardType);
        localStorage.setItem(`widgets-${dashboardType}`, JSON.stringify([...widgets, widget]));
    }
}

// WidgetSearchService Class
export class WidgetSearchService {
    getAvailableWidgets() {
        return ALL_VISUALIZATIONS;
    }
};


export const $dashboardService = new DashboardService();
export const $widgetSearchService = new WidgetSearchService();
