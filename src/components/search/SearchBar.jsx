import { useEffect, useRef, useState } from "react";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);
  const hasMountedRef = useRef(false);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const id = setTimeout(() => onSearchRef.current?.(value), 300);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search by city or title"
      className="w-full rounded-full border border-slate-300 px-4 py-2"
    />
  );
}
