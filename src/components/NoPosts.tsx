import { capitalizeFirstChar, type FilterType } from "../utils/utils";

interface NoPostsProps {
  statusFilter: FilterType;
}

const NoPosts = ({ statusFilter }: NoPostsProps) => {
  return (
    <tr>
      <td
        colSpan={9}
        className="px-4 py-4 text-center text-gray-500 font-semibold"
      >
        {`There is no post available with status: ${capitalizeFirstChar(
          statusFilter
        )}`}
      </td>
    </tr>
  );
};

export default NoPosts;
