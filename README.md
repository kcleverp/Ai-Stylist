#  Personal AI Fashion Stylist
> **사용자 신체 스펙 및 상황(T.P.O) 기반 Gemini AI 맞춤형 코디 제안 서비스**

이 프로젝트는 사용자의 성별, 체형(키, 체중), 선호 스타일 및 특정 상황(#결혼식 하객룩 등)을 분석하여, Gemini AI를 통해 최적화된 착장 가이드와 이미지를 생성해주는 Full-stack 어플리케이션입니다.

---

##  Current Status: "Core Logic Implemented"
현재 서비스는 핵심 추천 엔진과 프론트-백엔드-AI 파이프라인이 구축 완료된 상태입니다.

- **[Completed] User Context Analysis:** 성별, 키, 몸무게, 무드 태그를 결합한 개인화 추천.
- **[Completed] AI Image Generation:** 추천된 코디를 시각화하여 유저에게 제공.
- **[Completed] Full-Stack Data Flow:** React Native ↔ Flask(Render) ↔ Gemini API 연동 완료.

---

##  Tech Stack
- **Frontend:** React Native (Expo)
- **Backend:** Python (Flask), Gunicorn
- **AI Engine:** Google Gemini Pro {텍스트 생성:gemini-3-flash-preview, 이미지 생성: gemini-2.5-flash-image}
- **Infra:** Render.com (Deployment)

---

## 📂 Project Structure
- `/frontend`: React Native (Expo) 기반 모바일 클라이언트
- `/backend`: Flask 기반 API 서버 및 AI 프롬프트 엔진

---

##  What I'm Building Next (Current Sprint)

현재 **'실시간 환경 적응형 추천'** 기능을 고도화하고 있습니다.

### 1. Real-time Weather & Location Integration
- **OpenWeatherMap API**를 연동하여 유저의 현재 위치 기반 날씨(기온, 체감 온도, 강수 확률) 수집.
- **Context-Aware Prompting:** 날씨 데이터에 따라 소재(린넨, 울 등) 및 아이템(우산, 아우터 두께) 제약을 동적으로 추가하는 로직 구현 중.

### 2. Data Persistence
- **Supabase** 연동을 통한 유저별 코디 히스토리 저장 및 개인 옷장 데이터베이스화.

---

##  Engineering Focus
- **Async Communication:** AI 응답 지연 시간 동안 UX를 유지하기 위한 비동기 처리 및 로딩 스테이트 관리.
- **Secure Architecture:** API Key 보안을 위한 Server-side Env 관리 및 Proxy 통신 구조.
- **Exception Handling:** 네트워크 장애 및 API 데이터 무결성 오류에 대한 예외 처리 로직 적용.

---

Security Architecture Update (2026-01-05)
"Infrastructure migration for IP protection and enhanced security"

[Local Environment]          [GitHub (Public)]          [Render.com (Secure Server)]
   prompt.txt        ---X--->    (No Secrets)    <---   Secret File (prompt.txt)
   .env              ---X--->    (Code Only)     <---   Environment Variables

본 저장소는 기존 히스토리 내의 민감 정보 노출 가능성을 원천 차단하고, 서비스의 핵심 자산인 AI Prompting Logic을 보호하기 위해 아키텍처 고도화와 함께 저장소를 재구축하였습니다.

1. 주요 보안 개선 사항 (Key Improvements)
Secret Management: 프롬프트(prompt.txt) 및 이미지 생성 요구사항(image_requirements.txt)을 소스코드에서 분리하여 클라우드(Render)의 Secret Files 시스템으로 관리.

Environment Isolation: API Key 및 세부 스타일 설정값(Vibe, Quality 등)을 환경 변수(.env)로 격리하여 코드 베이스의 순수성 유지.

Prompt Injection Defense: 사용자의 악의적인 입력(Prompt Injection)으로부터 시스템 지침을 보호하기 위한 Security Guidelines 프롬프트 레이어 구축.

---

트러블슈팅: 왜 레포지토리를 새로 생성했는가?

Problem
프로젝트 초기 단계에서 민감 정보(Internal Prompts)가 포함된 설정 파일이 Git History에 포함된 것을 인지함.

단순히 파일을 삭제하거나 gitignore 처리를 하더라도 히스토리에는 잔재가 남아 비즈니스 로직 유출 위험이 존재했음.

Solution & Learning
Decision: 서비스의 장기적인 보안 안정성을 위해 레포지토리를 재생성하고, 설계 단계부터 'Security-First' 원칙을 적용함.

Learning: "보안은 사후 조치가 아닌 설계의 일부"라는 점을 깊이 깨달았으며, 이를 계기로 클라우드 네이티브 보안 도구(Secret Manager) 활용 능력을 습득함.
