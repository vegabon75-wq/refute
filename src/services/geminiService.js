import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateRefutation = async (claim) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("Gemini API 키가 설정되지 않았습니다. VITE_GEMINI_API_KEY 환경변수를 설정해주세요.");
  }

  // 사용자 프로젝트 기반 최신 모델 설정 (v1 API 사용)
  const genAI = new GoogleGenerativeAI(API_KEY, { apiVersion: "v1beta" });
  
  // 안정적인 Gemini 1.5 Flash 모델 사용
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
당신은 'AI 반박 생성기'입니다. 사용자가 제시한 주장에 대해 감정이 아닌 논리 기반으로 가장 설득력 있는 반박을 생성해야 합니다.

규칙:
1. 무조건 반박하되, 억지나 트집이 아닌 "현실적인 리스크와 논리적 약점" 중심으로 공격한다.
2. 비판은 날카롭게 하되, 인신공격/감정적 표현은 금지한다.
3. 실제 비즈니스/기술/의사결정 상황에서 통할 수준의 근거를 제시한다.
4. 가능하면 데이터, 사례, 구조적 논리(원인-결과)를 활용한다.

출력 형식은 다음의 섹션 제목을 포함하는 마크다운 구조로 정확히 반환해주세요:

[요약 반박]
(핵심 반박을 2~3줄로 압축)

[핵심 문제점]
(논리적 허점, 전제의 오류, 누락된 고려사항 등)

[리스크 분석]
(단기 리스크, 장기 리스크, 숨겨진 비용 또는 부작용 등)

[반대 시나리오]
(이 선택이 실패하는 구체적인 상황 시뮬레이션)

[대안 제시]
(더 나은 선택 또는 보완 전략)

사용자 주장:
"${claim}"
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("현실적인 문제로 인해 반박을 생성하지 못했습니다. 다시 시도해주세요.");
  }
};
