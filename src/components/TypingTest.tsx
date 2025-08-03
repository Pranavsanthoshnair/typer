import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Timer, Target, Keyboard } from "lucide-react";
import { Difficulty, TimeLimit, generateText } from "@/data/words";

interface TypingTestProps {
  difficulty: Difficulty;
  timeLimit: TimeLimit;
  onComplete: (results: TestResults) => void;
  onBack: () => void;
}

export interface TestResults {
  wpm: number;
  accuracy: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  timeSpent: number;
  difficulty: Difficulty;
  timeLimit: TimeLimit;
}

export default function TypingTest({ difficulty, timeLimit, onComplete, onBack }: TypingTestProps) {
  const [text] = useState(() => generateText({ difficulty, timeLimit }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const completeTest = useCallback(() => {
    // Prevent multiple completions
    if (isCompleted) return;
    
    // Mark as completed first to prevent race conditions
    setIsCompleted(true);
    
    // Ensure we have a valid start time
    const endTime = Date.now();
    const effectiveStartTime = startTime || endTime - (timeLimit * 1000);
    const timeSpent = (endTime - effectiveStartTime) / 1000;
    
    // Calculate results
    const correctChars = Math.max(0, currentIndex - errors.size);
    const totalChars = currentIndex;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    const wpm = totalChars > 0 ? (correctChars / 5) / (timeSpent / 60) : 0;

    const results: TestResults = {
      wpm: Math.max(0, Math.round(wpm)),
      accuracy: Math.max(0, Math.min(100, Math.round(accuracy))),
      totalCharacters: Math.max(0, totalChars),
      correctCharacters: Math.max(0, correctChars),
      incorrectCharacters: Math.max(0, errors.size),
      timeSpent: Math.max(1, Math.round(timeSpent)),
      difficulty,
      timeLimit
    };

    // Ensure we have valid results before calling onComplete
    if (results.timeSpent > 0) {
      onComplete(results);
    } else {
      // Fallback in case something goes wrong
      console.error('Invalid timeSpent in test results', results);
      onComplete({
        ...results,
        timeSpent: timeLimit,
        wpm: 0,
        accuracy: 0
      });
    }
  }, [isCompleted, startTime, timeLimit, currentIndex, errors.size, difficulty, onComplete]);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isStarted || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          completeTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isCompleted, completeTest]);

  // Handle test completion when reaching end of text
  useEffect(() => {
    if (!isCompleted && currentIndex >= text.length) {
      completeTest();
    }
  }, [currentIndex, text.length, isCompleted, completeTest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start the test on first keystroke
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    // Don't allow input if test is completed
    if (isCompleted) return;

    const newIndex = value.length;
    
    // Check if we've reached the end of text
    if (newIndex >= text.length) {
      setCurrentIndex(text.length);
      setUserInput(value);
      completeTest();
      return;
    }

    // Update input and current index
    setUserInput(value);
    setCurrentIndex(newIndex);

    // Track errors
    const newErrors = new Set(errors);
    for (let i = 0; i < value.length && i < text.length; i++) {
      if (value[i] !== text[i]) {
        newErrors.add(i);
      } else {
        newErrors.delete(i);
      }
    }
    setErrors(newErrors);
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = "text-untyped";
      
      if (index < currentIndex) {
        if (errors.has(index)) {
          className = "text-incorrect";
        } else {
          className = "text-correct";
        }
      } else if (index === currentIndex) {
        className = "typing-cursor";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const progress = (currentIndex / text.length) * 100;
  const currentWpm = startTime ? Math.round(((currentIndex - errors.size) / 5) / ((Date.now() - startTime) / 60000)) : 0;
  const currentAccuracy = currentIndex > 0 ? Math.round(((currentIndex - errors.size) / currentIndex) * 100) : 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      {/* Header */}
      <div className="glass-card p-6 w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="glass-button p-3"
            disabled={isStarted && !isCompleted}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              <span className="font-mono text-2xl font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg">
                {currentWpm} WPM
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg">
                {currentAccuracy}%
              </span>
            </div>
          </div>
          
          <div></div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {currentIndex} / {text.length} characters
          </p>
        </div>
      </div>

      {/* Text Display */}
      <div className="glass-card p-8 w-full max-w-6xl">
        <div className="text-xl leading-relaxed font-mono tracking-wide select-none">
          {renderText()}
        </div>
      </div>

      {/* Input */}
      <div className="glass-card p-6 w-full max-w-6xl">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          className="w-full p-4 text-xl font-mono bg-transparent border-2 border-white/20 rounded-xl 
                     focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={isStarted ? "Keep typing..." : "Start typing to begin the test..."}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {!isStarted && "The timer will start when you begin typing"}
          {isStarted && !isCompleted && "Keep going! The test will end when time runs out or you finish the text."}
          {isCompleted && "Test completed! Calculating results..."}
        </div>
      </div>
    </div>
  );
}