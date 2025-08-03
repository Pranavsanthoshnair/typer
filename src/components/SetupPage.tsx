import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Settings, Timer, Zap } from "lucide-react";
import { Difficulty, TimeLimit } from "@/data/words";
import FaultyTerminal from "./FaultyTerminal";

interface SetupPageProps {
  onStartTest: (difficulty: Difficulty, timeLimit: TimeLimit) => void;
  onBack: () => void;
}

export default function SetupPage({ onStartTest, onBack }: SetupPageProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [timeLimit, setTimeLimit] = useState<TimeLimit>(60);

  const difficulties: { value: Difficulty; label: string; description: string; icon: string }[] = [
    { value: "easy", label: "Easy", description: "Common words, minimal punctuation", icon: "🟢" },
    { value: "medium", label: "Medium", description: "Mixed vocabulary, some punctuation", icon: "🟡" },
    { value: "hard", label: "Hard", description: "Complex words, frequent punctuation", icon: "🔴" }
  ];

  // gradient glass styles for difficulty cards
  const diffStyles: Record<Difficulty, string> = {
    easy: "from-green-400/50 to-green-600/40 border-green-400/80",
    medium: "from-yellow-400/50 to-yellow-600/40 border-yellow-400/80",
    hard: "from-red-400/50 to-red-600/40 border-red-400/80",
  };

  const timeLimits: { value: TimeLimit; label: string; description: string }[] = [
    { value: 30, label: "30 seconds", description: "Quick sprint" },
    { value: 60, label: "1 minute", description: "Standard test" },
    { value: 120, label: "2 minutes", description: "Endurance challenge" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <FaultyTerminal
          scale={2}
          gridMul={[1.5, 1]}
          digitSize={1.2}
          timeScale={0.2}
          scanlineIntensity={0.15}
          glitchAmount={0.8}
          flickerAmount={0.6}
          noiseAmp={0.8}
          brightness={0.3}
          tint="#00ff41"
          mouseReact={true}
          mouseStrength={0.1}
          pageLoadAnimation={true}
          className="w-full h-full"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="backdrop-blur-sm bg-black/20 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-5xl w-full space-y-6 sm:space-y-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 sm:p-3 rounded-lg hover:bg-muted/20"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold">Test Setup</h1>
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Difficulty Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Choose Difficulty</h2>
            </div>
            
            <div className="space-y-4">
              {difficulties.map((diff) => (
                <Card
                  key={diff.value}
                  className={`p-6 cursor-pointer rounded-xl border backdrop-blur-sm bg-gradient-to-br ${diffStyles[diff.value]} ${
                    difficulty === diff.value
                      ? "ring-2 ring-primary/60"
                      : "hover:bg-white/5"
                  } transition-all duration-200`}
                  onClick={() => setDifficulty(diff.value)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{diff.label}</h3>
                      <p className="text-white/80 text-sm mt-1">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Time Limit Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Time Limit</h2>
            </div>
            
            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
              {timeLimits.map((time) => (
                <Card
                  key={time.value}
                  className={`w-36 h-36 sm:w-40 sm:h-40 flex flex-col items-center justify-center cursor-pointer rounded-full border-2 backdrop-blur-sm bg-black/30 hover:bg-black/40 transition-all duration-300 ${
                    timeLimit === time.value
                      ? "ring-4 ring-primary/80 bg-primary/30 border-primary"
                      : "border-white/20 hover:border-primary/60"
                  }`}
                  onClick={() => setTimeLimit(time.value)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1 text-white">
                      {time.value < 60 ? `${time.value}s` : `${time.value / 60}m`}
                    </div>
                    <div className="text-xs text-white/80">
                      {time.description}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => onStartTest(difficulty, timeLimit)}
            size="lg"
            className="text-lg px-16 py-6 h-auto font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-md"
          >
            Start Test
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}