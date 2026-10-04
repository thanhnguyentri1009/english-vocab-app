import { AudioOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SpeakingLevel } from "../../data/english/speaking/sentences";
import { speak } from "../../utils/speech";
import { ListenButton, SessionBar } from "../ui/Session";

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpeechRecognitionAPI: any =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

// Recognition often returns numbers as digits ("5 years") while the target
// sentences spell them out, so map digits back to words before comparing.
const NUMBER_WORDS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
  "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
  "1st": "first", "2nd": "second", "3rd": "third",
};

function normalise(s: string): string[] {
  return s
    .toLowerCase()
    // "work-life" may come back from recognition as "work life": split
    // hyphenated words instead of gluing them into one token.
    .replace(/[-–—]/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => NUMBER_WORDS[w] ?? w);
}

function matchScore(target: string, heard: string): number {
  const targetWords = normalise(target);
  const heardSet = new Set(normalise(heard));
  // A hyphenated target ("well-being") may be heard as one word ("wellbeing").
  const matched = targetWords.filter(
    (w, i) =>
      heardSet.has(w) ||
      heardSet.has(w + (targetWords[i + 1] ?? "")) ||
      heardSet.has((targetWords[i - 1] ?? "") + w),
  ).length;
  return targetWords.length === 0 ? 0 : matched / targetWords.length;
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
    score >= 0.85 ? "#1f7a46" : score >= 0.5 ? "#946200" : "#b8352b";
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

      <div className="session">
        <SessionBar current={index + 1} total={total} onExit={onBack} exitLabel={t("speakingSession.headerTitle", { label: level.label })} />

        <span className="eyebrow" style={{ textAlign: "center" }}>
          {t("speakingSession.headerTitle", { label: level.label })}
        </span>
        <div className="flashcard-face" style={{ minHeight: 0, padding: "36px 28px 24px", marginBottom: 32 }}>
          <p className="speaking-sentence" lang="en">{sentence.text}</p>
          <ListenButton onClick={() => speak(sentence.text, "en-US")} label={t("speakingSession.listenTitle")} />
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
                    status === "listening" ? "#b8352b" : level.accent,
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

              <div style={{ marginTop: 10, color: "#5f636b", fontSize: 14 }}>
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
                  background: "#f6f5f1",
                  borderRadius: 10,
                  padding: "10px 16px",
                  marginBottom: 20,
                  maxWidth: 420,
                  margin: "0 auto 20px",
                }}
              >
                <Text style={{ color: "#5f636b", fontSize: 12 }}>{t("speakingSession.youSaid")}</Text>
                <Text style={{ color: "#1c1d1f", fontSize: 14, fontStyle: "italic" }}>
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
