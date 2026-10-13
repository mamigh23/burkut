import type { Area } from "../content";

export interface ProjectData {
  areas: Area[];
  name: string;
  email: string;
  phone: string;
  company: string;
  detail: string;
  budget: string;
}
export type Errors = Partial<Record<keyof ProjectData, string>>;
export const projectLimits = {
  name: 120,
  email: 254,
  phone: 120,
  company: 120,
  detail: 4000,
  budget: 120,
} as const;
const areas = new Set<Area>(["web", "app", "game", "other"]);
export function validateProject(data: ProjectData): Errors {
  const errors: Errors = {};
  if (!data.areas.length || data.areas.some((area) => !areas.has(area)))
    errors.areas = "En az bir geçerli proje alanı seçmelisin.";
  if (!data.name.trim()) errors.name = "Adını ve soyadını yazmalısın.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Geçerli bir e-posta adresi yazmalısın.";
  if (!data.detail.trim())
    errors.detail = "Fikrini birkaç cümleyle anlatmalısın.";
  for (const key of Object.keys(
    projectLimits,
  ) as (keyof typeof projectLimits)[]) {
    if (data[key].length > projectLimits[key])
      errors[key] = `En fazla ${projectLimits[key]} karakter yazabilirsin.`;
    if (
      data[key].includes("\0") ||
      (key !== "detail" && /[\r\n]/.test(data[key]))
    )
      errors[key] = "Bu alan tek satır olmalı.";
  }
  return errors;
}
export function parseProject(value: unknown): {
  data?: ProjectData;
  errors: Errors;
} {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { errors: { detail: "Geçerli bir proje özeti gerekli." } };
  const input = value as Record<string, unknown>;
  const data = { areas: [] } as unknown as ProjectData;
  const errors: Errors = {};
  for (const key of Object.keys(
    projectLimits,
  ) as (keyof typeof projectLimits)[]) {
    if (
      input[key] === undefined &&
      ["phone", "company", "budget"].includes(key)
    )
      data[key] = "";
    else if (typeof input[key] !== "string") {
      data[key] = "";
      errors[key] = "Geçerli bir metin yazmalısın.";
    } else data[key] = input[key];
  }
  if (
    !Array.isArray(input.areas) ||
    input.areas.length > 4 ||
    input.areas.some((area) => !areas.has(area as Area))
  ) {
    errors.areas = "Geçerli proje alanları seçmelisin.";
  } else data.areas = [...new Set(input.areas)] as Area[];
  const validated = { ...validateProject(data), ...errors };
  if (Object.keys(validated).length) return { errors: validated };
  for (const key of Object.keys(
    projectLimits,
  ) as (keyof typeof projectLimits)[])
    data[key] = data[key].trim();
  return { data, errors: {} };
}
