import React from "react";
import { useFormik } from "formik";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "active",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("New Project Data:", values);
      resetForm();
      if (onSuccess) onSuccess();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Add New Project
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.description}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
