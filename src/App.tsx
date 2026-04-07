/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shirt, 
  User, 
  Sparkles, 
  Download, 
  Share2, 
  RefreshCw, 
  Moon, 
  Sun, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Camera,
  Layers,
  Palette,
  Info,
  Upload,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageUpload } from './components/ImageUpload';
import { OutfitSelector } from './components/OutfitSelector';
import { ResultSlider } from './components/ResultSlider';
import { AdPlaceholder } from './components/AdPlaceholder';
import { OUTFIT_STYLES, Gender, OutfitStyle } from './constants';
import { generateTryOn } from './lib/gemini';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>('male');
  const [category, setCategory] = useState('Casual');
  const [userImage, setUserImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<OutfitStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customOutfitImage, setCustomOutfitImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState('AI is crafting your look...');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showQuotaHelp, setShowQuotaHelp] = useState(false);
  const [activeTab, setActiveTab] = useState<'Presets' | 'Custom' | 'Prompt'>('Presets');
  const [genCount, setGenCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleGenerate = async () => {
    if (!userImage) {
      setError("Please upload your photo first.");
      return;
    }

    if (!selectedStyle && !customPrompt && !customOutfitImage) {
      setError("Please select an outfit or enter a custom prompt.");
      return;
    }

    if (genCount >= 3) {
      setError("Free limit reached (3 generations). Please try again later.");
      return;
    }

    setIsGenerating(true);
    setGeneratingMessage('AI is crafting your look...');
    setError(null);

    // Demo Mode Logic
    if (isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResultImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000");
      setGenCount(prev => prev + 1);
      setStep(3);
      setIsGenerating(false);
      return;
    }

    try {
      const outfitDescription = selectedStyle 
        ? selectedStyle.description 
        : customPrompt || "a stylish outfit";

      const result = await generateTryOn(
        {
          userImageBase64: userImage.base64,
          userImageMimeType: userImage.mimeType,
          outfitDescription,
          outfitImageBase64: customOutfitImage?.base64,
          outfitImageMimeType: customOutfitImage?.mimeType
        },
        0,
        (seconds) => {
          setGeneratingMessage(`AI is busy (Free Tier). Retrying in ${seconds}s...`);
        }
      );

      setResultImage(result);
      setGenCount(prev => prev + 1);
      setStep(3);
    } catch (err: any) {
      const errorMessage = err.message || "";
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("limit")) {
        setShowQuotaHelp(true);
      }
      setError(err.message || "Failed to generate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `BS-TryFit-${Date.now()}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!resultImage) return;
    try {
      const blob = await (await fetch(resultImage)).blob();
      const file = new File([blob], 'tryfit.png', { type: blob.type });
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'My BS TryFit Result',
          text: 'Check out my new look with BS TryFit AI!',
        });
      } else {
        alert("Sharing not supported on this browser. You can download the image instead.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => {
    setStep(1);
    setResultImage(null);
    setSelectedStyle(null);
    setCustomPrompt('');
    setCustomOutfitImage(null);
  };

  return (
    <div className="min-h-screen bg-[#050816] transition-colors duration-300 font-sans text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050816]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shirt className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              BS <span className="text-blue-600">TryFit</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#1a1f35] p-1 rounded-xl flex gap-1">
              <button
                onClick={() => setGender('male')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-[#2d3558] text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-[#2d3558] text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Female
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Top Ad */}
        <AdPlaceholder type="horizontal" label="Leaderboard Ad (728x90)" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Step 1: Upload */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-xl font-bold">Upload Your Photo</h2>
              </div>
              
              <div className="bg-[#0a0f25] rounded-2xl border-2 border-dashed border-gray-800 p-8">
                <ImageUpload 
                  id="user-photo"
                  label=""
                  onImageSelect={(base64, mimeType) => setUserImage(base64 ? { base64, mimeType } : null)}
                />
              </div>

              <div className="p-4 bg-blue-900/10 rounded-xl flex gap-3 items-start border border-blue-500/20">
                <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-blue-300 leading-relaxed">
                  <span className="font-bold">Privacy First:</span> Your images are processed securely and not stored permanently. They are deleted automatically after your session.
                </p>
              </div>

              {/* In-feed Ad */}
              <AdPlaceholder type="horizontal" label="In-feed Ad" className="mt-4" />
            </section>

            {/* Step 2: Choose Outfit */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl font-bold">Choose Your Outfit</h2>
                </div>
                
                <div className="bg-[#1a1f35] p-1 rounded-lg flex gap-1">
                  {['Presets', 'Custom', 'Prompt'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#2d3558] text-blue-400' : 'text-gray-500'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {activeTab === 'Presets' && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {['Casual', 'Formal', 'Wedding', 'Party', 'Traditional Pakistani'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-blue-600 text-white' : 'bg-[#1a1f35] text-gray-400 hover:bg-[#252b4d]'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {OUTFIT_STYLES.filter(s => s.gender === gender && s.category === category).map((style) => (
                        <motion.div
                          key={style.id}
                          whileHover={{ y: -4 }}
                          onClick={() => {
                            setSelectedStyle(style);
                            setCustomPrompt('');
                            setCustomOutfitImage(null);
                          }}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${selectedStyle?.id === style.id ? 'border-blue-600 bg-blue-600/5' : 'border-gray-800 bg-[#0a0f25] hover:border-gray-700'}`}
                        >
                          <h3 className="font-bold text-[11px] mb-1 truncate">{style.name}</h3>
                          <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">{style.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'Prompt' && (
                   <div className="bg-[#0a0f25] p-4 rounded-xl border border-gray-800">
                      <textarea 
                        value={customPrompt}
                        onChange={(e) => {
                          setCustomPrompt(e.target.value);
                          setSelectedStyle(null);
                          setCustomOutfitImage(null);
                        }}
                        className="w-full bg-transparent border-none outline-none text-sm text-gray-300 resize-none h-32"
                        placeholder="Describe the outfit you want to try on... e.g. 'A black leather jacket with silver zippers'"
                      />
                   </div>
                )}

                {activeTab === 'Custom' && (
                   <div className="bg-[#0a0f25] p-4 rounded-xl border border-gray-800">
                      <ImageUpload 
                        id="custom-outfit"
                        label="Upload Outfit Reference"
                        onImageSelect={(base64, mimeType) => {
                          setCustomOutfitImage(base64 ? { base64, mimeType } : null);
                          setSelectedStyle(null);
                          setCustomPrompt('');
                        }}
                      />
                   </div>
                )}
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-2xl mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-200 text-sm font-medium">{error}</p>
                    {showQuotaHelp && (
                      <button 
                        onClick={() => setShowQuotaHelp(true)}
                        className="text-red-400 text-xs underline mt-2 hover:text-red-300 transition-colors"
                      >
                        Why am I seeing this? (Quota Help)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Demo Mode Toggle */}
            <div className="flex items-center justify-between bg-blue-600/10 border border-blue-500/30 p-4 rounded-2xl mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Demo Mode</h3>
                  <p className="text-blue-300/70 text-xs">Skip AI limits and see instant results</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDemoMode(!isDemoMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDemoMode ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDemoMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            {/* Generate Button */}
            <button
              disabled={isGenerating || (!selectedStyle && !customPrompt && !customOutfitImage)}
              onClick={handleGenerate}
              className={`
                w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${isGenerating || (!selectedStyle && !customPrompt && !customOutfitImage)
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-[#1a1f35] text-gray-300 hover:bg-[#252b4d] border border-gray-700'}
              `}
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin" size={24} />
              ) : (
                <Sparkles size={24} />
              )}
              Generate My Look
            </button>
          </div>

          {/* Right Column: Preview & Ads */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Preview Area */}
            <div className="bg-[#0a0f25] rounded-3xl border border-gray-800 aspect-[3/4] max-h-[700px] flex flex-col items-center justify-center p-4 relative overflow-hidden mx-auto w-full">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4 text-center px-4">
                  <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                  <p className="text-gray-400 font-medium">{generatingMessage}</p>
                </div>
              ) : resultImage && userImage ? (
                <div className="w-full h-full">
                  <ResultSlider 
                    before={`data:${userImage.mimeType};base64,${userImage.base64}`}
                    after={resultImage}
                  />
                </div>
              ) : (
                <div className="text-center space-y-6 max-w-sm">
                  <div className="w-24 h-24 bg-[#1a1f35] rounded-3xl flex items-center justify-center mx-auto">
                    <ImageIcon className="text-gray-600" size={48} />
                  </div>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    Upload a photo and select a style to see the magic happen.
                  </p>
                </div>
              )}

              {/* Action Buttons Overlay */}
              {resultImage && !isGenerating && (
                <div className="absolute bottom-6 right-6 flex gap-3">
                  <button onClick={handleDownload} className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all">
                    <Download size={20} />
                  </button>
                  <button onClick={handleShare} className="p-3 bg-[#1a1f35] text-white rounded-xl shadow-lg hover:bg-[#252b4d] border border-gray-700 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Ad */}
            <AdPlaceholder type="vertical" label="Skyscraper Ad (300x600)" />

          </div>
        </div>

        {/* Bottom Ad */}
        <AdPlaceholder type="horizontal" label="Bottom Banner Ad" className="mt-12" />
      </main>

      {/* Quota Help Modal */}
      {showQuotaHelp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Quota Help</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                The <span className="text-white font-semibold">Gemini Free Tier</span> has strict limits. If you see "Limit: 0", it means your project's daily quota is exhausted.
              </p>
              
              <div className="bg-gray-800/50 p-4 rounded-xl space-y-3">
                <h3 className="text-white font-semibold text-xs uppercase tracking-wider">How to fix:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="text-blue-400">Enable Billing:</span> Adding a payment method (even if you stay free) usually removes the "0 limit" restriction.</li>
                  <li><span className="text-blue-400">New API Key:</span> Create a fresh project in Google AI Studio for a new quota.</li>
                  <li><span className="text-blue-400">Use Demo Mode:</span> Toggle "Demo Mode" above to test the app without using the API.</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setShowQuotaHelp(false)}
              className="w-full mt-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
          BS TryFit AI • Photorealistic Try-On
        </p>
      </footer>
    </div>
  );
}
