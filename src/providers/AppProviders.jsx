import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { FavoritesProvider } from "../context/FavoritesContext";
import { FiltersProvider } from "../context/FiltersContext";
import { UserProfileProvider } from "../context/UserProfileContext";

export default function AppProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProfileProvider>
                <FiltersProvider>
                    <FavoritesProvider>{children}</FavoritesProvider>
                </FiltersProvider>
            </UserProfileProvider>
        </QueryClientProvider>
    );
}