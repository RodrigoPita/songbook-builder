import { useState } from 'react';
import { Download, Plus, Minus, FileText, FileDown } from 'lucide-react';
import { processChordProSimple } from '../utils/chordProcessor';
import { getTargetKeyFromShift } from '../utils/transposition';

const DEFAULT_CHORDPRO = `{title: New Song}
{artist: Artist Name}
{key: C}
{tags: genre}

{start_of_chorus}
[C]Sample lyric with [Am]chords above
[F]Another line with [G]more chords
{end_of_chorus}

[C]Regular verse [Am]line here
[F]Add your own [G]lyrics and chords`;

const ChartEditor = () => {
    const [chordProText, setChordProText] = useState(DEFAULT_CHORDPRO);
    const [semitoneShift, setSemitoneShift] = useState(0);

    // Extract metadata from ChordPro content
    const extractMetadata = (content) => {
        const metadata = {
            title: 'Untitled',
            artist: '',
            key: 'C'
        };

        const lines = content.split('\n');
        lines.forEach(line => {
            const titleMatch = line.match(/\{title:\s*(.+)\}/i);
            const artistMatch = line.match(/\{artist:\s*(.+)\}/i);
            const keyMatch = line.match(/\{key:\s*([A-G][#b]?m?)\}/i);

            if (titleMatch) metadata.title = titleMatch[1].trim();
            if (artistMatch) metadata.artist = artistMatch[1].trim();
            if (keyMatch) metadata.key = keyMatch[1].trim();
        });

        return metadata;
    };

    const metadata = extractMetadata(chordProText);
    const targetKey = getTargetKeyFromShift(metadata.key, semitoneShift);
    const shiftText = semitoneShift === 0 ? "Original" : (semitoneShift > 0 ? `+${semitoneShift}` : `${semitoneShift}`);

    // Handle transpose
    const handleTranspose = (delta) => {
        setSemitoneShift(prev => {
            const newShift = prev + delta;
            // Limit to -11 to +11 (full octave range)
            return Math.max(-11, Math.min(11, newShift));
        });
    };

    // Handle download .cho file
    const handleDownload = () => {
        const blob = new Blob([chordProText], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.cho`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    // Handle PDF export
    const handleExportPdf = async () => {
        try {
            const previewElement = document.getElementById('chart-preview');
            if (!previewElement) {
                throw new Error('Preview content not found');
            }

            const exportButton = document.querySelector('[data-export-pdf-button]');
            if (exportButton) {
                exportButton.textContent = 'Gerando PDF...';
                exportButton.disabled = true;
            }

            // Clone and prepare HTML
            const clone = previewElement.cloneNode(true);

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

            const GOTENBERG_URL = import.meta.env.VITE_GOTENBERG_URL || '/api/gotenberg';
            const GOTENBERG_API_KEY = import.meta.env.VITE_GOTENBERG_API_KEY;

            const formData = new FormData();
            const htmlBlob = new Blob([fullHtml], { type: 'text/html' });
            formData.append('files', htmlBlob, 'index.html');
            formData.append('preferCssPageSize', 'true');
            formData.append('printBackground', 'true');

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

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('PDF export error:', error);
            alert('Erro ao gerar PDF. Por favor, tente novamente.');
        } finally {
            const exportButton = document.querySelector('[data-export-pdf-button]');
            if (exportButton) {
                exportButton.textContent = 'Exportar PDF';
                exportButton.disabled = false;
            }
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-emerald-700 flex items-center">
                        <FileText className="w-6 h-6 mr-2" />
                        Chart Editor
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Create and test ChordPro charts with live preview
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col max-w-7xl mx-auto w-full p-4">
                {/* Controls */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-wrap gap-4 items-center justify-between">
                    {/* Transpose Controls */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Transpose:</span>
                        <button
                            onClick={() => handleTranspose(-1)}
                            className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition"
                            title="Transpose down"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="min-w-[100px] text-center">
                            <span className="font-bold text-emerald-600">{targetKey}</span>
                            <span className="text-xs text-gray-500 ml-1">({shiftText})</span>
                        </span>
                        <button
                            onClick={() => handleTranspose(1)}
                            className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition"
                            title="Transpose up"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setSemitoneShift(0)}
                            className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow"
                        >
                            <FileDown className="w-4 h-4" />
                            Download .cho
                        </button>
                        <button
                            onClick={handleExportPdf}
                            data-export-pdf-button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow"
                        >
                            <Download className="w-4 h-4" />
                            Exportar PDF
                        </button>
                    </div>
                </div>

                {/* Split Screen Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
                    {/* Left Panel - Editor */}
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col overflow-hidden">
                        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center flex-shrink-0">
                            <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                            ChordPro Editor
                        </h2>
                        <textarea
                            value={chordProText}
                            onChange={(e) => setChordProText(e.target.value)}
                            className="w-full flex-1 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                            style={{ zoom: '0.85' }}
                            placeholder="Enter ChordPro format here..."
                            spellCheck={false}
                        />
                        <div className="mt-2 text-xs text-gray-500 flex-shrink-0">
                            <p>Supported directives: {'{title: ...}'}, {'{artist: ...}'}, {'{key: ...}'}, {'{start_of_chorus}'}, {'{end_of_chorus}'}</p>
                            <p>Chord format: [C], [Am7], [G/B]</p>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col overflow-hidden">
                        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center flex-shrink-0">
                            <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                            Live Preview
                        </h2>
                        <div
                            id="chart-preview"
                            className="border border-gray-200 rounded-lg p-6 flex-1 overflow-y-auto bg-gray-50"
                            style={{ zoom: '0.8' }}
                        >
                            {/* Song Header */}
                            <div className="mb-4 pb-3 border-b border-gray-300">
                                <h3 className="text-2xl font-extrabold text-gray-800">
                                    {metadata.title}
                                    {metadata.artist && (
                                        <span className="text-xl font-normal text-gray-600 ml-2">
                                            ({metadata.artist})
                                        </span>
                                    )}
                                </h3>
                                <p className="text-xs font-medium text-gray-500 mt-1">
                                    <span className="font-semibold text-emerald-600">Tom Atual:</span>
                                    <span className="font-bold ml-1">{targetKey}</span>
                                    <span className="text-gray-300 mx-1">|</span>
                                    <span>Original: {metadata.key} ({shiftText})</span>
                                </p>
                            </div>

                            {/* Song Content */}
                            <div className="text-sm leading-relaxed">
                                {processChordProSimple(chordProText, metadata.key, semitoneShift)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartEditor;
