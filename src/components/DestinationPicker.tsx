import React, { useState } from 'react';
import {
  Folder,
  BookOpen,
  Tag as TagIcon,
  Plus,
  Search,
  FilePlus,
  FileText,
  ChevronRight,
  Check,
} from 'lucide-react';
import { EuclidNotebook, EuclidFolder, EuclidTag, EuclidNote } from '../types';

interface DestinationPickerProps {
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  selectedNotebookId: string;
  setSelectedNotebookId: (id: string) => void;
  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;
  selectedTagIds: string[];
  setSelectedTagIds: (ids: string[]) => void;
  mode: 'create_new' | 'add_to_existing';
  setMode: (mode: 'create_new' | 'add_to_existing') => void;
  selectedTargetNoteId?: string;
  setSelectedTargetNoteId?: (id: string) => void;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
}

export const DestinationPicker: React.FC<DestinationPickerProps> = ({
  notebooks,
  folders,
  tags,
  existingNotes,
  selectedNotebookId,
  setSelectedNotebookId,
  selectedFolderId,
  setSelectedFolderId,
  selectedTagIds,
  setSelectedTagIds,
  mode,
  setMode,
  selectedTargetNoteId,
  setSelectedTargetNoteId,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
}) => {
  const [showNewNotebookModal, setShowNewNotebookModal] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);

  const [newNotebookName, setNewNotebookName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [newTagName, setNewTagName] = useState('');

  const [noteSearchQuery, setNoteSearchQuery] = useState('');

  const filteredFolders = folders.filter((f) => !f.notebookId || f.notebookId === selectedNotebookId);
  const filteredNotes = existingNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(noteSearchQuery.toLowerCase()) ||
      (n.sourceUrl && n.sourceUrl.toLowerCase().includes(noteSearchQuery.toLowerCase()))
  );

  const handleToggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    } else {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Mode Selector: Create New Note vs Add to Existing Note */}
      <div className="flex rounded-xl bg-[#16181D] p-1 border border-slate-800 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMode('create_new')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            mode === 'create_new'
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span>Create New Note</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('add_to_existing')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            mode === 'add_to_existing'
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Add to Existing Note</span>
        </button>
      </div>

      {mode === 'add_to_existing' ? (
        /* Target Note Selection */
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>Search & Select Smart Notes Note</span>
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter existing notes by title or URL..."
              value={noteSearchQuery}
              onChange={(e) => setNoteSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#16181D] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1 rounded-xl border border-slate-800 p-1 bg-[#16181D]">
            {filteredNotes.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No matching notes found</p>
            ) : (
              filteredNotes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setSelectedTargetNoteId && setSelectedTargetNoteId(note.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    selectedTargetNoteId === note.id
                      ? 'bg-indigo-600/30 text-indigo-200 font-bold border border-indigo-500/50'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="truncate pr-2">{note.title}</span>
                  {selectedTargetNoteId === note.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Notebook, Folder & Tags Pickers */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Notebook Picker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Notebook</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNewNotebookModal(true)}
                className="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>

            <select
              value={selectedNotebookId}
              onChange={(e) => setSelectedNotebookId(e.target.value)}
              className="w-full p-2 bg-[#16181D] border border-slate-800 rounded-xl font-medium text-slate-200 focus:border-indigo-500 outline-none"
            >
              {notebooks.map((nb) => (
                <option key={nb.id} value={nb.id} className="bg-slate-900 text-slate-200">
                  📖 {nb.name} {nb.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Folder Picker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-indigo-400" />
                <span>Folder</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNewFolderModal(true)}
                className="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>

            <select
              value={selectedFolderId}
              onChange={(e) => setSelectedFolderId(e.target.value)}
              className="w-full p-2 bg-[#16181D] border border-slate-800 rounded-xl font-medium text-slate-200 focus:border-indigo-500 outline-none"
            >
              <option value="" className="bg-slate-900 text-slate-200">📂 Root / No Folder</option>
              {filteredFolders.map((f) => (
                <option key={f.id} value={f.id} className="bg-slate-900 text-slate-200">
                  📁 {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Selection */}
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tags</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNewTagModal(true)}
                className="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((t) => {
                const isSelected = selectedTagIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleToggleTag(t.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]'
                        : 'bg-[#16181D] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>#{t.name}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* New Notebook Modal Inline */}
      {showNewNotebookModal && (
        <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/30 space-y-2 text-xs">
          <p className="font-bold text-indigo-300">Create New Notebook</p>
          <input
            type="text"
            placeholder="Notebook title..."
            value={newNotebookName}
            onChange={(e) => setNewNotebookName(e.target.value)}
            className="w-full p-2 bg-[#16181D] border border-slate-800 rounded-lg text-slate-200 outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewNotebookModal(false)}
              className="px-3 py-1 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (newNotebookName.trim()) {
                  onCreateNotebook(newNotebookName.trim(), '#6366f1');
                  setNewNotebookName('');
                  setShowNewNotebookModal(false);
                }
              }}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* New Folder Modal Inline */}
      {showNewFolderModal && (
        <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/30 space-y-2 text-xs">
          <p className="font-bold text-indigo-300">Create New Folder</p>
          <input
            type="text"
            placeholder="Folder name..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="w-full p-2 bg-[#16181D] border border-slate-800 rounded-lg text-slate-200 outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewFolderModal(false)}
              className="px-3 py-1 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (newFolderName.trim()) {
                  onCreateFolder(newFolderName.trim(), selectedNotebookId);
                  setNewFolderName('');
                  setShowNewFolderModal(false);
                }
              }}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* New Tag Modal Inline */}
      {showNewTagModal && (
        <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/30 space-y-2 text-xs">
          <p className="font-bold text-indigo-300">Create New Tag</p>
          <input
            type="text"
            placeholder="Tag name (without #)..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="w-full p-2 bg-[#16181D] border border-slate-800 rounded-lg text-slate-200 outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewTagModal(false)}
              className="px-3 py-1 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (newTagName.trim()) {
                  onCreateTag(newTagName.trim().replace(/^#/, ''), '#6366f1');
                  setNewTagName('');
                  setShowNewTagModal(false);
                }
              }}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Create Tag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
