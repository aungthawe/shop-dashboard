import { create } from "zustand";

interface CategoryStore {
  search: string;
  currentPage: number;
  itemsPerPage: number;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}

export const useBrandStore = create<CategoryStore>((set) => ({
  search: "",
  currentPage: 1,
  itemsPerPage: 10,

  setSearch: (search) => set({ search, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
}));
