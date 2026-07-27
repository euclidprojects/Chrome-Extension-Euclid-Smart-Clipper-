import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  Folder,
  BookOpen,
  Tag as TagIcon,
  Trash2,
  Archive,
  Star,
  FileText,
  Bookmark,
  Camera,
  Youtube,
  Video,
  Mic,
  FileCode,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Download,
  Share2,
  Edit,
  Clock,
  Sparkles,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { EuclidNote, EuclidNotebook, EuclidFolder, EuclidTag } from '../types';

interface DashboardViewProps {
  notes: EuclidNote[];
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  onOpenSmartNotesNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onToggleFavorite: (noteId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  notes,
  notebooks,
  folders,
  tags,
  onOpenSmartNotesNote,
  onDeleteNote,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeNoteDetail, setActiveNoteDetail] = useState<EuclidNote | null>(null);

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    // Search query match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      (n.plainTextContent && n.plainTextContent.toLowerCase().includes(q)) ||
      (n.sourceUrl && n.sourceUrl.toLowerCase().includes(q));

    // Type filter match
    if (selectedFilter === 'all') return matchesSearch && !n.is_archived && !n.is_deleted;
    if (selectedFilter === 'articles') return matchesSearch && (n.noteType === 'article' || n.noteType === 'web_clip');
    if (selectedFilter === 'bookmarks') return matchesSearch && n.noteType === 'bookmark';
    if (selectedFilter === 'screenshots') return matchesSearch && (n.noteType === 'screenshot' || n.noteType === 'annotated_screenshot');
    if (selectedFilter === 'youtube') return matchesSearch && n.noteType === 'youtube';
    if (selectedFilter === 'favorites') return matchesSearch && n.is_favorite;
    if (selectedFilter === 'archive') return matchesSearch && n.is_archived;
    if (selectedFilter === 'trash') return matchesSearch && n.is_deleted;

    return matchesSearch;
  });

  const getNoteBadgeColor = (type: string) => {
    switch (type) {
      case 'youtube':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'article':
      case 'web_clip':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'bookmark':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'screenshot':
      case 'annotated_screenshot':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#0F1115] overflow-hidden font-sans text-slate-100">
      {/* Collapsible Sidebar */}
      <aside className="w-64 bg-[#16181D] text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Main Navigation Filters */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Navigation</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'all' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>All Clips</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{notes.length}</span>
            </button>

            <button
              onClick={() => setSelectedFilter('articles')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'articles' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Articles & Web Clips</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('bookmarks')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'bookmarks' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-blue-400" />
                <span>Bookmarks</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('screenshots')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'screenshots' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>Screenshots & Annotations</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('youtube')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'youtube' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Video Notes</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('favorites')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === 'favorites' ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' : 'hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Favorites</span>
              </div>
            </button>
          </div>

          {/* Notebooks List */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Notebooks</p>
            {notebooks.map((nb) => (
              <div key={nb.id} className="px-3 py-1.5 text-xs font-medium flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate">{nb.name}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Tags</p>
            <div className="flex flex-wrap gap-1 px-3 pt-1">
              {tags.map((t) => (
                <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  #{t.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Euclid Smart Clipper</span>
          <span className="font-mono text-indigo-400 font-bold">Connected</span>
        </div>
      </aside>

      {/* Main Content Feed Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#16181D] p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Full-text search clips, notes, transcripts, URLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Clips Grid */}
        {filteredNotes.length === 0 ? (
          <div className="bg-[#16181D] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-200">No clips found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Start clipping articles, websites, screenshots, or YouTube notes using the Clipper popup or shortcuts!
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setActiveNoteDetail(note)}
                className="bg-[#16181D] border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 shadow-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getNoteBadgeColor(
                        note.noteType
                      )}`}
                    >
                      {note.noteType.replace('_', ' ')}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(note.id);
                      }}
                      className="text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${note.is_favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 line-clamp-2 transition-colors">
                    {note.title}
                  </h3>

                  {note.plainTextContent && (
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {note.plainTextContent}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[150px] font-mono text-slate-400">
                    {note.sourceDomain || 'local'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSmartNotesNote(note.id);
                      }}
                      className="px-2 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold border border-indigo-500/30 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Open Note</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Note Detail Drawer Modal */}
      {activeNoteDetail && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex justify-end">
          <div className="w-full max-w-xl bg-[#16181D] h-full shadow-2xl p-6 overflow-y-auto space-y-6 border-l border-slate-800 text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {activeNoteDetail.noteType}
                </span>
                <h2 className="text-lg font-bold text-slate-100">{activeNoteDetail.title}</h2>
              </div>
              <button
                onClick={() => setActiveNoteDetail(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Source Info Bar */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400">Source URL: <a href={activeNoteDetail.sourceUrl} target="_blank" className="text-indigo-400 underline">{activeNoteDetail.sourceUrl}</a></p>
              {activeNoteDetail.sourceAuthor && <p className="text-slate-400">Author: {activeNoteDetail.sourceAuthor}</p>}
              <p className="text-slate-500">Clipped: {new Date(activeNoteDetail.created_at).toLocaleString()}</p>
            </div>

            {/* Content Preview */}
            <div className="prose prose-invert text-xs max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: activeNoteDetail.content }} />

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <button
                onClick={() => onOpenSmartNotesNote(activeNoteDetail.id)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
              >
                <span>Open in Euclid Smart Notes</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onDeleteNote(activeNoteDetail.id);
                  setActiveNoteDetail(null);
                }}
                className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-colors"
                title="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
