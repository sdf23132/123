
import React, { useState } from 'react';

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-indigo-400 transition-colors"
      >
        <span className="text-lg font-bold text-white">{question}</span>
        <svg 
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Câu hỏi thường gặp</h2>
        <p className="text-slate-400">Mọi thứ bạn cần biết về Zenith Node để bắt đầu an tâm.</p>
      </div>

      <div className="space-y-2">
        <FAQItem 
          question="Ứng dụng có làm chậm máy của tôi không?"
          answer="Không. Zenith Node được thiết kế để chỉ sử dụng các tài nguyên hệ thống nhàn rỗi (idle). Nó tự động giới hạn mức sử dụng CPU và băng thông để bạn không bao giờ cảm nhận thấy sự khác biệt khi làm việc hay chơi game."
        />
        <FAQItem 
          question="Dữ liệu của tôi có an toàn không?"
          answer="Hoàn toàn an toàn. Chúng tôi không bao giờ truy cập vào tệp tin, ảnh, hay mật khẩu của bạn. Ứng dụng chỉ hoạt động như một proxy trung gian để các doanh nghiệp thực hiện nghiên cứu thị trường và kiểm tra SEO hợp pháp."
        />
        <FAQItem 
          question="Tôi có thể rút tiền bằng cách nào?"
          answer="Khi số dư đạt $5, bạn có thể gửi yêu cầu rút tiền. Chúng tôi hỗ trợ PayPal, Bitcoin (BTC), Ethereum (ETH), USDT, và nhiều loại thẻ quà tặng điện tử khác."
        />
        <FAQItem 
          question="Tại sao doanh nghiệp lại trả tiền cho băng thông của tôi?"
          answer="Nhiều công ty lớn cần truy cập internet từ nhiều địa điểm khác nhau để kiểm tra giá cả toàn cầu, xác minh quảng cáo, và nghiên cứu dữ liệu công khai mà không bị chặn theo địa lý."
        />
        <FAQItem 
          question="Tôi có thể chạy Zenith Node trên bao nhiêu thiết bị?"
          answer="Bạn có thể cài đặt trên bao nhiêu thiết bị tùy thích! Tuy nhiên, tối đa 2 thiết bị có thể hoạt động trên cùng một địa chỉ IP (mạng Wi-Fi). Để kiếm được nhiều hơn, hãy cài đặt trên các mạng khác nhau."
        />
      </div>
    </div>
  );
};

export default FAQ;
