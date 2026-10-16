import { areaLabels, type Area } from "../content";

export type AnswerKey = "area" | "goal" | "stage" | "time" | "detail";
export type Answers = Partial<Record<AnswerKey, string>>;
export const answerLabels: Record<AnswerKey, string> = {
  area: "Alan",
  goal: "Amaç",
  stage: "Aşama",
  time: "Zaman",
  detail: "Detay",
};
interface Question {
  key: AnswerKey;
  title: string;
  options: readonly string[];
  freeText?: boolean;
}
const goals: Record<
  Area,
  { title: string; options: string[]; detail: string }
> = {
  web: {
    title: "Web sitenin öncelikli amacı ne olsun?",
    options: [
      "Markamı tanıtmak",
      "Talep toplamak",
      "Ürün satmak",
      "Birlikte netleştirelim",
    ],
    detail: "Ziyaretçin kim ve sitede ne yapabilsin? Kısaca anlatabilirsin.",
  },
  app: {
    title: "Nasıl bir uygulama düşünüyorsun?",
    options: [
      "Mobil uygulama",
      "Web uygulaması",
      "Mevcut uygulamayı geliştirme",
      "Birlikte netleştirelim",
    ],
    detail: "Uygulamayı kim kullanacak, hangi işi kolaylaştıracak?",
  },
  game: {
    title: "Oyun fikrinde önce neye odaklanalım?",
    options: [
      "Oynanabilir prototip",
      "Menü ve oyun arayüzü",
      "Mevcut oyunu geliştirme",
      "Birlikte netleştirelim",
    ],
    detail: "Oyuncu ne yapacak? Varsa düşündüğün platformu da yazabilirsin.",
  },
  other: {
    title: "İlk adımda neyi netleştirmek istersin?",
    options: [
      "Fikri netleştirmek",
      "Bir prototip denemek",
      "Mevcut ürünü geliştirme",
    ],
    detail: "Kimin için, hangi sorunu çözmek istiyorsun?",
  },
};
export function answerArea(value?: string): Area {
  return (
    (Object.entries(areaLabels).find(
      ([, label]) => label === value,
    )?.[0] as Area) || "other"
  );
}
export function questionsFor(answers: Answers): Question[] {
  const context = goals[answerArea(answers.area)];
  return [
    {
      key: "area",
      title: "Hangi alanda bir fikrin var?",
      options: Object.values(areaLabels),
    },
    { key: "goal", title: context.title, options: context.options },
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
    { key: "detail", title: context.detail, options: ["Atla"], freeText: true },
  ];
}
export interface FlowState {
  step: number;
  answers: Answers;
  reviewing: boolean;
}
export type FlowAction =
  | { type: "answer"; value: string }
  | { type: "back" }
  | { type: "edit"; step: number }
  | { type: "reset"; area?: Area };
export const initialFlow: FlowState = {
  step: 0,
  answers: {},
  reviewing: false,
};
export function createInitialFlow(area?: Area): FlowState {
  return area
    ? { step: 1, answers: { area: areaLabels[area] }, reviewing: false }
    : initialFlow;
}
export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  if (action.type === "reset") return createInitialFlow(action.area);
  const questions = questionsFor(state.answers);
  if (action.type === "back" || action.type === "edit")
    return {
      ...state,
      step:
        action.type === "back"
          ? Math.max(0, state.step - 1)
          : Math.max(0, Math.min(questions.length - 1, action.step)),
      reviewing: state.step >= questions.length || state.reviewing,
    };
  if (state.step >= questions.length) return state;
  const key = questions[state.step].key;
  const value = action.value.trim().slice(0, key === "detail" ? 2000 : 120);
  if (!value) return state;
  const changedArea = key === "area" && state.answers.area !== value;
  const answers: Answers = changedArea
    ? { area: value }
    : { ...state.answers, [key]: value };
  const complete = questions.every((question) => answers[question.key]);
  return {
    step: state.reviewing && complete ? questions.length : state.step + 1,
    answers,
    reviewing: changedArea ? false : state.reviewing,
  };
}

export function startingPoint(answers: Answers): {
  title: string;
  description: string;
} {
  const area = answerArea(answers.area);
  const goal = answers.goal;
  if (answers.stage === "Mevcut ürünü geliştirme" || goal?.startsWith("Mevcut"))
    return {
      title: "Mevcut deneyimi birlikte inceleyelim",
      description:
        "Önce zorlanan kullanıcı adımını belirleyip en gerekli iyileştirmeye odaklanabiliriz.",
    };
  if (area === "web") {
    if (goal === "Ürün satmak")
      return {
        title: "Satış akışını netleştirerek başlayalım",
        description:
          "Ürün keşfi, ürün detayı ve satın alma adımlarını birlikte ele alabiliriz.",
      };
    if (goal === "Talep toplamak")
      return {
        title: "Tek hedefli bir web deneyimi",
        description:
          "Hizmetini açıkça anlatan ve ziyaretçiyi proje talebine götüren bir ilk kapsam düşünebiliriz.",
      };
    return {
      title: "Markanı anlatan sade bir web sitesi",
      description:
        "Önce temel sayfaları ve ziyaretçinin atmasını istediğin adımı netleştirebiliriz.",
    };
  }
  if (area === "app")
    return {
      title: "Tek bir temel işe odaklanan ilk sürüm",
      description:
        goal === "Birlikte netleştirelim"
          ? "Önce kullanıcı ihtiyacını belirleyip mobil veya web platformunu birlikte seçebiliriz."
          : "Kullanıcının ana işini tanımlayıp önce bu akışı bir prototipte deneyebiliriz.",
    };
  if (area === "game")
    return goal === "Menü ve oyun arayüzü"
      ? {
          title: "Oyuncunun yolunu açan arayüz",
          description:
            "Ana menüden oyun içi bilgilere kadar temel ekranları birlikte inceleyebiliriz.",
        }
      : {
          title: "Bir mekaniği sınayan oynanabilir prototip",
          description:
            "İlk adımda oyunun temel eylemini küçük bir kapsamda denemeye odaklanabiliriz.",
        };
  return {
    title: "Önce ihtiyacı birlikte netleştirelim",
    description:
      "Kullanıcıyı, çözmek istediğin sorunu ve ilk somut denemeyi belirleyebiliriz.",
  };
}
export function summaryDetail(answers: Answers): string {
  const suggestion = startingPoint(answers);
  return [
    ...questionsFor(answers).map(
      (question) =>
        `${answerLabels[question.key]}: ${answers[question.key] || "Belirtilmedi"}`,
    ),
    `Başlangıç önerisi: ${suggestion.title}. ${suggestion.description}`,
  ].join("\n");
}
