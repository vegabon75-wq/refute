import React from 'react';
import { 
  AlertTriangle, 
  Target, 
  TrendingDown, 
  GitBranch, 
  Lightbulb 
} from 'lucide-react';

export const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const sections = [
    { key: 'summary', title: '요약 반박', icon: <Target color="var(--primary)" size={20} />, className: 'section-summary' },
    { key: 'weakness', title: '핵심 문제점', icon: <AlertTriangle color="var(--danger)" size={20} />, className: 'section-weakness' },
    { key: 'risk', title: '리스크 분석', icon: <TrendingDown color="var(--warning)" size={20} />, className: 'section-risk' },
    { key: 'scenario', title: '반대 시나리오', icon: <GitBranch color="var(--accent)" size={20} />, className: 'section-scenario' },
    { key: 'alternative', title: '대안 제시', icon: <Lightbulb color="var(--success)" size={20} />, className: 'section-alternative' }
  ];

  const extractSection = (title) => {
    // 텍스트 내에서 [섹션 타이틀] 또는 ## [섹션 타이틀]로 시작하는 부분부터 다음 섹션 전까지 추출
    const regex = new RegExp(`(?:\\[${title}\\]|## \\[${title}\\])([\\s\\S]*?)(?=(?:\\[[^\\]]+\\]|## \\[[^\\]]+\\]|$))`);
    const match = result.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  };

  return (
    <div className="result-container">
      {sections.map((sec) => {
        const content = extractSection(sec.title);
        // 섹션을 찾지 못했으면 렌더링 생략
        if (!content) return null;

        return (
          <div key={sec.key} className={`glass-panel result-section ${sec.className}`}>
             <h3>
               {sec.icon}
               {sec.title}
             </h3>
             <div className="content">
               <p>{content}</p>
             </div>
          </div>
        );
      })}
      
      {/* 혹시라도 파싱이 실패해서 화면에 아무것도 안나온다면 원본 문자열이라도 출력하기 위함 */}
      {sections.every(sec => !extractSection(sec.title)) && (
        <div className="glass-panel result-section">
          <h3><Target color="var(--primary)" size={20} /> 전체 반박 내용</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};
