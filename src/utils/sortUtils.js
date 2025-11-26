/**
 * Utility functions for sorting songs
 */

/**
 * Removes leading articles from a title for proper alphabetical sorting
 * Handles Portuguese articles: "A", "O", "Os", "As", "Um", "Uma"
 * Handles English articles: "A", "An", "The"
 * 
 * @param {string} title - The song title
 * @returns {string} - The title without leading articles
 * 
 * @example
 * stripArticles("A Casa") // returns "Casa"
 * stripArticles("The House") // returns "House"
 * stripArticles("Os Sonhos") // returns "Sonhos"
 */
export function stripArticles(title) {
    if (!title || typeof title !== 'string') return '';

    // List of articles to remove (case-insensitive)
    // Portuguese: A, O, Os, As, Um, Uma
    // English: A, An, The
    const articles = /^(A|O|Os|As|Um|Uma|An|The)\s+/i;

    return title.replace(articles, '').trim();
}

/**
 * Compares two song titles for sorting, ignoring leading articles
 * 
 * @param {string} titleA - First title
 * @param {string} titleB - Second title
 * @returns {number} - Negative if A < B, positive if A > B, 0 if equal
 */
export function compareTitles(titleA, titleB) {
    const a = stripArticles(titleA).toLowerCase();
    const b = stripArticles(titleB).toLowerCase();

    return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
}

/**
 * Sort an array of songs by title, ignoring leading articles
 * 
 * @param {Array<object>} songs - Array of song objects with a 'title' property
 * @returns {Array<object>} - Sorted array (does not mutate original)
 */
export function sortSongsByTitle(songs) {
    return [...songs].sort((a, b) => compareTitles(a.title, b.title));
}
