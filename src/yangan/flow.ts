import { areaLabels, type Area } from "../content";

export const questions = [
  {
    key: "area",
    title: "Hangi alanda bir fikrin var?",
    options: Object.values(areaLabels),
  },
  {
    key: "stage",
    title: "Projen şu an hangi aşamada?",
    options: [
      "Fikir aşamasında",
      "Tasarım veya içerik hazır",
      "Mevcut ürünü geliştirme",
    ],
  },
  {
    key: "time",
    title: "Ne zaman başlamayı düşünüyorsun?",
    options: ["Yakında", "Birkaç ay içinde", "Henüz belli değil"],
  },
  {
    key: "budget",
    title: "Aklında bir bütçe var mı? İstersen atlayabilirsin.",
    options: ["Henüz belli değil"],
    freeText: true,
  },
  {
    key: "detail",
    title: "Fikrini biraz anlatmak ister misin?",
    options: ["Atla"],
    freeText: true,
  },
] as const;
export type Answers = Partial<
  Record<"area" | "stage" | "time" | "budget" | "detail", string>
>;
export interface FlowState {
  step: number;
  answers: Answers;
}
export type FlowAction =
  | { type: "answer"; value: string }
  | { type: "back" }
  | { type: "edit"; step: number }
  | { type: "reset" };
export const initialFlow: FlowState = { step: 0, answers: {} };
export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  if (action.type === "reset") return initialFlow;
  if (action.type === "back" || action.type === "edit")
    return {
      ...state,
      step:
        action.type === "back"
          ? Math.max(0, state.step - 1)
          : Math.max(0, Math.min(4, action.step)),
    };
  if (state.step >= questions.length) return state;
  const answers = { ...state.answers };
  const key = questions[state.step].key;
  if (answers[key] !== action.value) {
    questions.slice(state.step + 1).forEach((question) => {
      delete answers[question.key];
    });
  }
  answers[key] = action.value;
  return { step: state.step + 1, answers };
}
export function summaryDetail(answers: Answers): string {
  return questions
    .map(
      (question) =>
        `${{ area: "Alan", stage: "Aşama", time: "Zaman", budget: "Bütçe", detail: "Detay" }[question.key]}: ${answers[question.key] || "Belirtilmedi"}`,
    )
    .join("\n");
}
export function answerArea(value?: string): Area {
  return (
    (Object.entries(areaLabels).find(
      ([, label]) => label === value,
    )?.[0] as Area) || "other"
  );
}
