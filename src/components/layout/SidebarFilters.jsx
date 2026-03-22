import { useFilters } from "../../context/FiltersContext";

const EMPTY_FILTERS = {
  location: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  query: "",
};

export default function SidebarFilters() {
  const { filters, setFilters } = useFilters();

  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="space-y-3 rounded-xl bg-white p-4 shadow">
      <h2 className="font-semibold">Filters</h2>

      <input
        value={filters.location}
        onChange={(event) => update("location", event.target.value)}
        placeholder="Location"
        className="w-full rounded-md border p-2"
      />

      <input
        type="number"
        value={filters.minPrice}
        onChange={(event) => update("minPrice", event.target.value)}
        placeholder="Min price"
        className="w-full rounded-md border p-2"
      />

      <input
        type="number"
        value={filters.maxPrice}
        onChange={(event) => update("maxPrice", event.target.value)}
        placeholder="Max price"
        className="w-full rounded-md border p-2"
      />

      <input
        type="number"
        value={filters.minRating}
        onChange={(event) => update("minRating", event.target.value)}
        placeholder="Minimum rating"
        className="w-full rounded-md border p-2"
      />

      <button
        type="button"
        onClick={() => setFilters(EMPTY_FILTERS)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      >
        Clear filters
      </button>
    </aside>
  );
}
