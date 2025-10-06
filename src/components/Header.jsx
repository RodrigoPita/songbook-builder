import { Music, ListOrdered, X } from 'lucide-react';

/**
 * Renders the main application header.
 * It includes the app title, a button to toggle the sidebar on mobile,
 * and displays the current user ID.
 * @param {object} props - The component props.
 * @param {boolean} props.isSidebarOpen - The current visibility state of the sidebar.
 * @param {Function} props.onToggleSidebar - Function to call when the sidebar toggle button is clicked.
 * @param {string|null} props.userId - The ID of the currently logged-in user.
 */
const Header = ({ isSidebarOpen, onToggleSidebar, userId }) => {
    return (
        <header className="bg-white shadow-md p-4 print:hidden flex justify-between items-center sticky top-0 z-20">
            {/* Left side: Toggle button and App Title */}
            <div className="flex items-center">
                
                {/* Sidebar Toggle Button (visible on mobile) */}
                <button
                    className="lg:hidden p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition duration-150 mr-2"
                    onClick={onToggleSidebar}
                    aria-label="Toggle navigation menu" // Added for accessibility
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <ListOrdered className="w-6 h-6" />}
                </button>
                
                <h1 className="text-xl sm:text-2xl font-bold text-emerald-700">
                    <Music className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Songbook Creator
                </h1>
            </div>

            {/* Right side: User ID display */}
            {userId && (
                <p className="hidden sm:block text-xs text-gray-400">User: {userId}</p>
            )}
        </header>
    );
};

export default Header;
