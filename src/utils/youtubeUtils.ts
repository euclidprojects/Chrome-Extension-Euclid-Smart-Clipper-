/**
 * YouTube Utility functions for Euclid Smart Clipper.
 * Handles detection, parsing, normalization, cleaning, and timestamping of YouTube URLs.
 */

/**
 * Extracts YouTube Video ID from various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://music.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeVideoId(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  try {
    const trimmed = rawUrl.trim();
    const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const host = urlObj.hostname.toLowerCase().replace(/^www\./, '');

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      // 1. Check 'v' search parameter (watch / music)
      const vParam = urlObj.searchParams.get('v');
      if (vParam && vParam.trim().length > 0) {
        return vParam.trim();
      }

      // 2. Check /shorts/VIDEO_ID or /embed/VIDEO_ID
      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      if (pathSegments.length >= 2) {
        const first = pathSegments[0].toLowerCase();
        if (first === 'shorts' || first === 'embed' || first === 'v') {
          return pathSegments[1].split('?')[0].split('&')[0];
        }
      }
    } else if (host === 'youtu.be') {
      // Short links: https://youtu.be/VIDEO_ID
      const pathSegments = urlObj.pathname.split('/').filter(Boolean);
      if (pathSegments.length >= 1) {
        return pathSegments[0].split('?')[0].split('&')[0];
      }
    }
  } catch (e) {
    // Return null if invalid URL
  }

  return null;
}

/**
 * Extracts optional Playlist ID if present ('list' parameter).
 */
export function extractYouTubePlaylistId(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  try {
    const urlObj = new URL(rawUrl.trim().startsWith('http') ? rawUrl.trim() : `https://${rawUrl.trim()}`);
    return urlObj.searchParams.get('list');
  } catch (e) {
    return null;
  }
}

/**
 * Checks whether a given URL is a supported YouTube video URL.
 */
export function isYouTubeVideoUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  const videoId = extractYouTubeVideoId(rawUrl);
  return !!videoId && videoId.length >= 5;
}

/**
 * Cleans and normalizes YouTube URL into canonical format:
 * https://www.youtube.com/watch?v=VIDEO_ID
 *
 * Removes tracking parameters (si, feature, utm_*, gclid, etc.)
 * Preserves Playlist ID if present.
 */
export function cleanCanonicalYouTubeUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  const videoId = extractYouTubeVideoId(rawUrl);
  if (!videoId) return rawUrl.trim();

  const playlistId = extractYouTubePlaylistId(rawUrl);

  let canonical = `https://www.youtube.com/watch?v=${videoId}`;
  if (playlistId) {
    canonical += `&list=${playlistId}`;
  }

  return canonical;
}

/**
 * Generates a timestamped video URL:
 * https://www.youtube.com/watch?v=VIDEO_ID&t=165s
 */
export function getTimestampedYouTubeUrl(rawUrl: string, seconds: number): string {
  const canonical = cleanCanonicalYouTubeUrl(rawUrl);
  if (!canonical) return '';

  if (typeof seconds !== 'number' || isNaN(seconds) || seconds <= 0) {
    return canonical;
  }

  const cleanSeconds = Math.floor(seconds);
  const separator = canonical.includes('?') ? '&' : '?';
  return `${canonical}${separator}t=${cleanSeconds}s`;
}

/**
 * Gets high quality YouTube thumbnail URL.
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  if (!videoId) return '';
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Parses MM:SS or HH:MM:SS timestamp string into total seconds.
 */
export function parseTimestampToSeconds(str: string): number {
  if (!str || typeof str !== 'string') return -1;
  const trimmed = str.trim();
  if (!/^[0-9:]+$/.test(trimmed)) return -1;

  const parts = trimmed.split(':');
  if (parts.length < 2 || parts.length > 3) return -1;
  if (parts.some((p) => p.length === 0 || isNaN(Number(p)))) return -1;

  const nums = parts.map((p) => parseInt(p, 10));

  if (parts.length === 2) {
    const [m, s] = nums;
    if (s < 0 || s > 59 || m < 0) return -1;
    return m * 60 + s;
  } else {
    const [h, m, s] = nums;
    if (s < 0 || s > 59 || m < 0 || m > 59 || h < 0) return -1;
    return h * 3600 + m * 60 + s;
  }
}

/**
 * Formats seconds into MM:SS or HH:MM:SS timestamp string.
 */
export function formatSecondsToTimestamp(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
  const sec = Math.floor(totalSeconds);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}
