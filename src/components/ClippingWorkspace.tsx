import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  Camera,
  Scissors,
  Code,
  Globe,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  Eye,
  FileCode,
  Clock,
  User,
  Image as ImageIcon,
  Send,
  Copy,
  Check,
} from 'lucide-react';
import { DestinationPicker } from './DestinationPicker';
import {
  EuclidNotebook,
  EuclidFolder,
  EuclidTag,
  EuclidNote,
  EuclidNoteType,
} from '../types';
import { clippingService } from '../services/clippingService';

interface ClippingWorkspaceProps {
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

export const ClippingWorkspace: React.FC<ClippingWorkspaceProps> = ({
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
  // Clipping Form Format
  const [clipFormat, setClipFormat] = useState<
    'simplified' | 'full' | 'selection' | 'bookmark' | 'screenshot' | 'code' | 'quick_note'
  >('simplified');

  // Input Fields
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Euclid');
  const [pageTitle, setPageTitle] = useState('Euclid — Father of Geometry & Axiomatic Systems');
  const [author, setAuthor] = useState('Euclid Projects Research');
  const [userComment, setUserComment] = useState('');
  const [selectedText, setSelectedText] = useState(
    'Euclid of Alexandria was a Greek mathematician, often referred to as the father of geometry. His Elements is one of the most influential works in the history of mathematics.'
  );
  const [codeContent, setCodeContent] = useState(
    'function euclidGCD(a: number, b: number): number {\n  while (b !== 0) {\n    const temp = b;\n    b = a % b;\n    a = temp;\n  }\n  return a;\n}'
  );
  const [codeLanguage, setCodeLanguage] = useState('typescript');

  // Preview Mode: HTML vs Markdown
  const [previewTab, setPreviewTab] = useState<'preview' | 'markdown' | 'raw'>('preview');

  // Destination Picker State
  const [selectedNotebookId, setSelectedNotebookId] = useState(notebooks[0]?.id || 'default-notebook');
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-web', 'tag-article']);
  const [destMode, setDestMode] = useState<'create_new' | 'add_to_existing'>('create_new');
  const [selectedTargetNoteId, setSelectedTargetNoteId] = useState('');

  // Save State
  const [isSaving, setIsSaving] = useState(false);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate Extracted Output
  const renderClipContent = () => {
    if (clipFormat === 'simplified') {
      const extracted = clippingService.extractSimplifiedArticle(
        `
        <article class="prose max-w-none">
          <h1>${pageTitle}</h1>
          <p class="lead font-medium text-slate-700">Euclid of Alexandria (fl. 300 BC) was a Greek mathematician, often referred to as the "father of geometry".</p>
          <h2>The Elements</h2>
          <p>The <em>Elements</em> is a mathematical treatise consisting of 13 books attributed to the ancient Greek mathematician Euclid in Alexandria, Ptolemaic Egypt c. 300 BC.</p>
          <ul>
            <li>Axiomatic method for geometric deduction</li>
            <li>Euclidean algorithm for greatest common divisor</li>
            <li>Proof of the infinitude of prime numbers</li>
          </ul>
          <blockquote>"There is no royal road to geometry." — Euclid to King Ptolemy I</blockquote>
        </article>
        `,
        url,
        pageTitle
      );
      return extracted;
    } else if (clipFormat === 'selection') {
      return clippingService.extractSelectedText(selectedText, pageTitle, url, userComment);
    } else if (clipFormat === 'code') {
      return clippingService.extractCodeSnippet(codeContent, codeLanguage, pageTitle, url);
    } else if (clipFormat === 'bookmark') {
      return {
        markdown: `### [${pageTitle}](${url})\n\n> ${userComment || 'Bookmarked reference page'}\n\nDomain: \`${new URL(url).hostname}\``,
        html: `<div class="p-4 border rounded-xl bg-slate-50"><a href="${url}" target="_blank" class="text-base font-bold text-emerald-600">${pageTitle}</a><p class="text-xs text-slate-500 mt-1">${url}</p><p class="text-sm mt-2 text-slate-700">${userComment || 'Bookmarked via Euclid Smart Clipper'}</p></div>`,
      };
    } else if (clipFormat === 'screenshot') {
      return {
        markdown: `![Screenshot of ${pageTitle}](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800)\n\n*Captured screenshot from [${pageTitle}](${url})*`,
        html: `<div class="p-3 border rounded-xl bg-slate-900 text-white"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" class="rounded-lg w-full mb-2"/><p class="text-xs text-slate-300">Visible area screenshot of ${pageTitle}</p></div>`,
      };
    } else {
      return {
        markdown: `### ${pageTitle}\n\n${userComment || 'Quick note saved directly to Euclid Smart Notes.'}`,
        html: `<div><h3>${pageTitle}</h3><p>${userComment || 'Quick note.'}</p></div>`,
      };
    }
  };

  const currentContent = renderClipContent();

  const handleSaveToSmartNotes = async () => {
    setIsSaving(true);

    let noteType: EuclidNoteType = 'web_clip';
    if (clipFormat === 'simplified' || clipFormat === 'full') noteType = 'article';
    if (clipFormat === 'bookmark') noteType = 'bookmark';
    if (clipFormat === 'screenshot') noteType = 'screenshot';
    if (clipFormat === 'code') noteType = 'code';

    const newNoteId = 'note_' + Date.now();
    const selectedTagNames = tags
      .filter((t) => selectedTagIds.includes(t.id))
      .map((t) => t.name);

    const noteToSave: EuclidNote = {
      id: newNoteId,
      user_id: 'local-user',
      title: pageTitle,
      content: currentContent.html,
      plainTextContent: currentContent.markdown.replace(/<[^>]+>/g, ''),
      markdownContent: currentContent.markdown,
      notebook_id: selectedNotebookId,
      folder_id: selectedFolderId || null,
      tags: selectedTagNames,
      noteType,
      sourceUrl: url,
      canonicalUrl: url,
      sourceTitle: pageTitle,
      sourceDomain: new URL(url).hostname,
      sourceAuthor: author,
      clipFormat,
      wordCount: currentContent.markdown.split(/\s+/).length,
      readingTime: Math.ceil(currentContent.markdown.split(/\s+/).length / 200),
      extensionCreated: true,
      extensionVersion: '1.0.0',
      syncStatus: 'synced',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await onSaveNote(noteToSave);
    setIsSaving(false);
    setSavedNoteId(newNoteId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-5">
      {/* Quick Action Clipping Mode Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        <button
          onClick={() => {
            setClipFormat('simplified');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'simplified'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Simplified</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('full');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'full'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Full Page</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('selection');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'selection'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Selected Text</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('bookmark');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'bookmark'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmark</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('screenshot');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'screenshot'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Screenshot</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('code');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            clipFormat === 'code'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Code Clip</span>
        </button>

        <button
          onClick={() => {
            setClipFormat('quick_note');
            setSavedNoteId(null);
          }}
          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold col-span-2 sm:col-span-1 ${
            clipFormat === 'quick_note'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Quick Note</span>
        </button>
      </div>

      {/* Page Source Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Target Page Title</label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full p-2.5 bg-[#16181D] border border-slate-800 rounded-xl font-medium text-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Page URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2.5 bg-[#16181D] border border-slate-800 rounded-xl font-mono text-[11px] text-slate-400 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {clipFormat === 'selection' && (
          <div>
            <label className="font-bold text-slate-300 block mb-1">Selected Content</label>
            <textarea
              rows={3}
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              className="w-full p-2.5 bg-[#16181D] border border-slate-800 rounded-xl font-sans text-xs text-slate-200 focus:border-indigo-500 outline-none"
            />
          </div>
        )}

        {clipFormat === 'code' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-300">Code Snippet</label>
              <select
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="bg-[#16181D] border border-slate-800 text-slate-300 rounded px-2 py-0.5 font-mono text-[11px]"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
              </select>
            </div>
            <textarea
              rows={4}
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="w-full p-3 bg-[#16181D] text-indigo-300 font-mono text-xs rounded-xl border border-slate-800 focus:border-indigo-500 outline-none"
            />
          </div>
        )}

        <div>
          <label className="font-bold text-slate-300 block mb-1">User Note / Annotations</label>
          <input
            type="text"
            placeholder="Add personal note or summary..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full p-2.5 bg-[#16181D] border border-slate-800 rounded-xl font-medium text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
          />
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

      {/* Extracted Content Live Preview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-[#16181D] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-xs text-slate-200">Clipped Article Live Preview</span>
          </div>

          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setPreviewTab('preview')}
              className={`px-3 py-1 rounded-lg transition-all ${
                previewTab === 'preview' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400'
              }`}
            >
              Rich View
            </button>
            <button
              onClick={() => setPreviewTab('markdown')}
              className={`px-3 py-1 rounded-lg transition-all ${
                previewTab === 'markdown' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400'
              }`}
            >
              Markdown
            </button>
          </div>
        </div>

        <div className="p-4 max-h-60 overflow-y-auto font-sans text-xs text-slate-300 space-y-2">
          {previewTab === 'markdown' ? (
            <pre className="whitespace-pre-wrap font-mono text-[11px] text-indigo-200 bg-[#16181D] p-3 rounded-xl border border-slate-800">
              {currentContent.markdown}
            </pre>
          ) : (
            <div
              className="prose prose-invert max-w-none text-xs text-slate-300"
              dangerouslySetInnerHTML={{ __html: currentContent.html }}
            />
          )}
        </div>
      </div>

      {/* Save Action & Result Confirmation Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 rounded-2xl text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-indigo-500/30">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-bold text-sm text-indigo-200 flex items-center gap-2 justify-center md:justify-start">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Ready to clip into Euclid Smart Notes</span>
          </h3>
          <p className="text-xs text-slate-400">
            Target: <span className="font-semibold text-indigo-300">{notebooks.find((n) => n.id === selectedNotebookId)?.name || 'General Research'}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {savedNoteId ? (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Saved to Euclid Smart Notes</span>
              </div>
              <button
                onClick={() => onOpenSmartNotesNote(savedNoteId)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all"
              >
                <span>Open in Euclid Smart Notes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSaveToSmartNotes}
              disabled={isSaving}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save to Euclid Smart Notes'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
