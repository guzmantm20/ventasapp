import { create } from "zustand";
import { useParse } from "../hooks/useParse";
const useReportsStore = create((set, get) => ({
  reports: [],
  totalSell: 0,
  startDate: useParse().parseDate({ date: new Date() }),
  endDate: useParse().parseDate({ date: new Date() }),
  addReports: (newReports) => {
    set(() => ({ reports: newReports }));
  },
  updateReports: (newReports) => {
    set((state) => ({ reports: [...state.reports, ...newReports] }));
  },
  removeReports: () => set({ reports: [], totalSell: 0 }),
  setStartDate: (newDate) => set(() => ({ startDate: newDate })),
  setEndDate: (newDate) => set(() => ({ endDate: newDate })),
  setTotalSell: (total) => set(() => ({ totalSell: total })),
}));

export default useReportsStore;
