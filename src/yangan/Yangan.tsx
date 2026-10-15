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
  flowReducer,
  initialFlow,
  questions,
  summaryDetail,
} from "./flow";
import type { Draft } from "../sections/Contact";
import { projectLimits } from "../shared/project";

interface Message {
  role: "assistant" | "user";
  content: string;
}
export default function Yangan({
  open,
  setOpen,
  onDraft,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  onDraft: (draft: Draft) => void;
}) {
  const [mode, setMode] = useState<"welcome" | "flow" | "chat">("welcome");
  const [flow, dispatch] = useReducer(flowReducer, initialFlow);
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
        ?.querySelector<HTMLButtonElement>(
          ".chat-options button, .summary-transfer",
        )
        ?.focus();
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
    if (nearBottom.current && scroll.current)
      scroll.current.scrollTop = scroll.current.scrollHeight;
    else if (messages.length) setUnread(true);
  }, [messages, mode, flow.step, busy, chatError]);
  const close = () => {
    setOpen(false);
  };
  const reset = () => {
    requestVersion.current++;
    pending.current?.abort();
    setBusy(false);
    setChatError("");
    dispatch({ type: "reset" });
    setMode("welcome");
    setMessages([]);
    setInput("");
    setAnnouncement("Yeni konuşma başladı.");
    setUnread(false);
    nearBottom.current = true;
  };
  const answer = (value: string) => {
    dispatch({
      type: "answer",
      value: value === "Atla" ? "Belirtilmedi" : value,
    });
    setInput("");
    setAnnouncement(
      flow.step < 4 ? questions[flow.step + 1].title : "Proje özetin hazır.",
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
        <YanganMark size={42} busy={busy} />
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
            <YanganMark busy={busy} />
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
            <div className="chat-message assistant">
              Merhaba, ben Yangan. Web sitesi, uygulama veya oyun fikrini
              birlikte netleştirebiliriz. Nereden başlayalım?
            </div>
            {mode === "welcome" && (
              <div className="welcome-options">
                <button
                  onClick={() => {
                    setMode("flow");
                    dispatch({ type: "reset" });
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
                {questions.slice(0, flow.step).map(
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
                      <span>ADIM {flow.step + 1} / 5</span>
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
                        <button key={option} onClick={() => answer(option)}>
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
                    <h3>İyi bir başlangıç.</h3>
                    {questions.map((question, index) => (
                      <div key={question.key}>
                        <span>
                          {["Alan", "Aşama", "Zaman", "Bütçe", "Detay"][index]}
                        </span>
                        <b>{flow.answers[question.key]}</b>
                        <button
                          aria-label={`${["Alan", "Aşama", "Zaman", "Bütçe", "Detay"][index]} seçimini düzelt`}
                          onClick={() => {
                            dispatch({ type: "edit", step: index });
                            setInput("");
                          }}
                        >
                          Düzelt
                        </button>
                      </div>
                    ))}
                    <button
                      className="summary-transfer"
                      onClick={() => {
                        onDraft({
                          area: answerArea(flow.answers.area),
                          budget: flow.answers.budget || "",
                          detail: summaryDetail(flow.answers),
                        });
                        close();
                      }}
                    >
                      Forma aktar <ArrowUpRight size={16} />
                    </button>
                    <p>
                      Proje özetini formda gözden geçirip tamamlayabilirsin.
                    </p>
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
            {mode === "chat" ||
            (mode === "flow" && current && "freeText" in current) ? (
              <form onSubmit={send} className="chat-composer">
                <label className="sr-only" htmlFor="chat-input">
                  {mode === "chat" ? "Sorunu yaz" : "Proje detayını yaz"}
                </label>
                <input
                  id="chat-input"
                  value={input}
                  maxLength={
                    mode === "flow" && current?.key === "budget"
                      ? projectLimits.budget
                      : 2000
                  }
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
            {mode !== "welcome" && (
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
              {chatEnabled && mode === "chat"
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
