import { ReactNode } from "react";

export interface IVisualizationComponentProps {
    settings: any;
    data: any;
}

export interface IVisualization {
    id: string;
    name: string;
    description: string;
    parameters: Array<{ name: string, description: string, type: string }>;
    component: (props: IVisualizationComponentProps) => ReactNode;
}

