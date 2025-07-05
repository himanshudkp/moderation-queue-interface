import {
  activeRingColors,
  buttonColors,
  capitalizeFirstChar,
  FILTER_BUTTONS,
  type FilterType,
} from "../utils/utils";

interface FilterButtonsProps {
  statusFilter: FilterType;
  statusCounts: Record<FilterType, number>;
  onFilterChange: (status: FilterType) => void;
}

export const FilterButtons = ({
  statusFilter,
  statusCounts,
  onFilterChange,
}: FilterButtonsProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <span className="font-semibold text-gray-700">Filter by status:</span>
    {FILTER_BUTTONS.map((status) => {
      const isActive = statusFilter === status;
      const count = statusCounts[status];

      return (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-150 flex items-center gap-2
            ${buttonColors[status]}
            ${isActive ? activeRingColors[status] : ""}
          `}
        >
          {capitalizeFirstChar(status)}
          <span className="ml-1 inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-gray-300">
            {count}
          </span>
        </button>
      );
    })}
  </div>
);
