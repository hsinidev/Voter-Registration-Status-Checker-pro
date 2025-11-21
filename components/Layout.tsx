
import React, { useState, useEffect, useRef } from 'react';
import { ModalType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const GalaxyBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let width = window.innerWidth;
        let height = window.innerHeight;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        
        // Galaxy particles
        const particleCount = 400;
        const particles: any[] = [];
        const colors = ['#ff00cc', '#333399', '#66ffff', '#ffffff', '#8a2be2', '#ff1493'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 0.15,
                speedY: (Math.random() - 0.5) * 0.15,
                alpha: Math.random() * 0.8 + 0.2,
                pulse: Math.random() * 0.01 + 0.005
            });
        }
        
        let animationFrameId: number;
        
        const animate = () => {
            ctx.fillStyle = 'rgba(15, 10, 30, 0.2)'; 
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                p.alpha += p.pulse;
                if (p.alpha >= 1 || p.alpha <= 0.1) p.pulse *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2e0228] via-[#1a0b2e] to-[#050505]"></div>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        </div>
    );
};


const Modal: React.FC<{ title: string; content: React.ReactNode; onClose: () => void }> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-[#111827] border border-gray-600 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto transform transition-all scale-100 relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 tracking-wide">{title}</h2>
        </div>
        
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-sm font-semibold flex items-center">
                <span className="text-xl mr-2">⚠️</span> 
                IMPORTANT NOTICE: This website is a portfolio project and demonstration. It is NOT a government agency.
            </p>
        </div>

        <div className="text-gray-300 space-y-4 leading-relaxed font-light text-sm md:text-base">
            {content}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
             <button 
                onClick={onClose} 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg"
            >
                Acknowledge & Close
            </button>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top visibility
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Reading Progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getModalContent = (modal: ModalType) => {
    const contactInfo = (
        <div className="space-y-3 mt-4 p-5 bg-gray-800/50 rounded-xl border border-gray-700">
            <p className="text-white font-medium">Project Contact:</p>
            <p className="flex items-center text-gray-300">
                <span className="w-20 text-gray-500">Website:</span> 
                <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">doodax.com</a>
            </p>
            <p className="flex items-center text-gray-300">
                <span className="w-20 text-gray-500">Email:</span> 
                <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">hsini.web@gmail.com</a>
            </p>
        </div>
    );

    switch (modal) {
      case 'about':
        return { 
            title: 'About Voter Check UI', 
            content: (
                <>
                    <p>This application serves as a <strong>high-fidelity technical demonstration</strong> of modern web standards, accessibility (A11y), and secure User Interface design.</p>
                    <p>Created by full-stack engineer HSINI MOHAMED, "doodax.com" showcases how sensitive civic data flows can be modeled with privacy-first architecture. The tool mimics the experience of a state voter lookup tool without actually processing real data against government backends.</p>
                    {contactInfo}
                </>
            )
        };
      case 'contact':
        return { 
            title: 'Contact Support', 
            content: (
                <>
                    <p>We welcome feedback regarding the design, accessibility, and performance of this application. For business inquiries, code audits, or general questions, please utilize the channels below.</p>
                    {contactInfo}
                </>
            )
        };
      case 'guide':
        return { 
            title: 'User Guide', 
            content: (
                <>
                    <h3 className="text-white font-bold text-lg mb-3">How to Use This Tool</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-white">1</div>
                            <div>
                                <p className="font-medium text-white">Enter Details</p>
                                <p className="text-sm text-gray-400">Input your name and DOB. Note: Data is processed locally for simulation.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-white">2</div>
                            <div>
                                <p className="font-medium text-white">Select Location</p>
                                <p className="text-sm text-gray-400">Choose your state to receive the correct official link.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-white">3</div>
                            <div>
                                <p className="font-medium text-white">Verify</p>
                                <p className="text-sm text-gray-400">Follow the generated secure link to your Secretary of State's office.</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        };
      case 'privacy':
        return { 
            title: 'Privacy Policy', 
            content: (
                <>
                    <p><strong>Effective Date: October 26, 2023</strong></p>
                    <p>Your privacy is paramount. This application operates under a strict <strong>Zero-Knowledge</strong> architecture.</p>
                    <ul className="list-disc list-inside space-y-2 ml-2 mt-4 bg-gray-800/30 p-4 rounded-lg">
                        <li><strong>No Data Storage:</strong> We do not use a database. Your inputs are never saved to a server.</li>
                        <li><strong>No Tracking:</strong> We do not use Google Analytics, Facebook Pixels, or third-party trackers.</li>
                        <li><strong>Local Execution:</strong> All validation logic runs in your browser.</li>
                    </ul>
                    <p className="mt-4">This policy ensures compliance with GDPR and CCPA standards for demonstrative software.</p>
                    {contactInfo}
                </>
            )
        };
      case 'terms':
        return { 
            title: 'Terms of Service', 
            content: (
                <>
                    <p>By accessing "doodax.com", you agree to the following terms:</p>
                    <ol className="list-decimal list-inside space-y-3 ml-2 mt-4">
                        <li><strong>Non-Official Use:</strong> You understand this is a portfolio project, not a government service.</li>
                        <li><strong>No Warranty:</strong> The software is provided "as is" without warranty of any kind.</li>
                        <li><strong>Safe Usage:</strong> You agree not to attempt to reverse engineer or use this interface for phishing.</li>
                    </ol>
                </>
            )
        };
      case 'dmca':
        return { 
            title: 'DMCA / Copyright', 
            content: (
                <>
                    <p>All code, layout designs, and original assets are Copyright © 2023 HSINI MOHAMED.</p>
                    <p>This website respects the intellectual property rights of others. If you believe that material located on or linked to by this website infringes your copyright, you are encouraged to notify us in accordance with the Digital Millennium Copyright Act.</p>
                    {contactInfo}
                </>
            )
        };
      default:
        return { title: '', content: '' };
    }
  };

  const navLinks: { label: string; modal: ModalType }[] = [
    { label: 'About', modal: 'about' },
    { label: 'Contact', modal: 'contact' },
    { label: 'Guide', modal: 'guide' },
    { label: 'Privacy Policy', modal: 'privacy' },
    { label: 'Terms of Service', modal: 'terms' },
    { label: 'DMCA', modal: 'dmca' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-gray-100 selection:bg-pink-500 selection:text-white">
      <GalaxyBackground />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-blue via-purple-500 to-brand-gold z-50 transition-all duration-150" style={{ width: `${readingProgress}%` }}></div>
      
      {/* Navigation */}
      <header className="bg-black/20 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
        <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-3">
          {navLinks.map((link) => (
             <button 
                key={link.modal} 
                onClick={() => setActiveModal(link.modal)} 
                className="text-xs font-bold text-gray-300 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all tracking-widest uppercase transform hover:-translate-y-0.5"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center w-full relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505]/80 backdrop-blur-xl border-t border-white/10 py-10 mt-20">
        <div className="container mx-auto px-4 text-center">
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto mb-8 text-sm text-gray-400">
                 {navLinks.map(link => (
                     <button key={link.modal} onClick={() => setActiveModal(link.modal)} className="hover:text-brand-gold text-left md:text-center transition-colors">{link.label}</button>
                 ))}
            </div>
            
            <div className="text-gray-500 text-sm space-y-4 border-t border-gray-800 pt-8">
                <div className="flex justify-center items-center space-x-4">
                     <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">doodax.com</a>
                     <span>•</span>
                     <a href="mailto:hsini.web@gmail.com" className="hover:text-white transition-colors">hsini.web@gmail.com</a>
                </div>

                <p className="text-xs opacity-60">
                    © {new Date().getFullYear()} Voter Registration Status UI. All rights reserved.
                </p>
                
                <div className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all mt-4">
                    <span className="text-gray-400 mr-2">Powered by</span>
                    <a 
                        href="https://github.com/hsinidev" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:to-white transition-all"
                    >
                        HSINI MOHAMED
                    </a>
                </div>
            </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 transform z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {activeModal && (
        <Modal
          title={getModalContent(activeModal).title}
          content={getModalContent(activeModal).content}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default Layout;
