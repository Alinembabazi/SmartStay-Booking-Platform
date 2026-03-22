import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { FavoritesProvider } from "../context/FavoritesContext";
import { FiltersProvider } from "../context/FiltersContext";

export default function AppProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <FiltersProvider>
                <FavoritesProvider>{children}</FavoritesProvider>
            </FiltersProvider>
        </QueryClientProvider>
    );
}