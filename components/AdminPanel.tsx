
import React, { useState, useRef } from 'react';
import { ApkInfo } from '../App';

interface AdminPanelProps {
  apkInfo: ApkInfo;
  onUpdate: (info: ApkInfo) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ apkInfo, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<ApkInfo>({ ...apkInfo });
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setFormData(prev => ({
        ...prev,
        size: fileSize,
        fileName: file.name,
        updatedAt: new Date().toLocaleDateString('vi-VN')
      }));
      const blobUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, localBlob: blobUrl }));
      setTimeout(() => setIsUploading(false), 500);
    }
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    onUpdate(formData);
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => onClose(), 800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-[#161b2c] border border-white/10 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-indigo-600/20">
          <h2 className="text-2xl font-black text-white italic tracking-tight">⚙️ ADMIN SETTINGS (VNĐ)</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-2 text-2xl">✕</button>
        </div>
        
        <form onSubmit={handleLocalSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
          <div className="space-y-4">
            <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">💰 Tốc độ kiếm tiền (VNĐ/giờ)</label>
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-indigo-500/20">
              <input 
                type="range" 
                min="100" 
                max="100000" 
                step="100"
                value={formData.earningRate}
                onChange={e => setFormData({...formData, earningRate: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-bold">GIÁ TRỊ:</span>
                <span className="text-white font-black text-2xl">{formData.earningRate.toLocaleString('vi-VN')} VNĐ/giờ</span>
              </div>
              <p className="text-slate-500 text-[10px] mt-2 italic">* Tương đương { (formData.earningRate * 24).toLocaleString('vi-VN') } VNĐ mỗi ngày.</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">📦 Cấu hình APK</label>
            <div onClick={() => fileInputRef.current?.click()} className="relative border-2 border-dashed border-indigo-500/30 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer group hover:bg-indigo-500/5">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".apk" className="hidden" />
              <div className="text-white font-bold text-sm">{formData.fileName || "Nhấn để đổi file APK"}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Version</label>
              <input type="text" value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Dung lượng</label>
              <input type="text" value={formData.size} readOnly className="w-full bg-slate-900/20 border border-white/5 rounded-2xl px-5 py-4 text-slate-500 font-bold" />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-5 border border-white/10 rounded-3xl font-black text-slate-500 text-xs uppercase">Hủy</button>
            <button type="submit" className={`flex-[2] px-8 py-5 rounded-3xl font-black text-white text-xs uppercase transition-all ${saveStatus === 'success' ? 'bg-green-600' : 'bg-indigo-600'}`}>
              {saveStatus === 'success' ? 'ĐÃ LƯU' : 'LƯU THIẾT LẬP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
