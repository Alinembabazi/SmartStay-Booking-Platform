import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import UserProfileCard from "../user/UserProfileCard";
import { useFilters } from "../../context/FiltersContext";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { filters, setFilters } = useFilters();

    const handleSearch = (query) => {
        const trimmed = query.trim();
        setFilters((prev) => ({ ...prev, query: trimmed }));

        // Keep user on the current screen; only auto-navigate when already on Home.
        if (location.pathname !== "/") {
            return;
        }

        navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
    };

    return (
        <header className="sticky top-0 z-10 border-b bg-white/90 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-4">
                <Link to="/" className="font-bold text-xl text-slate-900">
                   <img src="logohouse.png" alt="" /> 
                </Link>
                <div className="flex-1 font-bold text-2xl">
                    <SearchBar initialValue={filters.query} onSearch={handleSearch} />
                </div>
                <nav className="flex items-center gap-3 text-sm">
                    <Link to="/favorites" className="font-bold text-2xl">Favorites</Link>
                    <Link to="/bookings" className="font-bold text-2xl">Bookings</Link>
                    <UserProfileCard compact />
                </nav>
            </div>
        </header>
    );
}
