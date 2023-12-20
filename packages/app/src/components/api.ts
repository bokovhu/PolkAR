export type OnEnterCb = () => void;
export type OnAddCb = () => void;
export type OnArCb = () => void;
export type OnCancelCb = () => void;
export type OnConfigureCb = (widget: any) => void;
export type OnPrepareCb = () => void | Promise<void>;
export type OnReadyCb = () => void;

export interface WelcomeProps {
    onEnter: OnEnterCb;
}
export interface DashboardProps {
    onAdd: OnAddCb;
    onAr: OnArCb;
}
export interface AddPageProps {
    onCancel: OnCancelCb;
    onConfigure: OnConfigureCb;
}
export interface ConfigurePageProps {
    onBack: OnCancelCb;
    onSave: OnConfigureCb;
    selectedWidget: any;
}
export interface LoadingPageProps {
    onPrepare: OnPrepareCb;
    onReady: OnReadyCb;
}
export interface ARPageProps {
    onCancel: OnCancelCb;
    onAdd: OnAddCb;
}