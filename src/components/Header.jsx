import { Music, ListOrdered, X } from 'lucide-react';

/**
 * Renders the main application header with sidebar toggle.
 */
const Header = ({ isSidebarOpen, onToggleSidebar }) => {
    return (
        <header className="bg-white shadow-md p-4 print:hidden flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center">
                <button
                    className="lg:hidden p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition duration-150 mr-2"
                    onClick={onToggleSidebar}
                    aria-label="Toggle navigation menu"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <ListOrdered className="w-6 h-6" />}
                </button>

                <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">
                    <Music className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Songbook Creator
                </h1>
            </div>
        </header>
    );
};

export default Header;
