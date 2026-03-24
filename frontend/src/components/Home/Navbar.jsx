import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { APP_NAME } from '../../utils/data';

const Navbar = ({ onLogout, isLoading = false }) => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
            <div className="mx-auto max-w-5xl px-3 sm:px-4 py-3">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-none">
                        <img src="/favicon.svg" alt="AI Study Assistant" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"/>
                        <div className="leading-tight min-w-0">
                            <div className="text-medium sm:text-medium font-semibold truncate">{APP_NAME}</div>
                            <div className="text-xs text-zinc-400">Notes. Graphs. PDFs.</div>
                        </div>
                    </div>

                    {/* Navigation Links - Desktop */}
                    {/* dont show while in /history and while loading*/}
                    {window.location.pathname !== "/history" && !isLoading && (
                        <div className="hidden md:flex items-center gap-6">
                            <button
                                onClick={() => navigate("/history")}
                                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                History
                            </button>
                        </div>
                    )}

                    {/* User Info - Desktop */}
                    <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0">
                        {user && (
                            <div className="flex items-center gap-2">
                                {/* Credits Pill */}
                                <div className="rounded-full backdrop-blur-md bg-linear-to-r from-amber-400/20 to-orange-400/20 border border-amber-300/30 px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-linear-to-r hover:from-amber-400/30 hover:to-orange-400/30 transition-all">
                                    <p className="text-xs sm:text-sm font-semibold bg-linear-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent whitespace-nowrap">{user.credits || 0} ✨</p>
                                </div>
                                {/* Username Initial Circle */}
                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full backdrop-blur-md bg-linear-to-br from-blue-400/30 to-cyan-300/30 border border-blue-300/40 flex items-center justify-center shrink-0 hover:from-blue-400/40 hover:to-cyan-300/40 transition-all cursor-pointer">
                                    <span className="text-xs sm:text-sm font-bold bg-linear-to-br from-blue-100 to-cyan-100 bg-clip-text text-transparent">{(user.name || 'U')[0].toUpperCase()}</span>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={onLogout}
                            className="rounded-lg bg-red-500 px-2 sm:px-3 py-1 text-xs sm:text-sm text-white hover:bg-red-400 transition-colors whitespace-nowrap"
                        >
                            Logout
                        </button>
                    </div>

                    {/* User Avatar - Mobile Only */}
                    <div className="sm:hidden shrink-0">
                        {user && (
                            <div className="h-8 w-8 rounded-full backdrop-blur-md bg-linear-to-br from-blue-400/30 to-cyan-300/30 border border-blue-300/40 flex items-center justify-center hover:from-blue-400/40 hover:to-cyan-300/40 transition-all cursor-pointer">
                                <span className="text-xs font-bold bg-linear-to-br from-blue-100 to-cyan-100 bg-clip-text text-transparent">{(user.name || 'U')[0].toUpperCase()}</span>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3">
                        {window.location.pathname !== "/history" && !isLoading && (
                            <button
                                onClick={() => { navigate("/history"); setIsMenuOpen(false); }}
                                className="block w-full text-left px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                            >
                                History
                            </button>
                        )}
                        {user && (
                            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">Credits</span>
                                    <span className="text-sm font-semibold text-amber-300">{user.credits || 0} ✨</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">User</span>
                                    <span className="text-sm font-semibold text-white">{user.name || 'User'}</span>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => { onLogout(); setIsMenuOpen(false); }}
                            className="block w-full px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar