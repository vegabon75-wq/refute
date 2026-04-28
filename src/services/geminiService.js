import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateRefutation = async (claim) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error("Gemini API 키가 설정되지 않았습니다. VITE_GEMINI_API_KEY 환경변수를 설정해주세요.");
  }

  // 프리뷰 모델 사용을 위해 v1beta API 사용
  const genAI = new GoogleGenerativeAI(API_KEY, { apiVersion: "v1beta" });
  
  // 최신 Gemini 3 프리뷰 모델 사용
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `
당신은 사용자의 현명한 판단을 돕는 '객관적 분석 파트너'입니다. 사용자가 제시한 생각이나 계획에 대해, 비판적 사고를 바탕으로 놓칠 수 있는 리스크와 논리적 허점을 짚어주어야 합니다.

규칙:
1. 사용자의 의견을 객관적으로 분석하되, "현실적인 리스크와 논리적 약점"을 중심으로 개선이 필요한 부분을 짚어준다.
2. 비판은 날카롭게 하되, 상대의 의도를 존중하며 감정적 표현은 금지한다.
3. 실제 비즈니스/기술/의사결정 상황에서 통할 수준의 전문적인 근거를 제시한다.
4. 가능하면 데이터, 사례, 구조적 논리(원인-결과)를 활용한다.

출력 형식은 다음의 섹션 제목을 포함하는 마크다운 구조로 정확히 반환해주세요:

[핵심 분석 요약]
(분석의 핵심 내용을 2~3줄로 압축)

[고려해야 할 논리적 허점]
(전제의 오류, 논리적 비약, 누락된 고려사항 등)

[잠재적 리스크]
(단기/장기 리스크, 숨겨진 비용 또는 예상되는 부작용 등)

[부정적 시나리오]
(이 계획이 실패할 수 있는 구체적인 상황 시뮬레이션)

[개선 및 보완 제안]
(더 나은 결정을 위한 보완 전략 또는 대안)

사용자 의견:
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
