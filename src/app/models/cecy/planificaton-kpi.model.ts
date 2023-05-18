import { KpiInterface } from "@shared/interfaces/kpi.interface";

export class PlanificationKpiModel implements KpiInterface {
    'APROBADO' = 0;
    'POR APROBAR' = 0;
    'CULMINADO' = 0;
    'EN PROCESO' = 0;

    icons = {
        'APROBADO': 'pi pi-check-square',
        'POR APROBAR': 'bi bi-hourglass',
        'CULMINADO': 'bi bi-hourglass-bottom',
        'EN PROCESO': 'pi pi-calendar-times',
    }
}