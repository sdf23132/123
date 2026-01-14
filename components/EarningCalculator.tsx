
import React, { useState, useEffect } from 'react';

interface EarningCalculatorProps {
  onStartClick: () => void;
}

const EarningCalculator: React.FC<EarningCalculatorProps> = ({ onStartClick }) => {
  const [gbShared, setGbShared] = useState(10);
  const [referrals, setReferrals] = useState(5);
  const [estimatedMonthly, setEstimatedMonthly] = useState(0);

  useEffect(() => {
    // Công thức giả định: 5.000 VNĐ mỗi GB + 50.000 VNĐ mỗi referral (thưởng tháng)
    const total = (gbShared * 5000 * 30) + (referrals * 50000);
    setEstimatedMonthly(total);
  }, [gbShared, referrals]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-6">Bạn có thể kiếm được <br /> bao nhiêu VNĐ?</h2>
          <p className="text-slate-400 mb-8 leading-relaxed italic">
            Dựa trên lượng băng thông chia sẻ và số người bạn mời tham gia. Càng treo lâu, tiền về càng nhiều.
          </p>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-white font-semibold uppercase text-xs tracking-widest">Dữ liệu chia sẻ mỗi ngày (GB)</label>
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">{gbShared} GB</span>
              </div>
              <input type="range" min="1" max="100" value={gbShared} onChange={(e) => setGbShared(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-white font-semibold uppercase text-xs tracking-widest">Số người giới thiệu</label>
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg">{referrals} người</span>
              </div>
              <input type="range" min="0" max="50" value={referrals} onChange={(e) => setReferrals(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-1 rounded-3xl shadow-2xl">
          <div className="bg-[#111827] rounded-[calc(1.5rem-1px)] p-10 text-center">
            <h4 className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-4">Ước tính thu nhập</h4>
            <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">{estimatedMonthly.toLocaleString('vi-VN')}</div>
            <p className="text-indigo-400 text-lg mb-8 font-black italic">VNĐ / THÁNG</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <span className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Hàng tuần</span>
                <span className="text-lg font-bold text-white">{(estimatedMonthly / 4).toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <span className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Hàng năm</span>
                <span className="text-lg font-bold text-white">{(estimatedMonthly * 12).toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <button onClick={onStartClick} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/30">
              BẮT ĐẦU TREO MÁY NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningCalculator;
