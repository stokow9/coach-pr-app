import React, { useState } from 'react';
import { Play, PenTool, Layout, Users, Settings, Video, FileText } from 'lucide-react';

// Prosty komponent nawigacji
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all ${active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('analysis');

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white font-bold">CP</div>
          <span className="text-xl font-bold tracking-tight">CoachPro</span>
        </div>
        
        <SidebarItem icon={Layout} label="Dashboard" active={activeTab === 'dash'} onClick={() => setActiveTab('dash')} />
        <SidebarItem icon={Video} label="Moje Mecze" active={activeTab === 'matches'} onClick={() => setActiveTab('matches')} />
        <SidebarItem icon={PenTool} label="Analiza Wideo" active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} />
        <SidebarItem icon={Users} label="Drużyna" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
        <hr className="my-4" />
        <SidebarItem icon={Settings} label="Ustawienia" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {activeTab === 'analysis' ? (
          <div className="max-w-5xl mx-auto">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Analiza Wideo</h2>
                <p className="text-gray-500 text-sm mt-1">Narysuj uwagi taktyczne bezpośrednio na nagraniu.</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                <FileText size={18} /> Generuj Raport PDF
              </button>
            </header>

            {/* TU WPĘDZIEMY NASZ MODUŁ TELESTRATORA */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-4">
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-white relative">
                 <p className="text-gray-400 italic font-light text-lg">Moduł odtwarzacza gotowy do wpięcia wideo...</p>
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                    <button className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/30 transition-all">
                      <Play fill="white" size={24} />
                    </button>
                    <button className="bg-red-500 p-4 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-500/30">
                      <PenTool size={24} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
            Sekcja "{activeTab}" jest w trakcie budowy...
          </div>
        )}
      </main>
    </div>
  );
}
