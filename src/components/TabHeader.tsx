interface TableHeaderProps {
  isAllVisibleSelected: boolean;
  isSomeVisibleSelected: boolean;
  onToggleSelectAll: () => void;
}
export const TableHeader = ({
  isAllVisibleSelected,
  isSomeVisibleSelected,
  onToggleSelectAll,
}: TableHeaderProps) => (
  <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-10">
    <tr>
      <th className="px-4 py-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllVisibleSelected}
            ref={(el) => {
              if (el) {
                el.indeterminate =
                  isSomeVisibleSelected && !isAllVisibleSelected;
              }
            }}
            onChange={onToggleSelectAll}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="ml-2">Select</span>
        </div>
      </th>
      <th className="px-4 py-3">Title</th>
      <th className="px-4 py-3">Author</th>
      <th className="px-4 py-3">Reason</th>
      <th className="px-4 py-3">Reported At</th>
      <th className="px-4 py-3">Status</th>
      <th className="px-4 py-3 text-center">Reports</th>
      <th className="px-4 py-3 text-center">View</th>
      <th className="px-4 py-3 text-center">Actions</th>
    </tr>
  </thead>
);
