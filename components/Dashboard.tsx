
import React, { useState, useEffect, useRef } from 'react';
import { UserData } from './Auth';

interface DashboardProps {
  onLogout: () => void;
  earningRate: number; // VNĐ/giờ
  user: UserData;
}

interface LogEntry {
  id: string;
  time: string;
  msg: string;
  type: 'info' | 'success' | 'warning';
}

interface DailyEarning {
  date: string;
  amount: number;
}

const VN_BANKS = [
  "Vietcombank (VCB)", "Agribank", "BIDV", "VietinBank", "MB Bank", "Techcombank", "ACB", "VPBank", "TPBank", "Sacombank", "CAKE", "TIMO"
];

const Dashboard: React.FC<DashboardProps> = ({ onLogout, earningRate, user }) => {
  // Key riêng cho mỗi user để không bị lẫn số dư
  const USER_KEY = user.username;
  const STORAGE_KEY_BALANCE = `zenith_balance_${USER_KEY}`;
  const STORAGE_KEY_STATUS = `zenith_status_${USER_KEY}`;
  const STORAGE_KEY_HISTORY = `zenith_history_${USER_KEY}`;
  const STORAGE_KEY_LAST_UPDATE = `zenith_last_upd_${USER_KEY}`;

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BALANCE);
    return saved ? parseFloat(saved) : 0.00;
  });
  
  const [isMining, setIsMining] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATUS);
    return saved === 'true';
  });

  const [history, setHistory] = useState<DailyEarning[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (saved) return JSON.parse(saved);
    
    const cleanHistory: DailyEarning[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      cleanHistory.push({
        date: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        amount: 0
      });
    }
    return cleanHistory;
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [nodes] = useState(3);
  const [isJumping, setIsJumping] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<'form' | 'processing' | 'success'>('form');
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawData, setWithdrawData] = useState({ 
    method: 'bank', bankName: VN_BANKS[0], account: '', fullName: '', amount: '' 
  });
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  const formatVNDClean = (amount: number) => Math.floor(amount).toLocaleString('vi-VN');
  const formatVNDLive = (amount: number) => amount.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const updateHistoryDelta = (delta: number) => {
    if (delta <= 0) return;
    const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    setHistory(prev => {
      const newHistory = [...prev];
      const todayIdx = newHistory.findIndex(h => h.date === todayStr);
      if (todayIdx !== -1) {
        newHistory[todayIdx].amount += delta;
      } else {
        newHistory.shift();
        newHistory.push({ date: todayStr, amount: delta });
      }
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  useEffect(() => {
    if (isMining) {
      const lastUpdate = localStorage.getItem(STORAGE_KEY_LAST_UPDATE);
      if (lastUpdate) {
        const now = Date.now();
        const diffMs = now - parseInt(lastUpdate);
        const hoursPassed = Math.min(24, diffMs / (1000 * 60 * 60));
        const earnedWhileOffline = hoursPassed * earningRate;
        if (earnedWhileOffline > 0.01) {
          setBalance(prev => {
            const newBal = prev + earnedWhileOffline;
            localStorage.setItem(STORAGE_KEY_BALANCE, newBal.toString());
            return newBal;
          });
          updateHistoryDelta(earnedWhileOffline);
          addLog(`Đồng bộ: +${formatVNDClean(earnedWhileOffline)}đ offline.`, 'success');
        }
      }
    }
    localStorage.setItem(STORAGE_KEY_LAST_UPDATE, Date.now().toString());
  }, []);

  useEffect(() => {
    let timeout: any;
    const processPacket = () => {
      if (!isMining) return;
      const nextTick = Math.random() * 3000 + 2000; 
      timeout = setTimeout(() => {
        const shareOfHour = nextTick / (1000 * 60 * 60);
        const amountToAdd = earningRate * shareOfHour * (Math.random() * 0.4 + 0.8);
        setBalance(prev => {
          const newBal = prev + amountToAdd;
          localStorage.setItem(STORAGE_KEY_BALANCE, newBal.toString());
          localStorage.setItem(STORAGE_KEY_LAST_UPDATE, Date.now().toString());
          return newBal;
        });
        updateHistoryDelta(amountToAdd);
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 300);
        addLog(`Packet processed: +${amountToAdd.toFixed(2)}đ`, 'info');
        processPacket();
      }, nextTick);
    };
    if (isMining) processPacket();
    localStorage.setItem(STORAGE_KEY_STATUS, isMining.toString());
    return () => clearTimeout(timeout);
  }, [isMining, earningRate]);

  const addLog = (msg: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      msg, type
    };
    setLogs(prev => [newLog, ...prev].slice(0, 30));
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);
    const amountNum = parseFloat(withdrawData.amount);
    if (amountNum > balance) { setWithdrawError("Số dư không đủ!"); return; }
    if (amountNum < 3000000) { setWithdrawError("Tối thiểu 3.000.000 VNĐ."); return; }
    
    setWithdrawStep('processing');
    setTimeout(() => {
      setBalance(prev => {
        const newBal = prev - amountNum;
        localStorage.setItem(STORAGE_KEY_BALANCE, newBal.toString());
        return newBal;
      });
      setWithdrawStep('success');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col lg:flex-row font-sans pb-20 lg:pb-0">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#0f172a] border-r border-white/5 flex-col p-8 h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl italic">Z</span>
          </div>
          <span className="font-black text-xl italic">ZenithNode</span>
        </div>
        
        <div className="mb-10 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Tài khoản</p>
          <p className="text-white font-black truncate">@{user.username}</p>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setIsWithdrawOpen(false)} className={`w-full p-4 rounded-2xl font-black flex items-center gap-4 transition-all ${!isWithdrawOpen ? 'bg-indigo-600' : 'text-slate-500 hover:text-white'}`}>
             Tổng quan
          </button>
          <button onClick={() => { setIsWithdrawOpen(true); setWithdrawStep('form'); }} className={`w-full p-4 rounded-2xl font-black flex items-center gap-4 transition-all ${isWithdrawOpen ? 'bg-indigo-600' : 'text-slate-500 hover:text-white'}`}>
             Rút tiền
          </button>
        </nav>
        <button onClick={onLogout} className="mt-8 p-4 text-slate-500 hover:text-red-400 font-bold flex items-center gap-4 transition-colors">
          Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black italic uppercase tracking-tighter">Xin chào, {user.username}!</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Trạng thái: <span className={isMining ? "text-green-500" : "text-red-500"}>{isMining ? "ĐANG TREO" : "ĐANG DỪNG"}</span></p>
          </div>
          <button onClick={() => setIsMining(!isMining)} className={`px-6 py-3 rounded-xl font-black text-xs transition-all shadow-lg active:scale-95 ${isMining ? 'bg-red-600' : 'bg-indigo-600'}`}>
            {isMining ? 'TẠM DỪNG' : 'BẮT ĐẦU TREO'}
          </button>
        </header>

        {/* Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className={`col-span-1 md:col-span-2 bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-300 ${isJumping ? 'scale-[1.02] border-indigo-500/50' : ''}`}>
            <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest block mb-2">Số dư khả dụng</span>
            <div className="text-4xl lg:text-6xl font-black text-white tabular-nums flex items-baseline gap-1 tracking-tighter">
              {formatVNDLive(balance)}<span className="text-base text-indigo-500 italic font-black">đ</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Tốc độ hiện tại: {formatVNDClean(earningRate)}đ/giờ</span>
            </div>
          </div>
          
          <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col justify-center text-center">
            <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest block mb-2">Node hoạt động</span>
            <div className="text-5xl font-black text-white">{isMining ? nodes : 0}</div>
            <p className="text-indigo-500 text-[10px] font-black uppercase mt-2 italic">VietNam-SGN</p>
          </div>
        </div>

        {/* Logs & History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 h-[300px] flex flex-col">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 italic">Xử lý dữ liệu node</h3>
              <div className="flex-grow overflow-y-auto font-mono text-[10px] space-y-1 custom-scrollbar">
                {logs.map(log => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-slate-700">{log.time}</span>
                    <span className={log.type === 'success' ? 'text-green-500' : 'text-slate-400'}>{log.msg}</span>
                  </div>
                ))}
                <div ref={logsEndRef}></div>
              </div>
           </div>
           
           <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 h-[300px]">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4 italic">Thu nhập gần đây</h3>
              <div className="flex items-end gap-3 h-[180px] mt-4">
                {history.map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full bg-slate-800 rounded-lg group-hover:bg-indigo-600 transition-all cursor-help relative" style={{ height: `${Math.min(100, (h.amount/5000)*100)}%` }}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{formatVNDClean(h.amount)}đ</div>
                    </div>
                    <span className="text-[9px] font-black text-slate-600 uppercase">{i === 6 ? 'Nay' : h.date}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </main>

      {/* Modal Rút tiền */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center bg-black/90 backdrop-blur-md lg:p-4 animate-in fade-in duration-300">
           <div className="bg-[#161b2c] border-t lg:border border-white/10 rounded-t-[2.5rem] lg:rounded-[3rem] w-full max-w-md overflow-hidden">
              <div className="relative p-6 lg:p-8 border-b border-white/5 flex items-center justify-center bg-indigo-600/10">
                <button onClick={() => setIsWithdrawOpen(false)} className="absolute left-6 text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg></button>
                <h2 className="text-sm font-black text-white italic tracking-widest uppercase">RÚT TIỀN NHANH</h2>
              </div>
              <div className="p-8">
                {withdrawStep === 'form' ? (
                  <form onSubmit={handleWithdraw} className="space-y-4">
                    <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 text-center">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-1">CÓ THỂ RÚT</p>
                      <p className="text-3xl font-black text-white">{formatVNDLive(balance)} đ</p>
                    </div>
                    {withdrawError && <div className="text-red-500 text-[10px] font-black text-center italic">⚠️ {withdrawError}</div>}
                    <div className="space-y-3">
                      <select className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500 appearance-none">
                        {VN_BANKS.map(b => <option key={b}>{b}</option>)}
                      </select>
                      <input type="text" required placeholder="Số tài khoản..." value={withdrawData.account} onChange={e => setWithdrawData({...withdrawData, account: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500" />
                      <input type="text" required placeholder="Họ tên (KHÔNG DẤU)..." value={withdrawData.fullName} onChange={e => setWithdrawData({...withdrawData, fullName: e.target.value.toUpperCase()})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500" />
                      <input type="number" required placeholder="Số tiền (Tối thiểu 3 triệu)..." value={withdrawData.amount} onChange={e => setWithdrawData({...withdrawData, amount: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-indigo-600/30">XÁC NHẬN RÚT TIỀN</button>
                  </form>
                ) : withdrawStep === 'processing' ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white font-black italic tracking-tighter">ĐANG XỬ LÝ GIAO DỊCH...</p>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20"><svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">THÀNH CÔNG!</h3>
                    <p className="text-slate-400 text-xs">Lệnh rút đã được tiếp nhận, tiền sẽ về trong 2-15 phút.</p>
                    <button onClick={() => setIsWithdrawOpen(false)} className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-black">QUAY LẠI</button>
                  </div>
                )}
              </div>
           </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/5 flex justify-around p-4 pb-8 z-50">
        <button onClick={() => setIsWithdrawOpen(false)} className={`flex flex-col items-center gap-1 ${!isWithdrawOpen ? 'text-indigo-500' : 'text-slate-500'}`}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg><span className="text-[8px] font-black uppercase">Home</span></button>
        <button onClick={() => { setIsWithdrawOpen(true); setWithdrawStep('form'); }} className={`flex flex-col items-center gap-1 ${isWithdrawOpen ? 'text-indigo-500' : 'text-slate-500'}`}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14V9h2v7h-2zm0-9h2v2h-2V7z" /></svg><span className="text-[8px] font-black uppercase">Rút tiền</span></button>
        <button onClick={onLogout} className="flex flex-col items-center gap-1 text-slate-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M17 16l4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4" /></svg><span className="text-[8px] font-black uppercase">Thoát</span></button>
      </nav>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;
