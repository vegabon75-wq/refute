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
            placeholder="분석이 필요한 생각이나 계획을 입력해 보세요. 놓치기 쉬운 리스크와 논리적 허점을 짚어드립니다.&#10;(예: 우리 회사도 전 직원에게 무제한 휴가를 도입해야 할까?)"
            disabled={isLoading}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1.2rem' }}>
            * 주관을 배제하고 객관적인 리스크와 개선이 필요한 논리적 약점을 분석합니다.<br/>
            (Ctrl + Enter 제출 지원)
          </p>
          <button type="submit" className="btn-submit" disabled={!claim.trim() || isLoading}>
            {isLoading ? (
              <>
                <Loader className="spinner" size={18} />
                판단 근거 분석 중...
              </>
            ) : (
              <>
                <Send size={18} />
                객관적인 판단 도움받기
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
