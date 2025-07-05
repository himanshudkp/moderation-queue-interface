import { buttonColors } from "../utils/utils";

interface BulkActionsBarProps {
  selectedPostsCount: number;
  onClearSelection: () => void;
  onBulkApprove: () => void;
  onBulkReject: () => void;
}
export const BulkActionsBar = ({
  selectedPostsCount,
  onClearSelection,
  onBulkApprove,
  onBulkReject,
}: BulkActionsBarProps) => (
  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-blue-900">
        {selectedPostsCount} post{selectedPostsCount > 1 ? "s" : ""} selected
      </span>
      <button
        onClick={onClearSelection}
        className="text-sm text-blue-600 hover:text-blue-800 underline"
      >
        Clear selection
      </button>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onBulkApprove}
        className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-150 flex items-center gap-2
          ${buttonColors.approved}
        `}
      >
        Approve Selected
        <span className="ml-1 inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-gray-300">
          {selectedPostsCount}
        </span>
      </button>

      <button
        onClick={onBulkReject}
        className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-150 flex items-center gap-2
          ${buttonColors.rejected}
        `}
      >
        Reject Selected
        <span className="ml-1 inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-gray-300">
          {selectedPostsCount}
        </span>
      </button>
    </div>
  </div>
);
