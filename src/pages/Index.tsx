import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import SetupPage from "@/components/SetupPage";
import TypingTest, { TestResults } from "@/components/TypingTest";
import ResultsPage from "@/components/ResultsPage";
import { Difficulty, TimeLimit } from "@/data/words";

type AppState = "landing" | "setup" | "test" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [testConfig, setTestConfig] = useState<{
    difficulty: Difficulty;
    timeLimit: TimeLimit;
  } | null>(null);
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const handleGetStarted = () => {
    setCurrentState("setup");
  };

  const handleStartTest = (difficulty: Difficulty, timeLimit: TimeLimit) => {
    setTestConfig({ difficulty, timeLimit });
    setCurrentState("test");
  };

  const handleTestComplete = (results: TestResults) => {
    setTestResults(results);
    setCurrentState("results");
  };

  const handleRetryTest = () => {
    if (testConfig) {
      setCurrentState("test");
    }
  };

  const handleNewTest = () => {
    setTestConfig(null);
    setTestResults(null);
    setCurrentState("setup");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleBackToSetup = () => {
    setCurrentState("setup");
  };

  return (
    <div className="min-h-screen relative">
      {currentState === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentState === "setup" && (
        <SetupPage 
          onStartTest={handleStartTest}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentState === "test" && testConfig && (
        <TypingTest
          difficulty={testConfig.difficulty}
          timeLimit={testConfig.timeLimit}
          onComplete={handleTestComplete}
          onBack={handleBackToSetup}
        />
      )}
      
      {currentState === "results" && testResults && (
        <ResultsPage
          results={testResults}
          onRetryTest={handleRetryTest}
          onNewTest={handleNewTest}
        />
      )}
    </div>
  );
};

export default Index;
