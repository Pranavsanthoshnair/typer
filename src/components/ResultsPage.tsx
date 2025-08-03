import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Target, Clock, Type, RotateCcw, Settings, Share2 } from "lucide-react";
import { TestResults } from "./TypingTest";

interface ResultsPageProps {
  results: TestResults;
  onRetryTest: () => void;
  onNewTest: () => void;
}

export default function ResultsPage({ results, onRetryTest, onNewTest }: ResultsPageProps) {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 70) return { rating: "Excellent", color: "text-green-400", emoji: "🚀" };
    if (wpm >= 50) return { rating: "Great", color: "text-blue-400", emoji: "⭐" };
    if (wpm >= 30) return { rating: "Good", color: "text-yellow-400", emoji: "👍" };
    return { rating: "Keep Practicing", color: "text-orange-400", emoji: "💪" };
  };

  const getAccuracyRating = (accuracy: number) => {
    if (accuracy >= 95) return { rating: "Perfect", color: "text-green-400" };
    if (accuracy >= 85) return { rating: "Excellent", color: "text-blue-400" };
    if (accuracy >= 75) return { rating: "Good", color: "text-yellow-400" };
    return { rating: "Needs Work", color: "text-orange-400" };
  };

  const wpmRating = getWpmRating(results.wpm);
  const accuracyRating = getAccuracyRating(results.accuracy);

  const shareScore = () => {
    const text = `I just scored ${results.wpm} WPM with ${results.accuracy}% accuracy on Typer! 🎯`;
    if (navigator.share) {
      navigator.share({
        title: "My Typing Test Results",
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      // You could add a toast notification here
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="glass-card p-6 rounded-full">
              <Trophy className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
            Test Complete!
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <span className={getDifficultyColor(results.difficulty)}>
              {results.difficulty.charAt(0).toUpperCase() + results.difficulty.slice(1)}
            </span>
            <span>•</span>
            <span>{results.timeLimit}s</span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WPM Card */}
          <Card className="glass-card p-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Type className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Words Per Minute</h2>
            </div>
            
            <div className="space-y-2">
              <div className="text-6xl font-bold text-primary">
                {results.wpm}
              </div>
              <div className={`text-lg font-medium ${wpmRating.color}`}>
                {wpmRating.emoji} {wpmRating.rating}
              </div>
            </div>
          </Card>

          {/* Accuracy Card */}
          <Card className="glass-card p-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Accuracy</h2>
            </div>
            
            <div className="space-y-2">
              <div className="text-6xl font-bold text-primary">
                {results.accuracy}%
              </div>
              <div className={`text-lg font-medium ${accuracyRating.color}`}>
                {accuracyRating.rating}
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card p-4 text-center">
            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{results.timeSpent}s</div>
            <div className="text-sm text-muted-foreground">Time Taken</div>
          </Card>
          
          <Card className="glass-card p-4 text-center">
            <Type className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{results.correctCharacters}</div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </Card>
          
          <Card className="glass-card p-4 text-center">
            <Target className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{results.incorrectCharacters}</div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </Card>
          
          <Card className="glass-card p-4 text-center">
            <Type className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{results.totalCharacters}</div>
            <div className="text-sm text-muted-foreground">Total Chars</div>
          </Card>
        </div>

        {/* Progress Visualization */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Performance Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Correct Characters</span>
                <span>{Math.round((results.correctCharacters / results.totalCharacters) * 100)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400"
                  style={{ width: `${(results.correctCharacters / results.totalCharacters) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Speed vs Target (40 WPM)</span>
                <span>{Math.min(Math.round((results.wpm / 40) * 100), 200)}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${Math.min((results.wpm / 40) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={onRetryTest}
            className="glass-button p-6 h-auto text-lg font-semibold"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Retry Test
          </Button>
          
          <Button 
            onClick={onNewTest}
            variant="outline"
            className="glass-button p-6 h-auto text-lg font-semibold"
          >
            <Settings className="h-5 w-5 mr-2" />
            New Test
          </Button>
          
          <Button 
            onClick={shareScore}
            variant="outline"
            className="glass-button p-6 h-auto text-lg font-semibold"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Score
          </Button>
        </div>

        {/* Tips */}
        <Card className="glass-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">💡 Pro Tip</h3>
          <p className="text-muted-foreground">
            {results.wpm < 30 
              ? "Practice typing without looking at the keyboard to improve your speed!"
              : results.accuracy < 85
              ? "Focus on accuracy first - speed will naturally follow!"
              : "Great job! Try the harder difficulty level for a new challenge!"
            }
          </p>
        </Card>
      </div>
    </div>
  );
}