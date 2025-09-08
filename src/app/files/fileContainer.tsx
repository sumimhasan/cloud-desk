"use client";

import React, { useState } from "react";

type Permission = "admins" | "team" | "public";

type FileItem = {
  id: string;
  name: string;
  type: string; // pdf, docx, img, etc
  owner: string;
  permission: Permission;
  updatedAt: string;
  previewUrl?: string;
};

const dummyFiles: FileItem[] = [
  { id: "1", name: "Project-Proposal.pdf", type: "pdf", owner: "Alice (Admin)", permission: "admins", updatedAt: "2025-09-05" },
  { id: "2", name: "Team-Notes.txt", type: "txt", owner: "Bob (Worker)", permission: "team", updatedAt: "2025-09-07" },
  { id: "3", name: "Client-Brief.docx", type: "docx", owner: "Charlie (Admin)", permission: "public", updatedAt: "2025-09-08" },
  { id: "4", name: "Mockup.png", type: "img", owner: "Dana (Worker)", permission: "team", updatedAt: "2025-08-30" },
];

function PermissionBadge({ p }: { p: Permission }) {
  const map: Record<Permission, { label: string; className: string }> = {
    admins: { label: "Admins Only", className: "bg-red-100 text-red-800" },
    team: { label: "Team Members", className: "bg-yellow-100 text-yellow-800" },
    public: { label: "Public Read", className: "bg-green-100 text-green-800" },
  };
  const item = map[p];
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${item.className}`}>
      {item.label}
    </span>
  );
}

function FileCard({ file, onSelect }: { file: FileItem; onSelect: (f: FileItem) => void }) {
  return (
    <div className="bg-gray-500 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:shadow-md hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-700 text-sm font-semibold text-slate-200">
          {file.type.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate text-white">{file.name}</p>
          <p className="text-xs text-slate-900 truncate">by {file.owner}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <PermissionBadge p={file.permission} />
        <button
          onClick={() => onSelect(file)}
          className="px-3 py-1 text-xs rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Open
        </button>
      </div>
      <div className="mt-2 text-xs text-slate-500">Updated: {file.updatedAt}</div>
    </div>
  );
}

function FileRow({ file, onSelect }: { file: FileItem; onSelect: (f: FileItem) => void }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-2 px-3 hover:bg-white/2 rounded">
      <div className="col-span-5 truncate flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center text-white">{file.type}</div>
        <div className="truncate text-white">{file.name}</div>
      </div>
      <div className="col-span-2 text-sm text-gray-100">{file.owner}</div>
      <div className="col-span-2 text-sm"><PermissionBadge p={file.permission} /></div>
      <div className="col-span-2 text-sm text-white">{file.updatedAt}</div>
      <div className="col-span-1 text-right">
        <button onClick={() => onSelect(file)} className="px-2 py-1 text-sm rounded bg-white/3">⋮</button>
      </div>
    </div>
  );
}

export default function FilesContainer() {
  const [isAdmin] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [files, setFiles] = useState<FileItem[]>(dummyFiles);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  function handleUpload(form: { name: string; permission: Permission }) {
    const newFile: FileItem = {
      id: String(Date.now()),
      name: form.name,
      type: form.name.split('.').pop() || 'file',
      owner: isAdmin ? 'You (Admin)' : 'You',
      permission: form.permission,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setFiles([newFile, ...files]);
    setShowUpload(false);
  }

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-white">
        <div>
          <h1 className="text-2xl font-semibold">📂 Files</h1>
          <p className="text-sm text-muted-foreground">Drive-like files area with permission controls.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
            <button onClick={() => setView('grid')} className={`px-2 py-1 rounded ${view==='grid' ? 'bg-white/10' : ''}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-2 py-1 rounded ${view==='list' ? 'bg-white/10' : ''}`}>List</button>
          </div>

          <button
            disabled={!isAdmin}
            onClick={() => setShowUpload(true)}
            className={`px-3 py-2 rounded text-sm font-medium ${isAdmin ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/5 opacity-50 cursor-not-allowed'}`}>
            Upload File
          </button>
        </div>
      </div>

      {/* Files */}
      <div className="bg-white/3 rounded-lg p-4 min-h-[60vh]">
        {view === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {files.map(f => (
              <FileCard key={f.id} file={f} onSelect={setSelectedFile} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-semibold text-gray-200">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Permission</div>
              <div className="col-span-2">Last Modified</div>
              <div className="col-span-1">Actions</div>
            </div>
            <div className="divide-y divide-white/5 mt-2">
              {files.map(f => (
                <FileRow key={f.id} file={f} onSelect={setSelectedFile} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-800 rounded-lg p-6 w-[520px]">
            <h3 className="text-lg font-semibold">Upload File</h3>
            <UploadForm isAdmin={isAdmin} onCancel={() => setShowUpload(false)} onSubmit={handleUpload} />
          </div>
        </div>
      )}
    </div>
  );
}

function UploadForm({ isAdmin, onCancel, onSubmit }: { isAdmin: boolean; onCancel: () => void; onSubmit: (v: { name: string; permission: Permission }) => void }) {
  const [name, setName] = useState("");
  const [permission, setPermission] = useState<Permission>("team");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name: name || "untitled.txt", permission });
      }}
      className="mt-4 space-y-4"
    >
      <div>
        <label className="block text-sm text-muted-foreground">File name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 bg-white/5 rounded px-3 py-2" placeholder="example.pdf" />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground">Permission</label>
        <select value={permission} onChange={(e) => setPermission(e.target.value as Permission)} className="w-full mt-1 bg-white/5 rounded px-3 py-2">
          <option value="admins">Admins Only</option>
          <option value="team">Team Members</option>
          <option value="public">Public Read</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded bg-white/5">Cancel</button>
        <button type="submit" className={`px-3 py-2 rounded ${isAdmin ? 'bg-blue-600' : 'bg-white/5 opacity-50 cursor-not-allowed'}`} disabled={!isAdmin}>Upload</button>
      </div>
    </form>
  );
}
