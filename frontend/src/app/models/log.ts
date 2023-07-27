import { DatetimeChangeEventDetail } from "@ionic/angular";

export interface Log {
    id: number;
    opened: boolean;
    date: Date;
    valveId: number;
}
