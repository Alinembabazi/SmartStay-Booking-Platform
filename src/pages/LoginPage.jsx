import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "../context/UserProfileContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useUserProfile();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const from = location.state?.from || "/";

    const onSubmit = (event) => {
        event.preventDefault();
        if (!name.trim()) return;
        login({ name, email });
        navigate(from, { replace: true });
    };

    return (
        <div className="grid min-h-screen place-items-center bg-slate-100 px-4">
            <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl bg-white p-5 shadow">
                <h1 className="mb-3 text-xl font-bold">Login</h1>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-3 w-full rounded-md border p-2"
                    placeholder="Enter your name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 w-full rounded-md border p-2"
                    placeholder="Email (optional)"
                />
                <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white" type="submit">
                    Continue
                </button>
            </form>
        </div>
    );
}
