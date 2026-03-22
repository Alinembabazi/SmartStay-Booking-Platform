/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const value = useMemo(() => ({
        favorites,
        isFavorite: (id) => favorites.some((item) => item.id === id),
        toggleFavorite: (listing) => {
            setFavorites((prev) => {
                const exists = prev.some((item) => item.id === listing.id);
                return exists ? prev.filter((item) => item.id !== listing.id) : [...prev, listing];
            });
        },
    }), [favorites]);

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
    return context;
}
