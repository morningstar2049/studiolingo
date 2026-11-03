// Pull the 11-char video id out of any common YouTube link — watch, youtu.be,
// shorts, or an already-embedded one — so a link copied straight from the
// YouTube share button works wherever a video is pasted in Sanity.
export function getYoutubeId(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // A bare id pasted on its own.
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}
