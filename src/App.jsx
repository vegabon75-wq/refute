import React, { useState } from 'react';
import { RefuteInput } from './components/RefuteInput';
import { ResultDisplay } from './components/ResultDisplay';
import { generateRefutation } from './services/geminiService';

function App() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRefute = async (claim) => {
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const response = await generateRefutation(claim);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>너의 판단을 도와줄게</h1>
        <p>당신의 주장을 객관적인 시각에서 분석하고, 놓치기 쉬운 리스크와 논리를 짚어드립니다.</p>
      </header>
      
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <RefuteInput onSubmit={handleRefute} isLoading={isLoading} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {result && <ResultDisplay result={result} />}
      </main>
    </div>
  );
}

export default App;
