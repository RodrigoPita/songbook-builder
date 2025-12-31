import { useState, useRef } from 'react';
import { Download, Plus, Minus, FileText, FileDown, Upload, Save, LogIn, LogOut } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { processChordProSimple } from '../utils/chordProcessor';
import { getTargetKeyFromShift } from '../utils/transposition';
import { extractMetadata, generateFilename } from '../utils/chordProMetadata';

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
    const { user, signInWithGoogle, signOut, isAdmin } = useAuth();
    const [chordProText, setChordProText] = useState(DEFAULT_CHORDPRO);
    const [semitoneShift, setSemitoneShift] = useState(0);
    const [saving, setSaving] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [targetCollection, setTargetCollection] = useState('songs'); // 'songs' or 'repertoire'
    const fileInputRef = useRef(null);

    // Extract key for transposition
    const extractKey = (content) => {
        const keyMatch = content.match(/\{key:\s*([A-G][#b]?m?)\}/i);
        return keyMatch ? keyMatch[1].trim() : 'C';
    };

    const metadata = extractMetadata(chordProText);
    const songKey = extractKey(chordProText);
    const targetKey = getTargetKeyFromShift(songKey, semitoneShift);
    const shiftText = semitoneShift === 0 ? "Original" : (semitoneShift > 0 ? `+${semitoneShift}` : `${semitoneShift}`);

    // Handle transpose
    const handleTranspose = (delta) => {
        setSemitoneShift(prev => {
            const newShift = prev + delta;
            // Limit to -11 to +11 (full octave range)
            return Math.max(-11, Math.min(11, newShift));
        });
    };

    // Handle file upload (load .cho file into editor)
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith('.cho')) {
            alert('Please upload a .cho file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            if (typeof content === 'string') {
                setChordProText(content);
                setSemitoneShift(0);
                setUploadMessage('File loaded successfully!');
                setTimeout(() => setUploadMessage(''), 3000);
            }
        };
        reader.readAsText(file);
    };

    // Handle download .cho file
    const handleDownload = () => {
        const blob = new Blob([chordProText], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = generateFilename(metadata.title);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    // Handle save to Firebase (admin only)
    const handleSaveToFirebase = async () => {
        if (!user || !isAdmin()) {
            alert('You must be logged in as admin to save to Firebase');
            return;
        }

        if (!metadata.title || metadata.title.trim() === '') {
            alert('Please add a title to your song using {title: Song Name}');
            return;
        }

        try {
            setSaving(true);
            const collectionName = targetCollection === 'songs' ? 'Vozes De Hipona' : 'My Repertoire';
            setUploadMessage(`Saving to ${collectionName}...`);

            const filename = metadata.filename;
            const contentBuffer = new Blob([chordProText], { type: 'text/plain; charset=utf-8' });

            // Determine storage folder based on collection
            const storageFolder = targetCollection === 'songs' ? 'charts' : 'repertoire';

            // Upload to Firebase Storage
            const storageRef = ref(storage, `${storageFolder}/${filename}`);
            await uploadBytes(storageRef, contentBuffer, {
                contentType: 'text/plain; charset=utf-8',
                customMetadata: {
                    songId: metadata.id,
                    title: metadata.title
                }
            });

            // Get public URL
            const publicUrl = await getDownloadURL(storageRef);

            // Save to Firestore in the selected collection
            await setDoc(doc(db, targetCollection, metadata.id), {
                title: metadata.title,
                artist: metadata.artist,
                tags: metadata.tags,
                filename: filename,
                fileUrl: publicUrl,
                updatedAt: new Date()
            }, { merge: true });

            setUploadMessage(`✅ Saved to ${collectionName} successfully!`);
            setTimeout(() => setUploadMessage(''), 5000);

        } catch (error) {
            console.error('Error saving to Firebase:', error);
            setUploadMessage(`❌ Error: ${error.message}`);
            setTimeout(() => setUploadMessage(''), 5000);
        } finally {
            setSaving(false);
        }
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
            const pdfFilename = generateFilename(metadata.title).replace('.cho', `.pdf`);
            a.download = pdfFilename;
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
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-emerald-700 flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Chart Editor
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Create and test ChordPro charts with live preview
                        </p>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                {isAdmin() && (
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                                        Admin
                                    </span>
                                )}
                                <span className="text-sm text-gray-600">{user.email}</span>
                                <button
                                    onClick={signOut}
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={signInWithGoogle}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-300 hover:border-emerald-500 text-gray-700 transition"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col max-w-7xl mx-auto w-full p-4">
                {/* Controls */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 space-y-4">
                    {/* Collection Selector (Admin Only) */}
                    {user && isAdmin() && (
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                            <span className="text-sm font-semibold text-gray-700">Save to:</span>
                            <select
                                value={targetCollection}
                                onChange={(e) => setTargetCollection(e.target.value)}
                                className="px-4 py-2 rounded-lg border-2 border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold focus:border-emerald-500 focus:outline-none transition cursor-pointer"
                            >
                                <option value="songs">Vozes De Hipona</option>
                                <option value="repertoire">My Repertoire</option>
                            </select>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 items-center justify-between">
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
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".cho"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition shadow"
                            >
                                <Upload className="w-4 h-4" />
                                Upload .cho
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow"
                            >
                                <FileDown className="w-4 h-4" />
                                Download .cho
                            </button>
                            {user && isAdmin() && (
                                <button
                                    onClick={handleSaveToFirebase}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save to Firebase'}
                                </button>
                            )}
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

                    {/* Status Message */}
                    {uploadMessage && (
                        <div className={`p-3 rounded-lg text-sm font-medium ${
                            uploadMessage.includes('✅')
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : uploadMessage.includes('❌')
                                ? 'bg-red-50 text-red-800 border border-red-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>
                            {uploadMessage}
                        </div>
                    )}
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
                        <div className="flex-1 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg">
                            {/* Inner container with zoom to simulate main app width in split view */}
                            <div
                                id="chart-preview"
                                className="p-3 sm:p-4 lg:p-6"
                                style={{ zoom: '0.65' }}
                            >
                                <div className="max-w-4xl mx-auto">
                                    {/* Song Header */}
                                    <div className="mb-3 sm:mb-4 pb-2 border-b border-gray-200 print:border-b-0">
                                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 leading-tight break-words">
                                            {metadata.title}
                                            {metadata.artist && (
                                                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-gray-600 ml-2">
                                                    ({metadata.artist})
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 flex flex-wrap items-center gap-1">
                                            <span className="font-semibold text-emerald-600">Tom Atual:</span>
                                            <span className="font-bold">{targetKey}</span>
                                            <span className="text-gray-300">|</span>
                                            <span>Original: {songKey} ({shiftText})</span>
                                        </p>
                                    </div>

                                    {/* Song Content */}
                                    <div className="text-sm sm:text-base leading-relaxed">
                                        {processChordProSimple(chordProText, songKey, semitoneShift)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartEditor;
