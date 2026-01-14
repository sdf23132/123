
import React, { useRef } from 'react';

interface HeaderProps {
  isScrolled: boolean;
  onAuthClick: () => void;
  onLogoLongPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, onAuthClick, onLogoLongPress }) => {
  const timerRef = useRef<any>(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      onLogoLongPress?.();
    }, 3000); // Nhấn giữ 3 giây để mở Admin
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0b0f1a]/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none" 
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight">Zenith<span className="text-indigo-500">Node</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-400 hover:text-white transition-colors font-medium">Tính năng</a>
          <a href="#calculator" className="text-slate-400 hover:text-white transition-colors font-medium">Ước tính</a>
          <a href="#download" className="text-slate-400 hover:text-white transition-colors font-medium">Tải App</a>
          <a href="#faq" className="text-slate-400 hover:text-white transition-colors font-medium">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAuthClick}
            className="hidden sm:block text-slate-300 hover:text-white font-medium transition-colors"
          >
            Đăng nhập
          </button>
          <button 
            onClick={onAuthClick}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30"
          >
            Bắt đầu ngay
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
