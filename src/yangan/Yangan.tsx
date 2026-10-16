import { useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { YanganMark } from "../components/UI";
import { ChatError, chatEnabled, replyToChat } from "../services/chat";
import {
  answerArea,
  answerLabels,
  createInitialFlow,
  flowReducer,
  questionsFor,
  startingPoint,
  summaryDetail,
} from "./flow";
import type { Draft } from "../sections/Contact";
import { areaLabels, type Area } from "../content";

interface Message {
  role: "assistant" | "user";
  content: string;
}
export default function Yangan({
  open,
  setOpen,
  onDraft,
  initialArea,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onDraft: (draft: Draft) => void;
  initialArea?: Area;
}) {
  const [mode, setMode] = useState<"welcome" | "flow" | "chat">("welcome");
  const [flow, dispatch] = useReducer(
    flowReducer,
    initialArea,
    createInitialFlow,
  );
  const questions = questionsFor(flow.answers);
  const suggestion = startingPoint(flow.answers);
  const isSummary = mode === "flow" && flow.step >= questions.length;
  const firstStep =
    initialArea &&
    flow.answers.area === areaLabels[initialArea] &&
    flow.step > 0
      ? 1
      : 0;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [unread, setUnread] = useState(false);
  const [busy, setBusy] = useState(false);
  const [chatError, setChatError] = useState("");
  const pending = useRef<AbortController | null>(null);
  const requestVersion = useRef(0);
  useEffect(
    () => () => {
      requestVersion.current++;
      pending.current?.abort();
    },
    [],
  );
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, setOpen]);
  useEffect(() => {
    if (open) closeButton.current?.focus();
    else if (wasOpen.current) launcher.current?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    if (mode === "flow") {
      panel.current
        ?.querySelector<HTMLElement>(
          ".chat-options button, .flow-summary h3",
        )
        ?.focus({ preventScroll: true });
    } else if (mode === "chat") {
      panel.current?.querySelector<HTMLInputElement>("#chat-input")?.focus();
    }
  }, [open, mode, flow.step]);
  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    const resize = () => {
      if (panel.current) {
        panel.current.style.setProperty(
          "--keyboard-inset",
          `${Math.max(0, window.innerHeight - (viewport?.height || window.innerHeight) - (viewport?.offsetTop || 0))}px`,
        );
        panel.current.style.setProperty(
          "--chat-viewport-height",
          `${viewport?.height || window.innerHeight}px`,
        );
        if (nearBottom.current && scroll.current)
          scroll.current.scrollTop = scroll.current.scrollHeight;
      }
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
    };
  }, [open]);
  useEffect(() => {
    if (isSummary && scroll.current) scroll.current.scrollTop = 0;
    else if (nearBottom.current && scroll.current)
      scroll.current.scrollTop = scroll.current.scrollHeight;
    else if (messages.length) setUnread(true);
  }, [messages, mode, flow.step, busy, chatError, isSummary]);
  const close = () => {
    setOpen(false);
  };
  const reset = () => {
    requestVersion.current++;
    pending.current?.abort();
    setBusy(false);
    setChatError("");
    dispatch({ type: "reset", area: initialArea });
    setMode("welcome");
    setMessages([]);
    setInput("");
    setAnnouncement("Yeni konuşma başladı.");
    setUnread(false);
    nearBottom.current = true;
  };
  const answer = (value: string) => {
    const action = {
      type: "answer",
      value: value === "Atla" ? "Belirtilmedi" : value,
    } as const;
    const next = flowReducer(flow, action);
    dispatch(action);
    setInput("");
    setAnnouncement(
      questionsFor(next.answers)[next.step]?.title ?? "Proje özetin hazır.",
    );
    nearBottom.current = true;
  };
  const requestReply = async (next: Message[]) => {
    const version = ++requestVersion.current;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    setChatError("");
    setAnnouncement("Yangan yanıtlıyor.");
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const reply = await replyToChat(next, controller.signal);
      if (version !== requestVersion.current) return;
      setMessages([...next, { role: "assistant", content: reply }]);
      setAnnouncement(reply);
    } catch (error) {
      if (version !== requestVersion.current) return;
      setChatError(
        error instanceof ChatError
          ? error.message
          : "Yanıt alınamadı. Tekrar deneyebilir veya fikrini proje özetine dönüştürebilirsin.",
      );
      setAnnouncement("Yanıt alınamadı.");
    } finally {
      clearTimeout(timeout);
      if (version === requestVersion.current) {
        setBusy(false);
        pending.current = null;
      }
    }
  };
  const send = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || busy) return;
    if (mode === "flow") {
      answer(value);
      return;
    }
    const history =
      messages.at(-1)?.role === "user" ? messages.slice(0, -1) : messages;
    const next: Message[] = [...history, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    void requestReply(next);
  };
  const current = questions[flow.step];
  return (
    <>
      <button
        className={`chat-launcher ${open ? "launcher-open" : ""}`}
        ref={launcher}
        aria-label="Yangan'ı aç"
        aria-expanded={open}
        aria-controls="yangan-panel"
        onClick={() => setOpen(!open)}
      >
        <YanganMark />
      </button>
      {open && (
        <aside
          ref={panel}
          className="chat-panel"
          id="yangan-panel"
          aria-label="Yangan proje asistanı"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              close();
            }
          }}
        >
          <div className="chat-header">
            <YanganMark thinking={busy} />
            <div>
              <b>Yangan</b>
              <span>Bürküt'ün dijital asistanı</span>
            </div>
            <button
              aria-label="Yeni konuşma"
              title="Yeni konuşma"
              onClick={reset}
            >
              <RotateCcw size={16} />
            </button>
            <button
              ref={closeButton}
              aria-label="Yangan'ı kapat"
              onClick={close}
            >
              <X size={18} />
            </button>
          </div>
          <div
            className="chat-scroll"
            ref={scroll}
            onScroll={() => {
              const el = scroll.current!;
              nearBottom.current =
                el.scrollHeight - el.scrollTop - el.clientHeight < 50;
              if (nearBottom.current) setUnread(false);
            }}
          >
            {!isSummary && (
              <div className="chat-message assistant">
                {initialArea
                  ? `Merhaba, ben Yangan. ${areaLabels[initialArea]} fikrini birlikte netleştirelim. İstersen farklı bir alan da seçebilirsin.`
                  : "Merhaba, ben Yangan. Web sitesi, uygulama veya oyun fikrini birlikte netleştirebiliriz. Nereden başlayalım?"}
              </div>
            )}
            {mode === "welcome" && (
              <div className="welcome-options">
                <button
                  onClick={() => {
                    setMode("flow");
                    dispatch({ type: "reset", area: initialArea });
                  }}
                >
                  Fikrimi netleştir <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => {
                    setMode("chat");
                    setAnnouncement(
                      "Web, uygulama, oyun veya süreç hakkında bir soru yazabilirsin.",
                    );
                  }}
                >
                  Önce bir sorum var <MessageCircle size={16} />
                </button>
              </div>
            )}
            {mode === "flow" && (
              <>
                {current &&
                  questions.slice(firstStep, flow.step).map(
                    (question) =>
                      flow.answers[question.key] && (
                        <div className="flow-history" key={question.key}>
                          <div className="chat-message assistant">
                            {question.title}
                          </div>
                          <div className="chat-message user">
                            {flow.answers[question.key]}
                          </div>
                        </div>
                      ),
                  )}
                {current ? (
                  <>
                    <div className="flow-progress">
                      <span>
                        ADIM {flow.step + 1 - firstStep} /{" "}
                        {questions.length - firstStep}
                      </span>
                      {flow.step > 0 && (
                        <button
                          onClick={() => {
                            dispatch({ type: "back" });
                            setInput("");
                          }}
                        >
                          <ArrowLeft size={13} /> Geri
                        </button>
                      )}
                    </div>
                    <div className="chat-message assistant">
                      {current.title}
                    </div>
                    <div className="chat-options">
                      {current.options.map((option) => (
                        <button
                          key={option}
                          aria-pressed={flow.answers[current.key] === option}
                          onClick={() => answer(option)}
                        >
                          {option}
                          <ArrowUpRight size={14} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flow-summary">
                    <span className="mono">
                      <Check size={15} /> PROJE ÖZETİN HAZIR
                    </span>
                    <h3 tabIndex={-1}>İyi bir başlangıç.</h3>
                    <section
                      className="yangan-recommendation"
                      aria-label="Başlangıç önerisi"
                    >
                      <span>BAŞLANGIÇ ÖNERİSİ</span>
                      <h4>{suggestion.title}</h4>
                      <p>{suggestion.description}</p>
                    </section>
                    {questions.map((question, index) => (
                      <div key={question.key}>
                        <span>{answerLabels[question.key]}</span>
                        <b>{flow.answers[question.key]}</b>
                        <button
                          aria-label={`${answerLabels[question.key]} seçimini düzelt`}
                          onClick={() => {
                            dispatch({ type: "edit", step: index });
                            setInput(
                              question.freeText &&
                                flow.answers[question.key] !== "Belirtilmedi"
                                ? flow.answers[question.key] || ""
                                : "",
                            );
                          }}
                        >
                          Düzelt
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {mode === "chat" && (
              <>
                <div className="chat-message assistant">
                  Web, uygulama, oyun veya proje süreci hakkında sorabilirsin.
                </div>
                {messages.map((message, index) => (
                  <div className={`chat-message ${message.role}`} key={index}>
                    {message.content}
                  </div>
                ))}
              </>
            )}
            {busy && (
              <div className="chat-message assistant" aria-hidden="true">
                Yangan yanıtlıyor…
              </div>
            )}
            {mode === "chat" && chatError && (
              <div className="chat-message assistant" role="alert">
                <p>{chatError}</p>
                <button
                  type="button"
                  className="chat-retry"
                  disabled={busy}
                  onClick={() => {
                    panel.current
                      ?.querySelector<HTMLInputElement>("#chat-input")
                      ?.focus();
                    void requestReply(messages);
                  }}
                >
                  Tekrar dene
                </button>
              </div>
            )}
          </div>
          {unread && (
            <button
              className="new-message"
              onClick={() => {
                if (scroll.current)
                  scroll.current.scrollTop = scroll.current.scrollHeight;
                setUnread(false);
              }}
            >
              Yeni yanıt ↓
            </button>
          )}
          <div className="chat-controls">
            {isSummary && (
              <button
                className="summary-transfer"
                onClick={() => {
                  onDraft({
                    area: answerArea(flow.answers.area),
                    budget: "",
                    detail: summaryDetail(flow.answers),
                  });
                  close();
                }}
              >
                Forma aktar <ArrowUpRight size={16} />
              </button>
            )}
            {mode === "chat" ||
            (mode === "flow" && current && "freeText" in current) ? (
              <form onSubmit={send} className="chat-composer">
                <label className="sr-only" htmlFor="chat-input">
                  {mode === "chat" ? "Sorunu yaz" : "Proje detayını yaz"}
                </label>
                <input
                  id="chat-input"
                  value={input}
                  maxLength={2000}
                  placeholder={
                    mode === "chat" ? "Bir soru yaz…" : "İstersen buraya yaz…"
                  }
                  onChange={(event) => setInput(event.target.value)}
                />
                <button
                  type="submit"
                  aria-label="Mesajı gönder"
                  disabled={!input.trim() || busy}
                >
                  <Send size={17} />
                </button>
              </form>
            ) : null}
            {mode !== "welcome" && !isSummary && (
              <button
                className="chat-mode-switch"
                disabled={busy}
                onClick={() => {
                  setMode(mode === "chat" ? "flow" : "chat");
                  setInput("");
                  setAnnouncement(
                    mode === "chat"
                      ? (current?.title ?? "Proje özetin hazır.")
                      : "Sorunu yazabilirsin.",
                  );
                }}
              >
                {mode === "chat" ? "Fikrimi netleştir" : "Bir soru sor"}
              </button>
            )}
            <span className="chat-footnote">
              {isSummary
                ? "Formda gözden geçirip gönderebilirsin."
                : chatEnabled && mode === "chat"
                  ? "Yanıt almak için mesajların sohbet servisine gönderilir."
                  : "Bu konuşma yalnızca bu sayfada tutulur."}
            </span>
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            {announcement}
          </span>
        </aside>
      )}
    </>
  );
}
