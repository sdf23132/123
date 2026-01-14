
import React from 'react';

interface FooterProps {
  onLinkClick: () => void;
  onAdminTrigger?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onAdminTrigger }) => {
  return (
    <footer className="bg-[#080b13] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">ZenithNode</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              Nền tảng kiếm tiền thụ động hàng đầu thế giới. Chia sẻ giá trị, nhận thưởng xứng đáng.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Sản phẩm</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={onLinkClick} className="hover:text-indigo-400 transition-colors text-left">Tải cho Android</button></li>
              <li><button onClick={onLinkClick} className="hover:text-indigo-400 transition-colors text-left">Hệ thống Node</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={onLinkClick} className="hover:text-indigo-400 transition-colors text-left">Trung tâm trợ giúp</button></li>
              <li><button onClick={onLinkClick} className="hover:text-indigo-400 transition-colors text-left">Liên hệ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Admin</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={onAdminTrigger} className="hover:text-indigo-400 transition-colors text-left text-xs opacity-20">Quản lý APK (Admin)</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2024 Zenith Node Inc. Đã đăng ký bản quyền.
          </p>
          <div className="flex gap-6 text-slate-600 text-sm">
            <span>Sản xuất với ❤️ từ Zenith Team</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Hệ thống hoạt động bình thường
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
