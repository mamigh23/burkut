import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ArrowRight,
  CircleAlert,
  Sparkles,
} from "lucide-react";
import { areaLabels, type Area } from "../content";
import {
  validateProject,
  type ProjectData,
  type Errors,
} from "../services/demo";
import { Eyebrow } from "../components/UI";
import {
  submitProject,
  ProjectSubmissionError,
  projectSubmissionEnabled,
} from "../services/projects";
import { projectLimits } from "../shared/project";

export interface Draft {
  area: Area;
  detail: string;
  budget: string;
}
const empty: ProjectData = {
  areas: [],
  name: "",
  email: "",
  phone: "",
  company: "",
  detail: "",
  budget: "",
};
const fieldLabels: Record<keyof ProjectData, string> = {
  areas: "Proje türü",
  name: "Ad soyad",
  email: "E-posta",
  phone: "Telefon",
  company: "Kurum / marka",
  detail: "Fikrinden bahset",
  budget: "Bütçe",
};
function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="field-error">
      <CircleAlert size={15} aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
export default function Contact({ draft }: { draft: Draft | null }) {
  const [data, setData] = useState<ProjectData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const requestKey = useRef<{ payload: string; key: string } | null>(null);
  const errorFields = (Object.keys(errors) as (keyof ProjectData)[]).filter(
    (key) => !!errors[key],
  );
  const focusError = (next: Errors) => {
    const first = Object.keys(next)[0];
    if (first)
      form.current
        ?.querySelector<HTMLElement>(
          `[name="${first}"], [data-field="${first}"]`,
        )
        ?.focus();
  };
  useEffect(() => {
    if (draft) {
      setErrors({});
      setData((current) => ({
        ...current,
        areas: [draft.area],
        detail: draft.detail,
        budget: draft.budget,
      }));
      setStatus("Yangan proje özetin forma aktarıldı.");
    }
  }, [draft]);
  const update = (key: keyof ProjectData, value: string) => {
    const next = { ...data, [key]: value };
    setData(next);
    setErrors((current) => ({
      ...current,
      [key]: current[key] ? validateProject(next)[key] : undefined,
    }));
    setStatus("");
  };
  const submit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const next = validateProject(data);
    setErrors(next);
    setStatus("");
    if (Object.keys(next).length) {
      requestAnimationFrame(() => focusError(next));
      return;
    }
    setBusy(true);
    try {
      const payload = JSON.stringify(data);
      if (requestKey.current?.payload !== payload)
        requestKey.current = { payload, key: crypto.randomUUID() };
      const result = await submitProject(data, requestKey.current!.key);
      setStatus(result.message);
    } catch (error) {
      if (error instanceof ProjectSubmissionError) {
        setErrors(error.errors);
        requestAnimationFrame(() => focusError(error.errors));
      }
      setStatus(
        error instanceof Error
          ? error.message
          : "Kontrol tamamlanamadı. Yazdıkların korundu.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="contact-wrap" id="iletisim">
      <div className="contact-panel">
        <div className="container contact-layout">
          <div className="contact-copy">
            <Eyebrow light>BİRLİKTE BAŞLAYALIM</Eyebrow>
            <h2>
              Bir sonraki
              <br />
              fikrin,{" "}
              <span>
                burada
                <br />
                başlasın.
              </span>
            </h2>
            <p>
              Bir web sitesi, yeni bir uygulama, bir oyun dünyası.
              <br />
              Aklındakini birkaç cümleyle anlat.
            </p>
            <div className="contact-steps">
              <span>
                01 <b>Fikrini paylaş</b>
              </span>
              <ArrowRight size={16} />
              <span>
                02 <b>Birlikte netleştirelim</b>
              </span>
            </div>
          </div>
          <form
            ref={form}
            className="contact-form"
            noValidate
            aria-busy={busy}
            onSubmit={submit}
          >
            <div className="form-heading">
              <h3>Projeni anlat.</h3>
            </div>
            <p className="form-subtitle">
              İyi bir başlangıç için birkaç küçük detay.
            </p>
            {errorFields.length > 0 && (
              <div className="form-guidance">
                <div className="form-guidance-heading">
                  <span className="form-guidance-icon" aria-hidden="true">
                    <Sparkles size={18} />
                  </span>
                  <div role="status" aria-live="polite">
                    <strong>Birkaç küçük detay kaldı.</strong>
                    <p>
                      {errorFields.length} alanı tamamlayıp devam edebilirsin.
                    </p>
                  </div>
                </div>
                <div
                  className="form-error-links"
                  role="group"
                  aria-label="Kontrol edilecek alanlar"
                >
                  {errorFields.map((field) => (
                    <button
                      type="button"
                      key={field}
                      onClick={() => focusError({ [field]: errors[field] })}
                    >
                      {fieldLabels[field]}{" "}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <fieldset
              className={errors.areas ? "area-fieldset-invalid" : undefined}
              aria-describedby={errors.areas ? "areas-error" : undefined}
            >
              <legend>
                Ne geliştirmek istiyorsun? <span>*</span>
              </legend>
              <div className="area-options">
                {Object.entries(areaLabels).map(([id, label]) => (
                  <label key={id}>
                    <input
                      data-field="areas"
                      type="checkbox"
                      disabled={busy}
                      checked={data.areas.includes(id as Area)}
                      onChange={(event) => {
                        setData({
                          ...data,
                          areas: event.target.checked
                            ? [...data.areas, id as Area]
                            : data.areas.filter((area) => area !== id),
                        });
                        setErrors((current) => ({
                          ...current,
                          areas: undefined,
                        }));
                        setStatus("");
                      }}
                    />
                    <span>
                      {data.areas.includes(id as Area) && <Check size={13} />}
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.areas && (
                <FieldError id="areas-error">{errors.areas}</FieldError>
              )}
            </fieldset>
            <div className="form-grid">
              {(
                [
                  {
                    key: "name",
                    label: "Ad soyad",
                    required: true,
                    auto: "name",
                    type: "text",
                    placeholder: "Adın ve soyadın",
                  },
                  {
                    key: "email",
                    label: "E-posta",
                    required: true,
                    auto: "email",
                    type: "email",
                    placeholder: "E-posta adresin",
                  },
                  {
                    key: "phone",
                    label: "Telefon",
                    required: false,
                    auto: "tel",
                    type: "tel",
                    placeholder: "İsteğe bağlı",
                  },
                  {
                    key: "company",
                    label: "Kurum / marka",
                    required: false,
                    auto: "organization",
                    type: "text",
                    placeholder: "İsteğe bağlı",
                  },
                ] as const
              ).map((field) => (
                <div className="form-field" key={field.key}>
                  <label htmlFor={`contact-${field.key}`}>
                    {field.label}
                    {field.required && <span> *</span>}
                  </label>
                  <input
                    id={`contact-${field.key}`}
                    name={field.key}
                    type={field.type}
                    autoComplete={field.auto}
                    disabled={busy}
                    value={data[field.key]}
                    maxLength={projectLimits[field.key]}
                    placeholder={field.placeholder}
                    required={field.required}
                    aria-invalid={!!errors[field.key]}
                    aria-describedby={
                      errors[field.key] ? `${field.key}-error` : undefined
                    }
                    onChange={(event) => update(field.key, event.target.value)}
                  />
                  {errors[field.key] && (
                    <FieldError id={`${field.key}-error`}>
                      {errors[field.key]!}
                    </FieldError>
                  )}
                </div>
              ))}
            </div>
            <div className="form-field">
              <label htmlFor="contact-detail">
                Fikrinden bahset <span>*</span>
              </label>
              <textarea
                id="contact-detail"
                name="detail"
                rows={4}
                disabled={busy}
                placeholder="Neyi hayata geçirmek istiyorsun?"
                value={data.detail}
                maxLength={projectLimits.detail}
                required
                aria-invalid={!!errors.detail}
                aria-describedby={
                  errors.detail ? "detail-count detail-error" : "detail-count"
                }
                onChange={(event) => update("detail", event.target.value)}
              />
              <span id="detail-count" className="field-count">
                {data.detail.length} / {projectLimits.detail} karakter
              </span>
              {errors.detail && (
                <FieldError id="detail-error">{errors.detail}</FieldError>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-budget">
                Bütçe <span className="optional">/ İSTEĞE BAĞLI</span>
              </label>
              <input
                id="contact-budget"
                name="budget"
                disabled={busy}
                placeholder="Henüz belli değil"
                value={data.budget}
                maxLength={projectLimits.budget}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
                onChange={(event) => update("budget", event.target.value)}
              />
              {errors.budget && (
                <FieldError id="budget-error">{errors.budget}</FieldError>
              )}
            </div>
            <p className="form-privacy">
              {projectSubmissionEnabled
                ? "Gönderdiğin bilgiler proje talebini değerlendirmek için kullanılır."
                : "Bilgilerin bu sayfada kalır. Gönderim bağlantısı henüz açık değil."}
            </p>
            <button
              className="button form-submit"
              disabled={busy}
              type="submit"
            >
              {busy
                ? projectSubmissionEnabled
                  ? "Gönderiliyor…"
                  : "Özet kontrol ediliyor…"
                : projectSubmissionEnabled
                  ? "Proje Özetini Gönder"
                  : "Proje Özetini Kontrol Et"}
              <ArrowUpRight size={18} />
            </button>
            <div className="form-status" role="status">
              {status}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
