import { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { $dashboardService, prepareAppServices } from './services';
import { Welcome } from './components/welcome-page';
import { Dashboard } from './components/dashboard-page';
import { AddPage } from './components/add-page';
import { ConfigurePage } from './components/configure-page';
import { ARPage } from './components/ar-page';
import { LoadingPage } from './components/loading-page';

// App Component
function App() {
    const [page, setPage] = useState('loading');
    const [selectedWidget, setSelectedWidget] = useState(null);

    const handleAddWidget = (widget: any) => {
        $dashboardService.addWidget(widget, $dashboardService.addingWidgetTo);
        setPage('dashboard');
    };

    const handleAddFromDashboard = () => {
        $dashboardService.startAddingWidgetTo("ui");
        setPage('add');
    };

    const handleAddFromAr = () => {
        $dashboardService.startAddingWidgetTo("ar");
        setPage('add');
    };

    const renderPage = () => {
        switch (page) {
            case 'welcome':
                return <Welcome onEnter={() => setPage('dashboard')} />;
            case 'dashboard':
                return <Dashboard onAdd={handleAddFromDashboard} onAr={() => setPage('ar')} />;
            case 'add':
                return <AddPage onCancel={() => setPage('dashboard')} onConfigure={(widget) => { setSelectedWidget(widget); setPage('configure'); }} />;
            case 'configure':
                return <ConfigurePage onBack={() => setPage('add')} onSave={handleAddWidget} selectedWidget={selectedWidget} />;
            case 'ar':
                return <ARPage onCancel={() => setPage('dashboard')} onAdd={handleAddFromAr} />;
            case 'loading':
                return <LoadingPage onPrepare={prepareAppServices} onReady={() => setPage('dashboard')} />;
            default:
                return <Welcome onEnter={() => setPage('dashboard')} />;
        }
    };

    return <div>{renderPage()}</div>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
