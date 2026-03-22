/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        location: "",
        minPrice: "",
        maxPrice: "",
        minRating: "",
        query: "",
    });

    const value = useMemo(() => ({ filters, setFilters }), [filters]);
    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
    const context = useContext(FiltersContext);
    if (!context) throw new Error("useFilters must be used inside FiltersProvider");
    return context;
}
