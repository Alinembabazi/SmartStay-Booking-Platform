export default function ErrorState({ message, onRetry }) {
    return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p>{message || "Something went wrong."}</p>
            {onRetry ? (
                <button onClick={onRetry} className="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm text-white">
                    Retry
                </button>
            ) : null}
        </div>
    );
}
