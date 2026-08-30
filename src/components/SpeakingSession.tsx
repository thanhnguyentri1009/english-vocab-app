import { ArrowLeftOutlined, AudioOutlined, SoundOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SpeakingLevel } from "../data/speaking/sentences";

const { Text, Title } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpeechRecognitionAPI: any =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

function normalise(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function matchScore(target: string, heard: string): number {
  const targetWords = normalise(target);
  const heardSet = new Set(normalise(heard));
  const matched = targetWords.filter((w) => heardSet.has(w)).length;
  return targetWords.length === 0 ? 0 : matched / targetWords.length;
}

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  window.speechSynthesis.speak(utter);
}

type Status = "idle" | "listening" | "done";

interface Props {
  level: SpeakingLevel;
  onBack: () => void;
}

export default function SpeakingSession({ level, onBack }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const recRef = useRef<unknown>(null);

  const sentence = level.sentences[index];
  const total = level.sentences.length;

  // Clean up recognition when navigating sentences
  useEffect(() => {
    return () => {
      (recRef.current as any)?.stop();
    };
  }, [index]);

  const startRecording = () => {
    if (!SpeechRecognitionAPI) return;

    const rec = new SpeechRecognitionAPI();
    recRef.current = rec;
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    let gotResult = false;

    rec.onresult = (event: any) => {
      gotResult = true;
      const heard: string = event.results[0][0].transcript;
      const s = matchScore(sentence.text, heard);
      setTranscript(heard);
      setScore(s);
      setStatus("done");
    };

    rec.onerror = () => {
      if (!gotResult) setStatus("idle");
    };

    rec.onend = () => {
      if (!gotResult) setStatus("idle");
    };

    setStatus("listening");
    rec.start();
  };

  // Cancel: abort recording without scoring anything.
  const cancelRecording = () => {
    (recRef.current as any)?.abort?.();
    setStatus("idle");
  };

  // Submit: stop recording and let the pending result (if any) come through
  // onresult so the score/transcript is shown.
  const submitRecording = () => {
    (recRef.current as any)?.stop();
  };

  const goTo = (next: number) => {
    (recRef.current as any)?.stop();
    setIndex(next);
    setStatus("idle");
    setTranscript("");
    setScore(0);
  };

  const resultColor =
    score >= 0.85 ? "#22c55e" : score >= 0.5 ? "#f97316" : "#ef4444";
  const resultLabel =
    score >= 0.85
      ? t("speakingSession.excellent")
      : score >= 0.5
        ? t("speakingSession.almostThere")
        : t("speakingSession.tryAgain");

  return (
    <>
      <style>{`
        @keyframes speaking-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.45); }
          70%  { box-shadow: 0 0 0 20px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
      `}</style>

      <div style={{ padding: "20px 16px", maxWidth: 600, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            onClick={onBack}
            style={{ flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title level={4} style={{ margin: 0, color: level.accent, fontSize: 18 }}>
              {t("speakingSession.headerTitle", { label: level.label })}
            </Title>
            <Text style={{ color: "#8a97a3", fontSize: 13 }}>
              {t("speakingSession.counter", { current: index + 1, total })}
            </Text>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{ height: 4, background: "#f0f0f0", borderRadius: 2, marginBottom: 28 }}
        >
          <div
            style={{
              height: "100%",
              width: `${((index + 1) / total) * 100}%`,
              background: level.accent,
              borderRadius: 2,
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* Sentence card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "32px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            textAlign: "center",
            marginBottom: 28,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: 600,
              color: "#1e293b",
              lineHeight: 1.6,
              display: "block",
            }}
          >
            {sentence.text}
          </Text>
          {/* Listen button */}
          <button
            onClick={() => speak(sentence.text)}
            title={t("speakingSession.listenTitle")}
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: level.accent,
              fontSize: 18,
              padding: 4,
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            <SoundOutlined />
          </button>
        </div>

        {/* Microphone / result area */}
        <div style={{ textAlign: "center" }}>
          {status !== "done" ? (
            <>
              <button
                onClick={status === "idle" ? startRecording : cancelRecording}
                disabled={!SpeechRecognitionAPI}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    status === "listening" ? "#ef4444" : level.accent,
                  border: "none",
                  cursor: SpeechRecognitionAPI ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                  animation:
                    status === "listening"
                      ? "speaking-pulse 1.4s infinite"
                      : "none",
                  boxShadow:
                    status === "idle"
                      ? `0 4px 14px ${level.accent}55`
                      : undefined,
                  opacity: SpeechRecognitionAPI ? 1 : 0.4,
                }}
              >
                <AudioOutlined style={{ fontSize: 32, color: "#fff" }} />
              </button>

              <div style={{ marginTop: 10, color: "#94a3b8", fontSize: 14 }}>
                {!SpeechRecognitionAPI
                  ? t("speakingSession.requiresChrome")
                  : status === "idle"
                    ? t("speakingSession.tapToSpeak")
                    : t("speakingSession.listeningCancel")}
              </div>

              {status === "listening" && (
                <Button
                  type="primary"
                  size="large"
                  onClick={submitRecording}
                  style={{
                    marginTop: 16,
                    background: level.accent,
                    borderColor: level.accent,
                  }}
                >
                  {t("speakingSession.submit")}
                </Button>
              )}
            </>
          ) : (
            <div>
              {/* Score badge */}
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 20px",
                  borderRadius: 999,
                  background: `${resultColor}18`,
                  color: resultColor,
                  fontWeight: 700,
                  fontSize: 17,
                  marginBottom: 14,
                }}
              >
                {resultLabel}
              </div>

              {/* Transcript */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: "10px 16px",
                  marginBottom: 20,
                  maxWidth: 420,
                  margin: "0 auto 20px",
                }}
              >
                <Text style={{ color: "#94a3b8", fontSize: 12 }}>{t("speakingSession.youSaid")}</Text>
                <Text style={{ color: "#334155", fontSize: 14, fontStyle: "italic" }}>
                  "{transcript}"
                </Text>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    setStatus("idle");
                    setTranscript("");
                    setScore(0);
                  }}
                >
                  {t("speakingSession.tryAgain")}
                </Button>
                <Button
                  type="primary"
                  onClick={() => index < total - 1 && goTo(index + 1)}
                  disabled={index === total - 1}
                  style={{ background: level.accent, borderColor: level.accent }}
                >
                  {t("speakingSession.next")}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next navigation (always visible) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 36,
          }}
        >
          <Button onClick={() => goTo(index - 1)} disabled={index === 0}>
            {t("speakingSession.previous")}
          </Button>
          <Button onClick={() => goTo(index + 1)} disabled={index === total - 1}>
            {t("speakingSession.nextArrow")}
          </Button>
        </div>
      </div>
    </>
  );
}
