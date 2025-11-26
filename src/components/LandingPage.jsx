import { Link } from 'react-router-dom';
import { BookOpen, Music2 } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                    <Music2 className="w-16 h-16 text-emerald-600" />
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    Songbook Creator
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Create, transpose, and export beautiful PDF songbooks
                </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Vozes de Hipona Card */}
                <Link
                    to="/vozes-de-hipona"
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-emerald-200 hover:border-emerald-400"
                >
                    <div className="flex items-center justify-between mb-4">
                        <BookOpen className="w-12 h-12 text-emerald-600" />
                        <svg className="w-6 h-6 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Vozes de Hipona
                    </h2>

                    <p className="text-gray-600 text-lg mb-6">
                        Browse and create songbooks from our collection of worship songs, hymns, and gospel music.
                    </p>

                    <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Open Songbook
                        <span className="ml-2 text-2xl">→</span>
                    </div>
                </Link>

                {/* Repertoire Card */}
                <Link
                    to="/repertoire"
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Music2 className="w-12 h-12 text-purple-600" />
                        <svg className="w-6 h-6 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        My Repertoire
                    </h2>

                    <p className="text-gray-600 text-lg mb-6">
                        Access your personal collection of songs across different genres and styles.
                    </p>

                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Open Repertoire
                        <span className="ml-2 text-2xl">→</span>
                    </div>
                </Link>
            </div>

            {/* Footer */}
            <div className="mt-16 text-center text-gray-500">
                <p className="text-sm">
                    Built with ❤️ for musicians and worship leaders
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
