import { Measurement } from "./measurement";

export interface Device {
    id: number;
    name: string;
    location: string;
    valveId: number;
    valveStatus?: boolean;
    lastMeasurement?: Measurement;

}
