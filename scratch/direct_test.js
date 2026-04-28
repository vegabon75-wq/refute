import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB1Y56vuCS82uCrN5VKhZ-HJ7WadiEBkfY"; // 사용자의 새 키
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    console.log("--- Gemini API 테스트 시작 ---");
    // 1.5 Flash로 테스트
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    const response = await result.response;
    console.log("성공! 응답 내용:", response.text());
  } catch (error) {
    console.error("테스트 실패!");
    console.error("에러 메시지:", error.message);
    if (error.message.includes("404")) {
      console.error("원인: 모델이나 API 경로를 찾을 수 없습니다. (프로젝트 설정/API 활성화 필요)");
    } else if (error.message.includes("401") || error.message.includes("403")) {
      console.error("원인: API 키가 잘못되었거나 권한이 없습니다.");
    }
  }
}

test();
