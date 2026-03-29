import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Rebranded Interface
export interface FiscalReport {
    id: string;
    user_id: string;
    reportssheet_type: string; // Keep as 'reportssheet_type' for backend compatibility
    content: string | object;
    filename: string;
    generated_at: string;
}

interface ReportState {
    reports: FiscalReport[]; // Keeping key as 'reports' for now
    currentreportssheet: FiscalReport | null;
}

const initialState: ReportState = {
    reports: [],
    currentreportssheet: null,
};

const reportSlice = createSlice({
    name: 'reports', // Renamed from 'reports'
    initialState,
    reducers: {
        setreports(state, action: PayloadAction<FiscalReport[]>) {
            state.reports = action.payload;
        },
        clearreports(state) {
            state.reports = [];
            state.currentreportssheet = null;
        },
        setCurrentreportssheet(state, action: PayloadAction<FiscalReport>) {
            state.currentreportssheet = action.payload;
        },
        addreportssheet(state, action: PayloadAction<FiscalReport>) {
            state.reports.push(action.payload);
        },
    },
});

export const {
    setreports,
    clearreports,
    setCurrentreportssheet,
    addreportssheet,
} = reportSlice.actions;

export default reportSlice.reducer;