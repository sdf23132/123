
import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-all duration-300 group">
    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-indigo-500 font-bold tracking-widest uppercase text-sm mb-4">Tại sao chọn Zenith Node?</h2>
        <p className="text-3xl md:text-5xl font-extrabold text-white">Cách đơn giản nhất để <br /> tạo thu nhập thụ động</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          title="Thiết lập nhanh chóng"
          desc="Chỉ mất chưa đầy 3 phút để cài đặt. Sau đó, ứng dụng sẽ tự động chạy ngầm mà không làm ảnh hưởng đến hiệu suất máy."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          title="An toàn & Bảo mật"
          desc="Chúng tôi chỉ sử dụng băng thông nhàn rỗi cho các mục đích kinh doanh hợp pháp. Dữ liệu cá nhân của bạn hoàn toàn bí mật."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
          title="Thanh toán linh hoạt"
          desc="Rút tiền qua PayPal, Crypto (BTC, USDT), hoặc đổi thẻ quà tặng Amazon khi đạt ngưỡng tối thiểu chỉ $5."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          title="Mạng lưới toàn cầu"
          desc="Hệ thống máy chủ phân tán khắp nơi giúp đảm bảo ứng dụng của bạn luôn được kết nối và tạo ra lợi nhuận cao nhất."
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          title="Chương trình giới thiệu"
          desc="Nhận 10% hoa hồng trọn đời cho mỗi người bạn giới thiệu tham gia Zenith Node. Thu nhập không giới hạn!"
        />
        <FeatureCard 
          icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          title="Báo cáo chi tiết"
          desc="Theo dõi thu nhập theo thời gian thực qua biểu đồ trực quan. Xem chính xác nguồn tiền đến từ đâu."
        />
      </div>
    </div>
  );
};

export default Features;
