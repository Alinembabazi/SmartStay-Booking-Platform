import { Link } from "react-router-dom";
import { useUserProfile } from "../../context/UserProfileContext";

export default function UserProfileCard({ compact = false }) {
    const { user, logout } = useUserProfile();

    if (!user) {
        return (
            <Link to="/login" className="rounded-md border px-3 py-1 text-sm">
                Login
            </Link>
        );
    }

    const initials = user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                    {initials || "U"}
                </span>
                <span className="max-w-24 truncate text-sm text-slate-700">{user.name}</span>
                <button type="button" onClick={logout} className="rounded-md border px-2 py-1 text-xs">
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-white p-3">
            <p className="font-medium">Signed in as</p>
            <p className="text-slate-600">{user.name}</p>
            {user.email ? <p className="text-sm text-slate-500">{user.email}</p> : null}
            <button type="button" onClick={logout} className="mt-3 rounded-md border px-3 py-1 text-sm">
                Logout
            </button>
        </div>
    );
}
