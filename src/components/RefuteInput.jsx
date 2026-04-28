import React, { useState } from 'react';
import { Loader, Send } from 'lucide-react';

export const RefuteInput = ({ onSubmit, isLoading }) => {
  const [claim, setClaim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (claim.trim() && !isLoading) {
      onSubmit(claim);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className="glass-panel">
      <form onSubmit={handleSubmit}>
        <div className="textarea-wrapper">
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="어떤 주장이든 입력해 보세요. AI가 논리적 허점을 찾아 철저히 반박합니다.&#10;(예: 넷플릭스처럼 전 직원에게 무제한 휴가를 도입해야 한다.)"
            disabled={isLoading}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1.2rem' }}>
            * 감정을 배제하고 현실적인 리스크와 논리적 약점만을 공격합니다.<br/>
            (Ctrl + Enter 제출 지원)
          </p>
          <button type="submit" className="btn-submit" disabled={!claim.trim() || isLoading}>
            {isLoading ? (
              <>
                <Loader className="spinner" size={18} />
                분석 중...
              </>
            ) : (
              <>
                <Send size={18} />
                논리적 반박 생성하기
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
