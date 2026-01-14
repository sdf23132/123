
import React from 'react';
import { ApkInfo } from '../App';

interface PlatformsProps {
  apkInfo: ApkInfo;
}

const Platforms: React.FC<PlatformsProps> = ({ apkInfo }) => {
  const handleDirectDownload = () => {
    const url = apkInfo.url.trim();
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = `ZenithNode_v${apkInfo.version}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl">🤖</div>
            <div>
              <h2 className="text-3xl font-bold text-white">Tải cho Android</h2>
              <p className="text-slate-500">Phiên bản: {apkInfo.version} (APK)</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#0b0f1a] rounded-2xl border border-white/5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Kích thước file</span>
                <span className="text-white font-bold">{apkInfo.size}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Yêu cầu hệ thống</span>
                <span className="text-white font-bold">Android 7.0+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Cập nhật lần cuối</span>
                <span className="text-white font-bold">{apkInfo.updatedAt}</span>
              </div>
            </div>

            <button 
              onClick={handleDirectDownload}
              className="w-full py-5 rounded-2xl font-bold text-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14V9h2v7h-2zm0-9h2v2h-2V7z" />
              </svg>
              TẢI APK TRỰC TIẾP
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white">Hướng dẫn cài đặt APK</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-bold flex-shrink-0">1</div>
              <div>
                <p className="text-white font-bold mb-1">Tải file APK</p>
                <p className="text-slate-400 text-sm">Nhấn nút tải và cho phép trình duyệt tải file về máy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-bold flex-shrink-0">2</div>
              <div>
                <p className="text-white font-bold mb-1">Cấp quyền cài đặt</p>
                <p className="text-slate-400 text-sm">Mở file đã tải, nếu hiện cảnh báo hãy cho phép "Cài đặt từ nguồn không xác định".</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-bold flex-shrink-0">3</div>
              <div>
                <p className="text-white font-bold mb-1">Bắt đầu kiếm tiền</p>
                <p className="text-slate-400 text-sm">Mở app, đăng nhập và nhấn "Bắt đầu" để hệ thống chạy ngầm.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
