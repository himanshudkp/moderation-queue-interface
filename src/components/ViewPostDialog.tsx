import { X, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import type { Post } from "../types";

interface ViewPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const PostDetailModal = ({
  isOpen,
  onClose,
  post,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: ViewPostDialogProps) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold">{post.title}</h2>

          <div className="text-gray-700 whitespace-pre-line">
            {post.content}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 border mt-4">
              <tbody>
                <tr className="border-b">
                  <th className="py-2 px-4 font-medium w-1/3 bg-gray-50">
                    Author
                  </th>
                  <td className="py-2 px-4">{post.author.username}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 px-4 font-medium bg-gray-50">Reason</th>
                  <td className="py-2 px-4">{post.reportedReason}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 px-4 font-medium bg-gray-50">
                    Reported At
                  </th>
                  <td className="py-2 px-4">
                    {new Date(post.reportedAt).toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 px-4 font-medium bg-gray-50">Reports</th>
                  <td className="py-2 px-4">{post.reportCount}</td>
                </tr>
                <tr>
                  <th className="py-2 px-4 font-medium bg-gray-50">Status</th>
                  <td className="py-2 px-4">{post.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
              hasPrevious
                ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="flex space-x-2">
              <ArrowBigLeft /> <span>Previous</span>
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
              hasNext
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <div className="flex space-x-2">
              <span>Next</span> <ArrowBigRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
