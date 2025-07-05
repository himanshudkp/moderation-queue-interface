const SkeletonRow = () => {
  return (
    <tr className="animate-pulse border-b">
      {Array.from({ length: 9 }).map((_, j) => (
        <td key={j} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
};

export default SkeletonRow;
