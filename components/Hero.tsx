
import React from 'react';
import { ApkInfo } from '../App';

interface HeroProps {
  onStartClick: () => void;
  apkInfo: ApkInfo;
}

const Hero: React.FC<HeroProps> = ({ onStartClick, apkInfo }) => {
  const handleDownload = () => {
    // Nếu có localBlob (vừa chọn file trong Admin), dùng nó để tải ngay. 
    // Nếu không, dùng URL mặc định (thường là /app.apk trên server)
    const downloadUrl = apkInfo.localBlob || apkInfo.url.trim();
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = apkInfo.fileName || 'ZenithNode_v' + apkInfo.version + '.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative pt-36 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow -z-10 opacity-60"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-indigo-300 text-xs font-bold tracking-widest uppercase">New Release: v{apkInfo.version}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1] mb-8 tracking-tighter">
            Treo Máy Thả Ga <br />
            <span className="gradient-text">Tiền Về Đầy Túi</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Biến tài nguyên mạng nhàn rỗi thành nguồn thu nhập thụ động bền vững. Tải ứng dụng và bắt đầu ngay hôm nay.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-2xl hover:bg-indigo-500 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-center gap-4 group active:scale-95 border-b-4 border-indigo-800"
            >
              <svg className="w-8 h-8 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              TẢI APK ({apkInfo.size})
            </button>
            <button 
              onClick={onStartClick}
              className="w-full sm:w-auto px-10 py-6 bg-slate-800/40 text-white rounded-3xl font-bold text-xl hover:bg-slate-800 transition-all border border-slate-700 backdrop-blur-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Mở Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
