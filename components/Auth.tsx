
import React, { useState } from 'react';

export interface UserData {
  username: string;
}

interface AuthProps {
  initialMode: 'login' | 'register';
  onAuthSuccess: (user: UserData) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ initialMode, onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Giả lập xử lý backend bằng LocalStorage
    setTimeout(() => {
      const usersRaw = localStorage.getItem('zenith_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Mật khẩu xác nhận không khớp!');
          setLoading(false);
          return;
        }
        if (users.find((u: any) => u.username === formData.username)) {
          setError('Tên đăng nhập đã tồn tại!');
          setLoading(false);
          return;
        }

        const newUser = { 
          username: formData.username, 
          password: formData.password 
        };
        users.push(newUser);
        localStorage.setItem('zenith_users', JSON.stringify(users));
        onAuthSuccess({ username: newUser.username });
      } else {
        const user = users.find((u: any) => u.username === formData.username && u.password === formData.password);
        if (!user) {
          setError('Tên đăng nhập hoặc mật khẩu không đúng!');
          setLoading(false);
          return;
        }
        onAuthSuccess({ username: user.username });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

      <div className="w-full max-w-md">
        <div className="bg-[#161b2c]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          
          <button onClick={onBack} className="absolute top-6 left-6 text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="p-8 pt-12 text-center">
             <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 mx-auto mb-6">
                <span className="text-white font-black text-3xl italic">Z</span>
             </div>
             <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                {mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
             </h2>
             <p className="text-slate-500 text-sm font-medium">Bắt đầu kiếm tiền thụ động ngay hôm nay.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-4">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center animate-in fade-in zoom-in duration-300">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Tên đăng nhập</label>
              <input 
                required
                type="text" 
                placeholder="VD: zenit_user99"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 text-white transition-all" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Mật khẩu</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 text-white" 
              />
            </div>

            {mode === 'register' && (
              <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Xác nhận mật khẩu</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-500 text-white" 
                />
              </div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 shadow-indigo-600/30 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                mode === 'login' ? 'ĐĂNG NHẬP NGAY' : 'ĐĂNG KÝ TÀI KHOẢN'
              )}
            </button>
          </form>

          <div className="p-8 pt-0 text-center">
             <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-slate-400 text-sm font-bold hover:text-indigo-400 transition-colors"
             >
                {mode === 'login' ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
