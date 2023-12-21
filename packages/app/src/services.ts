import { ApiPromise, WsProvider } from "@polkadot/api";
import { ALL_VISUALIZATIONS } from "./visualizations";

export class CryptoDataService {

    private _polkadotRpcUrl: string = 'wss://polkadot-rpc.dwellir.com';
    private _polkadotApi: ApiPromise | null = null;
    private _polkadotWsProvider: WsProvider | null = null;

    constructor() {

    }

    async prepare() {
        this._polkadotWsProvider = new WsProvider(this._polkadotRpcUrl);
        this._polkadotApi = await ApiPromise.create({
            provider: this._polkadotWsProvider,
        });
    }

    get api() {
        return this._polkadotApi;
    }

}

// DashboardService Class
export class DashboardService {

    private _addingWidgetTo: 'ui' | 'ar' = 'ui';

    constructor() {

    }

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

    constructor() {

    }

    getAvailableWidgets() {
        return ALL_VISUALIZATIONS;
    }
};

export const $dashboardService = new DashboardService();
export const $widgetSearchService = new WidgetSearchService();
export const $cryptoDataService = new CryptoDataService();

export async function prepareAppServices() {
    await $cryptoDataService.prepare();
}
