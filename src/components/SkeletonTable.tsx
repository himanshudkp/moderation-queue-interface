const SkeletonTable = () => {
  return (
    <table className="min-w-full text-sm text-left text-gray-700 bg-white">
      <thead className="bg-gray-100 text-xs uppercase text-gray-500 sticky top-0 z-10">
        <tr>
          {Array.from({ length: 11 }).map((_, j) => (
            <th key={j} className="px-4 py-3">
              &nbsp;
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 11 }).map((_, i) => (
          <tr key={`initial-skeleton-${i}`} className="animate-pulse border-b">
            {Array.from({ length: 11 }).map((_, j) => (
              <td key={j} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
