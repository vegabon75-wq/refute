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
        <h1>AI 반박 생성기</h1>
        <p>어떤 주장이든 감정을 배제하고 철저한 논리와 리스크 기반으로 파훼합니다.</p>
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
