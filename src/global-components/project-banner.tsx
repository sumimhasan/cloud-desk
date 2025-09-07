"use client";

import { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

interface Banner {
  id: number;
  name: string;
  imageUrl: string;
}

interface ProjectBannerAnimatedProps {
  banners: Banner[];
  isAdmin?: boolean;
  onUpdateBanner?: (updatedBanner: Banner) => void;
  onAddBanner?: (newBanner: Banner) => void;
  onSelectBanner?: (id: number) => void;
}

export default function ProjectBannerAnimated({
  banners,
  isAdmin = false,
  onUpdateBanner,
  onAddBanner,
  onSelectBanner,
}: ProjectBannerAnimatedProps) {
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    if (!editingBanner) return;
    if (editingBanner.id === 0) {
      onAddBanner && onAddBanner(editingBanner);
    } else {
      onUpdateBanner && onUpdateBanner(editingBanner);
    }
    setEditingBanner(null);
    setIsModalOpen(false);
  };

  // Tailwind class variables
  const containerClass = "relative w-full overflow-hidden py-4";
  const scrollContainerClass = "flex space-x-4 animate-scroll whitespace-nowrap";
  const bannerClass = "relative min-w-[250px] h-40 rounded-xl overflow-hidden shadow-lg cursor-pointer flex-shrink-0";
  const bannerImageClass = "w-full h-full object-cover";
  const overlayClass = "absolute inset-0 bg-black bg-opacity-30 flex items-end p-2";
  const overlayTextClass = "text-white font-semibold";
  const editButtonClass = "absolute top-2 right-2 text-white hover:text-gray-300";
  const addBannerClass = "relative min-w-[250px] h-40 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 cursor-pointer flex-shrink-0 hover:bg-gray-100";

  const modalOverlayClass = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  const modalContentClass = "bg-gray-50 p-6 rounded-xl w-96 shadow-lg";
  const modalTitleClass = "text-lg font-semibold mb-4";
  const inputClass = "w-full mb-2 px-3 py-1 border border-gray-300 rounded-md";
  const inputClassLast = "w-full mb-4 px-3 py-1 border border-gray-300 rounded-md";
  const modalButtonContainerClass = "flex justify-end space-x-2";
  const cancelButtonClass = "px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400";
  const saveButtonClass = "px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800";

  return (
    <div className={containerClass}>
      {/* Animated container */}
      <div className={scrollContainerClass}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={bannerClass}
            onClick={() => onSelectBanner && onSelectBanner(banner.id)}
          >
            <img src={banner.imageUrl} alt={banner.name} className={bannerImageClass} />
            <div className={overlayClass}>
              <span className={overlayTextClass}>{banner.name}</span>
            </div>
            {isAdmin && (
              <button
                className={editButtonClass}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingBanner(banner);
                  setIsModalOpen(true);
                }}
              >
                <FaEdit />
              </button>
            )}
          </div>
        ))}

        {/* Admin: Add new banner */}
        {isAdmin && (
          <div
            className={addBannerClass}
            onClick={() => {
              setEditingBanner({ id: 0, name: "", imageUrl: "" });
              setIsModalOpen(true);
            }}
          >
            <FaPlus size={24} />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingBanner && (
        <div className={modalOverlayClass}>
          <div className={modalContentClass}>
            <h3 className={modalTitleClass}>
              {editingBanner.id === 0 ? "Add Banner" : "Edit Banner"}
            </h3>
            <input
              type="text"
              placeholder="Banner Name"
              value={editingBanner.name}
              onChange={(e) =>
                setEditingBanner({ ...editingBanner, name: e.target.value })
              }
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editingBanner.imageUrl}
              onChange={(e) =>
                setEditingBanner({ ...editingBanner, imageUrl: e.target.value })
              }
              className={inputClassLast}
            />
            <div className={modalButtonContainerClass}>
              <button
                onClick={() => setIsModalOpen(false)}
                className={cancelButtonClass}
              >
                Cancel
              </button>
              <button onClick={handleSave} className={saveButtonClass}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
