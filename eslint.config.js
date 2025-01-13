import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist"], // "dist" 폴더를 ESLint 검사에서 제외
  },
  {
    extends: [
      js.configs.recommended, // JavaScript 기본 ESLint 추천 설정 적용
      ...tseslint.configs.recommended, // TypeScript ESLint 추천 설정 적용
    ],
    files: ["**/*.{ts,tsx}"], // 검사 대상 파일 확장자 지정 (TypeScript, TSX 파일만 포함)
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 버전 설정 (최대 2020)
      globals: globals.browser, // 브라우저 환경 전역 변수 설정
    },
    plugins: {
      "react-hooks": reactHooks, // React Hook 규칙을 활성화
      "react-refresh": reactRefresh, // React Refresh 관련 규칙 활성화
    },
    rules: {
      // React Hook 규칙 추가 (기본 권장 규칙 포함)
      ...reactHooks.configs.recommended.rules,

      // React Refresh 규칙: 컴포넌트 내보내기 관련 설정
      "react-refresh/only-export-components": [
        "warn", // 경고로 표시
        { allowConstantExport: true }, // 상수를 내보내는 것은 허용
      ],
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
);
