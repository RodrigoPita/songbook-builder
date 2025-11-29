/**
 * Normalizes text by removing diacritics (accents) and converting to lowercase
 * This allows accent-insensitive search
 * 
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text without accents
 * 
 * @example
 * normalizeText("adoração") // returns "adoracao"
 * normalizeText("Espírito Santo") // returns "espirito santo"
 */
export function normalizeText(text) {
    if (!text || typeof text !== 'string') return '';

    return text
        .toLowerCase()
        .normalize('NFD') // Decompose characters with diacritics
        .replace(/[\u0300-\u036f]/g, ''); // Remove diacritic marks
}

/**
 * Check if a search term matches a text field (accent-insensitive)
 * 
 * @param {string} text - Text to search in
 * @param {string} searchTerm - Term to search for
 * @returns {boolean} - Whether the search term is found
 */
export function matchesSearch(text, searchTerm) {
    return normalizeText(text).includes(normalizeText(searchTerm));
}
