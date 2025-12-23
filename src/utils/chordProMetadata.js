/**
 * Extract metadata from ChordPro content
 * Matches the format used in scripts/syncSongs.js
 */
export function extractMetadata(content, filename = '') {
  const titleMatch = content.match(/\{title:\s*([^}]+)\}/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const artistMatch = content.match(/\{artist:\s*([^}]+)\}/i);
  const artist = artistMatch ? artistMatch[1].trim() : '';

  const tagsMatch = content.match(/\{tags:\s*([^}]+)\}/i);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
  }

  // Generate ID from filename or title
  const id = filename
    ? filename.replace('.cho', '')
    : title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  return {
    id,
    title,
    artist,
    filename: filename || `${id}.cho`,
    tags
  };
}

/**
 * Generate a filename from a title
 */
export function generateFilename(title) {
  if (!title || !title.trim()) {
    return `untitled_${Date.now()}.cho`;
  }
  return `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.cho`;
}
