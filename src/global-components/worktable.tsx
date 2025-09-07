"use client";

import { useState } from "react";
import WorkTable from "@/global-components/worktable-tab";
import ProjectBannerAnimated from "./project-banner";

export default function WorkTablePage() {
  const [isAdmin, setIsAdmin] = useState(true); // toggle for admin/worker

  // Project banners state
  const [bannersState, setBannersState] = useState([
    { id: 1, name: "Project Alpha", imageUrl: "https://picsum.photos/400/150?random=1" },
    { id: 2, name: "Project Beta", imageUrl: "https://picsum.photos/400/150?random=2" },
    { id: 3, name: "Project Gamma", imageUrl: "https://picsum.photos/400/150?random=3" },
  ]);

  // Update banner
  const updateBannerState = (updatedBanner: { id: number; name: string; imageUrl: string }) => {
    setBannersState(prev =>
      prev.map(b => (b.id === updatedBanner.id ? updatedBanner : b))
    );
  };

  // Add banner
  const addBannerToState = (newBanner: { id: number; name: string; imageUrl: string }) => {
    const newId = bannersState.length ? Math.max(...bannersState.map(b => b.id)) + 1 : 1;
    setBannersState([...bannersState, { ...newBanner, id: newId }]);
  };

  // Filter tasks by banner (for now just console)
  const filterTasksByBanner = (id: number) => {
    console.log("Filter tasks for project/banner id:", id);
  };

  return (
    <div className="flex flex-col space-y-6 p-4 bg-gray-500 min-h-screen">
      {/* Project Banners */}
      <ProjectBannerAnimated
        banners={bannersState}
        isAdmin={isAdmin}
        onUpdateBanner={updateBannerState}
        onAddBanner={addBannerToState}
        onSelectBanner={filterTasksByBanner}
      />
      {/* WorkTable */}
      <WorkTable isAdmin={isAdmin} />
    </div>
  );
}
