import { Button } from "@/components/ui/button";
import { Keyboard, Zap, Target } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

// Lazy load FaultyTerminal
const FaultyTerminal = lazy(() => import('./FaultyTerminal'));

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {mounted && (
        <div className="fixed inset-0 -z-10">
          <Suspense fallback={null}>
            <FaultyTerminal />
          </Suspense>
        </div>
      )}
      <div className="glass-card p-4 sm:p-6 md:p-8 max-w-2xl w-full text-center space-y-4 relative z-10 bg-black/70 backdrop-blur-sm border border-white/20" style={{ maxHeight: '90vh' }}>
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="glass-card p-6 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
            <Keyboard className="h-16 w-16 text-primary" />
          </div>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
            Typer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Test your typing speed & accuracy
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          <div className="glass-card p-4 space-y-2 bg-black/60 backdrop-blur-sm border border-white/10">
            <Zap className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Real-time feedback as you type
            </p>
          </div>
          
          <div className="glass-card p-4 space-y-2 bg-black/60 backdrop-blur-sm border border-white/10">
            <Target className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Precision Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Accurate WPM and error detection
            </p>
          </div>
          
          <div className="glass-card p-4 space-y-2 bg-black/60 backdrop-blur-sm border border-white/10">
            <Keyboard className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Multiple Levels</h3>
            <p className="text-sm text-muted-foreground">
              Easy to hard difficulty modes
            </p>
          </div>
        </div>
        
        {/* Get Started Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="glass-button text-base md:text-lg px-6 py-3 md:px-10 md:py-4 h-auto font-semibold text-primary-foreground mt-2"
        >
          Get Started
        </Button>
        
        {/* Subtle decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}