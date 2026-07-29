import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Camera,
  Bookmark,
  MessageSquarePlus,
  Clock,
  Youtube,
  Search,
  CheckCircle2,
  ExternalLink,
  Plus,
  Send,
  ListVideo,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  EuclidVideoNote,
  VideoTimestampNote,
  TranscriptItem,
  EuclidNote,
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
} from '../types';
import { DestinationPicker } from './DestinationPicker';

interface VideoNotesWorkspaceProps {
  notebooks: EuclidNotebook[];
  folders: EuclidFolder[];
  tags: EuclidTag[];
  existingNotes: EuclidNote[];
  onSaveNote: (note: EuclidNote) => Promise<string | boolean>;
  onCreateNotebook: (name: string, color: string) => void;
  onCreateFolder: (name: string, notebookId: string) => void;
  onCreateTag: (name: string, color: string) => void;
  onOpenSmartNotesNote: (noteId: string) => void;
}

export const VideoNotesWorkspace: React.FC<VideoNotesWorkspaceProps> = ({
  notebooks,
  folders,
  tags,
  existingNotes,
  onSaveNote,
  onCreateNotebook,
  onCreateFolder,
  onCreateTag,
  onOpenSmartNotesNote,
}) => {
  // Video Metadata State
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=fXfQfC1BvH8');
  const [videoTitle, setVideoTitle] = useState('3Blue1Brown — Linear Transformations & Matrix Multiplication');
  const [channelName, setChannelName] = useState('3Blue1Brown');
  const [currentTime, setCurrentTime] = useState(222); // 03:42
  const [duration, setDuration] = useState(900); // 15:00
  const [isPlaying, setIsPlaying] = useState(false);

  // New Timestamp Note Input
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<'note' | 'highlight' | 'question' | 'task' | 'bookmark'>('note');

  // Timestamp Notes List
  const [timestampNotes, setTimestampNotes] = useState<VideoTimestampNote[]>([
    {
      id: 'vnote-1',
      timestamp: 45,
      formattedTime: '00:45',
      title: 'Core Geometric Definition',
      content: 'Linear transformations preserve grid lines and keep origin fixed.',
      category: 'highlight',
      importance: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'vnote-2',
      timestamp: 180,
      formattedTime: '03:00',
      title: 'Matrix Vector Multiplication',
      content: 'Where do basis vectors i-hat and j-hat land?',
      category: 'question',
      importance: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'vnote-3',
      timestamp: 222,
      formattedTime: '03:42',
      title: 'Shear Transformation Example',
      content: 'i-hat lands at (1, 0), j-hat lands at (1, 1).',
      category: 'note',
      importance: 'high',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Transcripts
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItem[]>([
    { id: 't-1', start: 10, duration: 8, text: 'Welcome to chapter 3 of Essence of Linear Algebra.' },
    { id: 't-2', start: 45, duration: 12, text: 'A transformation is just a fancy word for a function, taking inputs and giving outputs.' },
    { id: 't-3', start: 120, duration: 15, text: 'Linear transformations keep grid lines parallel and evenly spaced.' },
    { id: 't-4', start: 222, duration: 18, text: 'Notice how the unit square transforms into a parallelogram during a shear.' },
    { id: 't-5', start: 350, duration: 20, text: 'The determinant tells us how areas scale under the transformation.' },
  ]);

  // Destination Picker State
  const [selectedNotebookId, setSelectedNotebookId] = useState(notebooks[0]?.id || 'default-notebook');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-youtube']);
  const [destMode, setDestMode] = useState<'create_new' | 'add_to_existing'>('create_new');
  const [selectedTargetNoteId, setSelectedTargetNoteId] = useState('');

  // Save Confirmation
  const [isSaving, setIsSaving] = useState(false);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddTimestampNote = () => {
    if (!noteTitle.trim()) return;
    const newNote: VideoTimestampNote = {
      id: 'vnote_' + Date.now(),
      timestamp: currentTime,
      formattedTime: formatSeconds(currentTime),
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      createdAt: new Date().toISOString(),
    };
    setTimestampNotes([...timestampNotes, newNote]);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleCaptureFrame = () => {
    const frameNote: VideoTimestampNote = {
      id: 'vnote_frame_' + Date.now(),
      timestamp: currentTime,
      formattedTime: formatSeconds(currentTime),
      title: `Video Frame Screenshot (${formatSeconds(currentTime)})`,
      content: `Captured visual diagram frame at ${formatSeconds(currentTime)}`,
      screenshotUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      category: 'bookmark',
      createdAt: new Date().toISOString(),
    };
    setTimestampNotes([...timestampNotes, frameNote]);
  };

  const handleSaveToSmartNotes = async () => {
    setIsSaving(true);
    const noteId = 'note_yt_' + Date.now();
    const videoId = 'fXfQfC1BvH8';

    // Generate Rich HTML with Clickable YouTube Timestamp links
    const timestampsHtml = timestampNotes
      .map((tn) => {
        const ytLink = `https://www.youtube.com/watch?v=${videoId}&t=${tn.timestamp}s`;
        return `
          <div class="border-l-4 border-emerald-500 pl-3 py-2 my-2 bg-slate-50 rounded-r-lg">
            <div class="flex items-center gap-2 mb-1">
              <a href="${ytLink}" target="_blank" class="px-2 py-0.5 bg-emerald-600 text-white font-mono text-xs rounded font-bold">${tn.formattedTime}</a>
              <strong class="text-slate-900">${tn.title}</strong>
            </div>
            <p class="text-xs text-slate-700">${tn.content}</p>
            ${tn.screenshotUrl ? `<img src="${tn.screenshotUrl}" class="rounded-lg mt-2 max-w-sm"/>` : ''}
          </div>
        `;
      })
      .join('');

    const fullHtml = `
      <div class="prose max-w-none">
        <h2>${videoTitle}</h2>
        <p class="text-xs text-slate-500">Channel: <strong>${channelName}</strong> | Source: <a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
        <hr class="my-3"/>
        <h3>Timestamped Notes & Highlights</h3>
        ${timestampsHtml}
      </div>
    `;

    const selectedTagNames = tags.filter((t) => selectedTagIds.includes(t.id)).map((t) => t.name);

    const noteToSave: EuclidNote = {
      id: noteId,
      user_id: 'local-user',
      title: `[YouTube] ${videoTitle}`,
      content: fullHtml,
      plainTextContent: timestampNotes.map((t) => `[${t.formattedTime}] ${t.title}: ${t.content}`).join('\n'),
      markdownContent: `# ${videoTitle}\n\n*Source: ${videoUrl}*\n\n` + timestampNotes.map((t) => `* [**${t.formattedTime}**](https://www.youtube.com/watch?v=${videoId}&t=${t.timestamp}s) **${t.title}**: ${t.content}`).join('\n'),
      notebook_id: selectedNotebookId,
      folder_id: selectedFolderId || null,
      tags: selectedTagNames,
      noteType: 'youtube',
      sourceUrl: videoUrl,
      sourceTitle: videoTitle,
      sourceAuthor: channelName,
      sourceDomain: 'youtube.com',
      videoData: {
        videoId,
        platform: 'youtube',
        videoTitle,
        channelName,
        videoUrl,
        duration,
        timestampNotes,
        transcript: transcriptItems,
      },
      extensionCreated: true,
      syncStatus: 'synced',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await onSaveNote(noteToSave);
      setIsSaving(false);
      setSavedNoteId(noteId);
    } catch (err: any) {
      console.error('[Smart Notes] Video Note save error:', err);
      setIsSaving(false);
      alert(err?.message || 'Failed to save Video Note to Smart Notes.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-5">
      {/* Video Source Metadata Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 rounded-xl text-white shadow-md">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-100">{videoTitle}</h2>
            <p className="text-xs text-slate-400">
              Channel: <span className="text-red-400 font-semibold">{channelName}</span> | Duration: {formatSeconds(duration)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-mono text-xs w-64 outline-none focus:ring-2 focus:ring-red-500"
          />
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Simulated Video Player & Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Simulated Video Player Box */}
          <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-4 group">
            {/* Overlay Frame Graphic */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube Watch Session</span>
              </span>
              <span className="bg-slate-900/90 text-lime-400 font-mono text-xs px-2.5 py-1 rounded-lg border border-slate-800 font-bold">
                {formatSeconds(currentTime)} / {formatSeconds(duration)}
              </span>
            </div>

            {/* Simulated Visual Content */}
            <div className="relative z-10 my-auto text-center space-y-2">
              <p className="text-3xl font-extrabold text-white tracking-tight">
                <span className="text-lime-400">i-hat</span> &rarr; (1, 0) | <span className="text-emerald-400">j-hat</span> &rarr; (1, 1)
              </p>
              <p className="text-xs text-slate-400 font-mono">Shear Matrix Visual Representation</p>
            </div>

            {/* Video Player Controls */}
            <div className="relative z-10 space-y-2">
              {/* Timeline Progress Bar */}
              <div className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl"
                    title="Rewind 5s (Alt + Left)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentTime(Math.min(duration, currentTime + 5))}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl"
                    title="Forward 5s (Alt + Right)"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCaptureFrame}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl flex items-center gap-1.5 text-xs transition-colors"
                    title="Capture Current Frame (Alt + S)"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Capture Frame</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Timestamp Note Input Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Create Timestamped Note at</span>
                <span className="font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-lg font-bold">
                  {formatSeconds(currentTime)}
                </span>
              </span>
              <span className="text-[11px] text-slate-500">Shortcut: <kbd className="bg-[#16181D] border border-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-400">Alt + N</kbd></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="sm:col-span-2 p-2.5 bg-[#16181D] border border-slate-800 text-slate-200 rounded-xl font-medium outline-none focus:border-indigo-500"
              />
              <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value as any)}
                className="p-2.5 bg-[#16181D] border border-slate-800 text-slate-200 rounded-xl font-medium outline-none"
              >
                <option value="note">📝 Note</option>
                <option value="highlight">⭐ Highlight</option>
                <option value="question">❓ Question</option>
                <option value="task">✅ Task</option>
                <option value="bookmark">🔖 Bookmark</option>
              </select>
            </div>

            <textarea
              rows={2}
              placeholder="Detailed timestamped explanation or quote..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full p-2.5 bg-[#16181D] border border-slate-800 text-slate-200 rounded-xl font-sans outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleAddTimestampNote}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Timestamp Note</span>
            </button>
          </div>

          {/* Timestamped Notes Timeline List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
              <ListVideo className="w-4 h-4 text-indigo-400" />
              <span>Video Notes Timeline ({timestampNotes.length})</span>
            </h3>

            <div className="space-y-2">
              {timestampNotes.map((tn) => (
                <div
                  key={tn.id}
                  onClick={() => setCurrentTime(tn.timestamp)}
                  className="p-3 bg-[#16181D] hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 rounded-xl transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-indigo-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {tn.formattedTime}
                      </span>
                      <span className="font-bold text-xs text-slate-100 group-hover:text-indigo-300">
                        {tn.title}
                      </span>
                    </div>
                    {tn.content && <p className="text-xs text-slate-400">{tn.content}</p>}
                    {tn.screenshotUrl && (
                      <img src={tn.screenshotUrl} alt="Frame" className="w-48 h-24 object-cover rounded-lg border border-slate-800 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Transcript Search & Destination Picker */}
        <div className="space-y-5">
          {/* Transcript Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-200">Synchronized Transcript</h3>
              <span className="text-[10px] text-indigo-400 font-bold">5 segments</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search transcript..."
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#16181D] border border-slate-800 text-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500"
              />
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 text-xs">
              {transcriptItems
                .filter((t) => t.text.toLowerCase().includes(transcriptSearch.toLowerCase()))
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTime(t.start)}
                    className="w-full text-left p-2 rounded-lg hover:bg-indigo-950/40 flex items-start gap-2 transition-colors border border-transparent hover:border-indigo-500/30"
                  >
                    <span className="font-mono text-[10px] text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.5 rounded font-bold shrink-0">
                      {formatSeconds(t.start)}
                    </span>
                    <span className="text-slate-300 text-[11px] leading-tight">{t.text}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Destination Picker */}
          <DestinationPicker
            notebooks={notebooks}
            folders={folders}
            tags={tags}
            existingNotes={existingNotes}
            selectedNotebookId={selectedNotebookId}
            setSelectedNotebookId={setSelectedNotebookId}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            selectedTagIds={selectedTagIds}
            setSelectedTagIds={setSelectedTagIds}
            mode={destMode}
            setMode={setDestMode}
            selectedTargetNoteId={selectedTargetNoteId}
            setSelectedTargetNoteId={setSelectedTargetNoteId}
            onCreateNotebook={onCreateNotebook}
            onCreateFolder={onCreateFolder}
            onCreateTag={onCreateTag}
          />

          {/* Action Box */}
          <div className="bg-slate-900 p-4 rounded-2xl text-white space-y-3 shadow-lg border border-slate-800">
            {savedNoteId ? (
              <div className="space-y-2">
                <div className="bg-lime-400 text-slate-950 p-2.5 rounded-xl font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>YouTube Note Saved to Euclid Smart Notes!</span>
                </div>
                <button
                  onClick={() => onOpenSmartNotesNote(savedNoteId)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Open in Euclid Smart Notes</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSaveToSmartNotes}
                disabled={isSaving}
                className="w-full py-3 bg-gradient-to-r from-lime-400 to-yellow-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Video Notes to Smart Notes'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
