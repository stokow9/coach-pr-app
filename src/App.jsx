import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { jsPDF } from 'jspdf';
import { PenTool, Play, Pause, Download, Eraser, MonitorPlay, Layout, Video, Users, Settings } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const playerRef = useRef(null);
  const canvasRef = useRef(null);

  // Inicjalizacja płótna (canvas)
  useEffect(() => {
    if (activeTab === 'analysis' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [activeTab]);

  const startDrawing = (e) => {
    if (!isDrawingMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isDrawingMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#ff0044';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Raport Taktyczny CoachPro', 20, 20);
    doc.setFontSize(12);
    doc.text('Analiza sytuacji meczowej - wygenerowano z panelu.', 20, 30);
    doc.save('raport-trenera.pdf');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-8 px-2 text-blue-600">
          <MonitorPlay size={32} />
          <span className="text-xl font-bold tracking-tight text-gray-900">CoachPro</span>
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
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Analiza Wideo</h2>
              <p className="text-gray-500 mt-1">Użyj narzędzi rysowania, aby wskazać błędy w ustawieniu.</p>
            </div>
            <button onClick={exportToPDF} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
              <Download size={18} /> PDF
            </button>
          </header>

          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 p-6">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
              <ReactPlayer
                ref={playerRef}
                url="https://www.w3schools.com/html/mov_bbb.mp4"
                playing={isPlaying}
                width="100%"
                height="100%"
              />
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={() => setIsDrawing(false)}
                className={`absolute top-0 left-0 w-full h-full ${isDrawingMode ? 'cursor-crosshair' : 'pointer-events-none'}`}
              />
            </div>

            {/* CONTROLS */}
            <div className="flex gap-4 mt-6 justify-center items-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl shadow-lg transition-all"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button 
                onClick={() => setIsDrawingMode(!isDrawingMode)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${isDrawingMode ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <PenTool size={20} /> {isDrawingMode ? 'Rysowanie: WŁ' : 'Tryb Rysowania'}
              </button>

              <button 
                onClick={clearCanvas}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                <Eraser size={20} /> Wyczyść
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
