import { useState, useEffect } from 'react';
import { useSongbook } from '../hooks/useSongbook';
import Header from './Header';
import Sidebar from './Sidebar';
import SongbookPreview from './SongbookPreview';
import ReorderPanel from './ReorderPanel';

/**
 * Standalone songbook view component.
 * Each category (vozes-de-hipona, repertoire) renders independently with no cross-navigation.
 */
const SongbookView = ({ category }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isReorderPanelOpen, setIsReorderPanelOpen] = useState(false);

    const {
        selectedSongs,
        semitoneShift,
        searchTerm,
        setSearchTerm,
        toggleSongSelection,
        handleShiftChange,
        reorderSongs,
        filteredSongs,
        loading,
        error,
        reloadSongs
    } = useSongbook(category);

    // Handler for removing a song from the preview
    const handleRemoveSong = (songId) => {
        toggleSongSelection(songId);
    };

    // Handler for reordering songs
    const handleReorder = (newOrder) => {
        reorderSongs(newOrder);
    };

    // Determine title based on category
    const pageTitle = category === 'repertoire' ? 'Repertoire' : 'Vozes de Hipona';

    // Update document title for browser tab and print headers
    useEffect(() => {
        document.title = pageTitle;

        // Reset to default on unmount
        return () => {
            document.title = 'Songbook Creator';
        };
    }, [pageTitle]);

    // Handler for PDF export with Gotenberg API
    const handleExportPdf = async () => {
        try {
            // Get the complete HTML of the songbook
            const songbookElement = document.getElementById('songbook-preview');
            if (!songbookElement) {
                throw new Error('Songbook content not found');
            }

            // Show loading message
            const exportButton = document.querySelector('[data-export-button]');
            if (exportButton) {
                exportButton.textContent = 'Gerando PDF...';
                exportButton.disabled = true;
            }

            // Clone and prepare HTML for PDF
            const clone = songbookElement.cloneNode(true);

            // Remove elements with print:hidden class
            clone.querySelectorAll('[class*="print:hidden"]').forEach(el => el.remove());

            // Get all styles
            const styles = Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules)
                            .map(rule => rule.cssText)
                            .join('\n');
                    } catch (e) {
                        return '';
                    }
                })
                .join('\n');

            // Create complete HTML document
            const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>${styles}</style>
                </head>
                <body style="margin: 0; padding: 1cm;">
                    ${clone.innerHTML}
                </body>
                </html>
            `;

            // Gotenberg API Configuration
            // In development, use Vite proxy (/api/gotenberg)
            // In production, use environment variable pointing to Cloud Run
            const GOTENBERG_URL = import.meta.env.VITE_GOTENBERG_URL || '/api/gotenberg';
            const GOTENBERG_API_KEY = import.meta.env.VITE_GOTENBERG_API_KEY;

            // Create FormData for Gotenberg
            const formData = new FormData();
            const htmlBlob = new Blob([fullHtml], { type: 'text/html' });
            formData.append('files', htmlBlob, 'index.html');

            // Let CSS @page rules define the paper size and margins
            formData.append('preferCssPageSize', 'true');
            formData.append('printBackground', 'true');

            // Prepare headers
            const headers = {};
            if (GOTENBERG_API_KEY) {
                headers['X-API-Key'] = GOTENBERG_API_KEY;
            }

            const response = await fetch(`${GOTENBERG_URL}/forms/chromium/convert/html`, {
                method: 'POST',
                headers: headers,
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => '');
                console.error('Gotenberg Error:', errorText);
                throw new Error(`PDF generation failed: ${response.statusText}`);
            }

            // Download PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${pageTitle}-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('PDF export error:', error);
            alert('Erro ao gerar PDF. Por favor, tente novamente.');
        } finally {
            // Reset button
            const exportButton = document.querySelector('[data-export-button]');
            if (exportButton) {
                exportButton.textContent = 'Exportar PDF';
                exportButton.disabled = false;
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading songbook...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error loading songs</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={reloadSongs}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Try again
                    </button>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Tips:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Check if Firestore collection exists</li>
                            <li>• Check if .cho files are in Firebase Storage</li>
                            <li>• Check the browser console for more details</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                title={pageTitle}
            />
            <div className="flex flex-1 relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    songs={filteredSongs}
                    selectedSongIds={selectedSongs.map(song => song.id)}
                    onToggleSong={toggleSongSelection}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <SongbookPreview
                    songs={selectedSongs}
                    semitoneShift={semitoneShift}
                    onShiftChange={handleShiftChange}
                    onRemoveSong={handleRemoveSong}
                    onOpenReorder={() => setIsReorderPanelOpen(true)}
                    onExportPdf={handleExportPdf}
                />
            </div>

            {/* Reorder Panel */}
            <ReorderPanel
                isOpen={isReorderPanelOpen}
                onClose={() => setIsReorderPanelOpen(false)}
                songs={selectedSongs}
                onReorder={handleReorder}
            />
        </div>
    );
};

export default SongbookView;
