import type { Post } from "../types";
import { buttonColors, capitalizeFirstChar } from "../utils/utils";

interface PostRowProps {
  post: Post;
  isSelected: boolean;
  onToggleSelection: (postId: string) => void;
  onView: (postId: string) => void;
  onApprove: (postId: string) => void;
  onReject: (postId: string) => void;
}

export const PostRow = ({
  post,
  isSelected,
  onToggleSelection,
  onView,
  onApprove,
  onReject,
}: PostRowProps) => (
  <tr
    className={`border-b transition-colors ${
      isSelected ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
    }`}
  >
    <td className="px-4 py-2">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelection(post.id)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
    </td>
    <td className="px-4 py-2 font-bold">{post.title}</td>
    <td className="px-4 py-2">{capitalizeFirstChar(post.author.username)}</td>
    <td className="px-4 py-2 font-semibold">{post.reportedReason}</td>
    <td className="px-4 py-2">{new Date(post.reportedAt).toLocaleString()}</td>
    <td className="px-4 py-2">
      <span
        className={`rounded-full font-semibold px-4 py-2 ${
          buttonColors[post.status]
        }`}
      >
        {capitalizeFirstChar(post.status)}
      </span>
    </td>
    <td className="px-4 py-2 text-center">{post.reportCount}</td>
    <td className="px-4 py-2 text-center">
      <button
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition"
        onClick={() => onView(post.id)}
      >
        View
      </button>
    </td>
    <td className="px-4 py-2 text-center space-x-2">
      <button
        onClick={() => onApprove(post.id)}
        disabled={post.status === "approved"}
        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
          post.status === "approved"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Approve
      </button>
      <button
        onClick={() => onReject(post.id)}
        disabled={post.status === "rejected"}
        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
          post.status === "rejected"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        Reject
      </button>
    </td>
  </tr>
);
