export type QType = "单选" | "判断";

export type Option = {
  key: string;
  html: string;
  isImage: boolean;
};

export type Question = {
  id: number;
  type: QType;
  stem: string;
  options: Option[];
  answer: string;
  explain: string;
  serial: string;
};

export type PracticeMode = "seq" | "rand" | "wrong" | "fav";

export type ExamRecord = {
  id: string;
  at: number;
  total: number;
  correct: number;
  seconds: number;
  passed: boolean;
};
