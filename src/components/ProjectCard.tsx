import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {status}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t pt-3">
        <button
          onClick={onEdit}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
