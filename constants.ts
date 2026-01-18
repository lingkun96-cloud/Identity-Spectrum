import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "当您想到您在浪漫或性方面被谁吸引时，您会想到哪种性别？",
    options: [
      { label: "仅限与我性别相同的人", value: "same_gender" },
      { label: "仅限与我性别不同的人", value: "different_gender" },
      { label: "我的性别和其他性别的人", value: "multiple_genders" },
      { label: "性别并不是我被吸引的因素", value: "gender_blind" },
      { label: "我很少或从未感受到性/浪漫吸引", value: "little_attraction" },
    ],
  },
  {
    id: 2,
    text: "您如何描述您对这种性欲的强度？",
    options: [
      { label: "它是自然且经常发生的", value: "allosexual" },
      { label: "只有在建立深厚的情感纽带后，我才会感觉到", value: "demisexual" },
      { label: "我能感受到浪漫吸引，但很少或没有性欲望", value: "ace_spectrum" },
      { label: "它是流动的，会随时间变化", value: "fluid" },
    ],
  },
  {
    id: 3,
    text: "在一段关系中，关于伴侣的身份，您最看重什么？",
    options: [
      { label: "他们的个性与灵魂，不论身体或性别", value: "pan_hearts" },
      { label: "我对特定的性别表达有偏好", value: "preferences" },
      { label: "我被阳刚气质（Masculinity）所吸引", value: "andro" },
      { label: "我被阴柔气质（Femininity）所吸引", value: "gyno" },
      { label: "我欣赏两者的结合或两者皆非", value: "queer_attraction" },
    ],
  },
  {
    id: 4,
    text: "您对贴在您身上的“直人”或“异性恋”标签有何感觉？",
    options: [
      { label: "它完全适合我", value: "straight_fit" },
      { label: "感觉完全不对", value: "not_straight" },
      { label: "感觉太局限或部分不正确", value: "limiting" },
      { label: "我不喜欢任何标签", value: "no_labels" },
    ],
  },
  {
    id: 5,
    text: "随着时间的推移，您的吸引力是否有显著变化？",
    options: [
      { label: "没有，我一直感觉是一样的", value: "static" },
      { label: "是的，我的吸引力是流动和变化的（如“双性恋周期”）", value: "fluidity" },
      { label: "我还在探索中", value: "questioning" },
    ],
  },
  {
    id: 6,
    text: "您的浪漫情感（想要约会/建立联系）与您的性欲望（想要身体亲密）是否一致？",
    options: [
      { label: "完全一致，我喜欢的人也是我想亲密的人", value: "consistent_attraction" },
      { label: "不一致，我在浪漫和性方面被不同的人吸引", value: "split_attraction" },
      { label: "我不确定或这很复杂", value: "unsure_split" },
    ]
  },
  {
    id: 7,
    text: "您更容易被一个人的性别认同（他们是谁）吸引，还是被他们的性别表达（他们的外表/打扮）吸引？",
    options: [
      { label: "性别认同更重要", value: "identity_focus" },
      { label: "性别表达（如阳刚/阴柔气质）更重要", value: "expression_focus" },
      { label: "两者都重要", value: "both_matter" },
      { label: "两者都不重要", value: "neither_matters" },
    ]
  },
  {
    id: 8,
    text: "在理想情况下，您倾向于哪种关系结构？",
    options: [
      { label: "严格的一对一（专一）关系", value: "monogamous" },
      { label: "开放式关系或多角恋（Polyamory）", value: "polyamorous" },
      { label: "独自一人或非传统的亲密关系", value: "solo_relationship" },
      { label: "我不确定", value: "questioning_structure" },
    ]
  }
];

// Fallback gradients if Gemini doesn't return colors or for standard mapping
export const FLAG_PRESETS: Record<string, string[]> = {
  "Lesbian": ["#D52D00", "#EF7627", "#FF9A56", "#FFFFFF", "#D162A4", "#B55690", "#A30262"],
  "Gay": ["#078D70", "#26CEAA", "#98E8C1", "#FFFFFF", "#7BADE2", "#5049CC", "#3D1A78"],
  "Bisexual": ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
  "Pansexual": ["#FF218C", "#FFD800", "#21B1FF"],
  "Asexual": ["#000000", "#A3A3A3", "#FFFFFF", "#800080"],
  "Transgender": ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
  "Non-binary": ["#FCF434", "#FFFFFF", "#9C59D1", "#2C2C2C"],
  "Genderqueer": ["#B57EDC", "#FFFFFF", "#4A8123"],
  "Genderfluid": ["#FF75A2", "#FFFFFF", "#BE18D6", "#000000", "#333EBD"],
  "Agender": ["#000000", "#BCC4C7", "#FFFFFF", "#B9F480", "#FFFFFF", "#BCC4C7", "#000000"],
  "Aromantic": ["#3DA542", "#A7D379", "#FFFFFF", "#A9A9A9", "#000000"],
  "Polysexual": ["#F61CB9", "#07D569", "#1C92F6"],
  "Demisexual": ["#FFFFFF", "#FFFFFF", "#800080", "#A3A3A3", "#000000"], 
  "Polyamory": ["#0000F9", "#F60000", "#000000"],
};