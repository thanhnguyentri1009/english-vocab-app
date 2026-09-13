import { Button, Card, Input, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { User } from "firebase/auth";
import {
  accountLabel,
  accountSyncCode,
  friendlyAuthError,
  loginWithEmail,
  refreshEmailVerified,
  registerWithEmail,
  sendVerificationEmail,
  signOutAccount,
} from "../utils/account";
import { codeExists, GUEST_CODE, isValidSyncCode } from "../utils/syncCode";

const { Title, Text } = Typography;

interface SyncCodeGateProps {
  onSubmit: (code: string, label?: string) => void;
}

type Mode = "account" | "code";
type AccountMode = "register" | "login";

export default function SyncCodeGate({ onSubmit }: SyncCodeGateProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("code");
  const [accountMode, setAccountMode] = useState<AccountMode>("register");

  // Account form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");
  const [accountBusy, setAccountBusy] = useState(false);

  // Set once a registered/logged-in user still needs to verify their email —
  // switches the card over to the "check your email" view below.
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [verifyBusy, setVerifyBusy] = useState<"check" | "resend" | null>(null);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyMessageIsError, setVerifyMessageIsError] = useState(false);

  // Sync-code form state
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeChecking, setCodeChecking] = useState(false);

  const handleAccountSubmit = async () => {
    if (!email.trim() || !password) {
      setAccountError("syncGate.enterEmailAndPassword");
      return;
    }
    setAccountBusy(true);
    setAccountError("");
    try {
      const user =
        accountMode === "register"
          ? await registerWithEmail(email, password)
          : await loginWithEmail(email, password);
      if (!user.emailVerified) {
        if (accountMode === "register") await sendVerificationEmail(user);
        setPendingUser(user);
        return;
      }
      onSubmit(accountSyncCode(user.uid), accountLabel(user));
    } catch (err) {
      setAccountError(friendlyAuthError(err));
    } finally {
      setAccountBusy(false);
    }
  };

  const handleCheckVerified = async () => {
    if (!pendingUser) return;
    setVerifyBusy("check");
    setVerifyMessage("");
    try {
      const verified = await refreshEmailVerified(pendingUser);
      if (verified) {
        onSubmit(accountSyncCode(pendingUser.uid), accountLabel(pendingUser));
      } else {
        setVerifyMessageIsError(true);
        setVerifyMessage("syncGate.stillNotVerified");
      }
    } catch {
      setVerifyMessageIsError(true);
      setVerifyMessage("syncGate.couldNotCheck");
    } finally {
      setVerifyBusy(null);
    }
  };

  const handleResendVerification = async () => {
    if (!pendingUser) return;
    setVerifyBusy("resend");
    setVerifyMessage("");
    try {
      await sendVerificationEmail(pendingUser);
      setVerifyMessageIsError(false);
      setVerifyMessage("syncGate.verificationResent");
    } catch (err) {
      setVerifyMessageIsError(true);
      setVerifyMessage(friendlyAuthError(err));
    } finally {
      setVerifyBusy(null);
    }
  };

  const handleLeaveVerify = async () => {
    await signOutAccount();
    setPendingUser(null);
    setVerifyMessage("");
    setPassword("");
  };

  const handleCodeSubmit = async () => {
    const trimmed = code.trim();
    if (!isValidSyncCode(trimmed)) {
      setCodeError("syncGate.invalidCode");
      return;
    }
    // Normalize any casing of the guest code so everyone using it shares
    // the same demo progress doc instead of fragmenting into "Guest",
    // "GUEST", etc.
    const normalized = trimmed.toLowerCase() === GUEST_CODE ? GUEST_CODE : trimmed;
    setCodeChecking(true);
    setCodeError("");
    try {
      const exists = await codeExists(normalized);
      if (!exists) {
        setCodeError("syncGate.codeNotFound");
        return;
      }
      onSubmit(normalized);
    } catch {
      setCodeError("syncGate.couldNotConnect");
    } finally {
      setCodeChecking(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "linear-gradient(180deg, #eaf3ff 0%, #fbfcfe 220px)",
      }}
    >
      <Card style={{ maxWidth: 360, width: "100%", borderRadius: 16, textAlign: "center" }}>
        <Title level={3} style={{ marginTop: 0, color: "#5b6b7a" }}>
          {t("syncGate.welcome")}
        </Title>

        {pendingUser ? (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
              {t("syncGate.verifyInstructionsBefore")}
              <Text strong>{pendingUser.email}</Text>
              {t("syncGate.verifyInstructionsAfter")}
            </Text>
            {verifyMessage && (
              <Text
                type={verifyMessageIsError ? "danger" : "success"}
                style={{ display: "block", marginBottom: 8 }}
              >
                {t(verifyMessage)}
              </Text>
            )}
            <Button
              type="primary"
              block
              size="large"
              onClick={handleCheckVerified}
              loading={verifyBusy === "check"}
              disabled={verifyBusy !== null && verifyBusy !== "check"}
              style={{ marginBottom: 8 }}
            >
              {t("syncGate.checkVerifiedContinue")}
            </Button>
            <Button
              block
              size="large"
              onClick={handleResendVerification}
              loading={verifyBusy === "resend"}
              disabled={verifyBusy !== null && verifyBusy !== "resend"}
              style={{ marginBottom: 16 }}
            >
              {t("syncGate.resendEmail")}
            </Button>
            <Button type="link" size="small" onClick={handleLeaveVerify} style={{ color: "#a3adb6" }}>
              {t("syncGate.useDifferentEmail")}
            </Button>
          </>
        ) : mode === "account" ? (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
              {accountMode === "register"
                ? t("syncGate.registerSubtitle")
                : t("syncGate.loginSubtitle")}
            </Text>

            <Input
              size="large"
              placeholder={t("syncGate.emailPlaceholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAccountError("");
              }}
              disabled={accountBusy}
              style={{ marginBottom: 10 }}
              autoFocus
            />
            <Input.Password
              size="large"
              placeholder={t("syncGate.passwordPlaceholder")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAccountError("");
              }}
              onPressEnter={handleAccountSubmit}
              disabled={accountBusy}
              style={{ marginBottom: 8 }}
            />
            {accountError && (
              <Text type="danger" style={{ display: "block", marginBottom: 8 }}>
                {t(accountError)}
              </Text>
            )}
            <Button
              type="primary"
              block
              size="large"
              onClick={handleAccountSubmit}
              loading={accountBusy}
            >
              {accountMode === "register" ? t("syncGate.signUp") : t("syncGate.logIn")}
            </Button>

            <Text style={{ color: "#8a97a3", fontSize: 13, display: "block", marginTop: 16 }}>
              {accountMode === "register" ? (
                <>
                  {t("syncGate.alreadyHaveAccount")}{" "}
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setAccountMode("login");
                      setAccountError("");
                    }}
                  >
                    {t("syncGate.logIn")}
                  </Button>
                </>
              ) : (
                <>
                  {t("syncGate.noAccount")}{" "}
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setAccountMode("register");
                      setAccountError("");
                    }}
                  >
                    {t("syncGate.signUp")}
                  </Button>
                </>
              )}
            </Text>

            <Button
              type="link"
              size="small"
              onClick={() => {
                setMode("code");
                setAccountError("");
              }}
              style={{ marginTop: 4, color: "#a3adb6" }}
            >
              {t("syncGate.useSyncCodeInstead")}
            </Button>
          </>
        ) : (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 8 }}>
              {t("syncGate.codeSubtitle")}
            </Text>
            <Text style={{ color: "#7aa7d9", fontSize: 13, display: "block", marginBottom: 20 }}>
              {t("syncGate.guestHintBefore")}
              <Text strong style={{ color: "#7aa7d9" }}>{t("syncGate.guestWord")}</Text>
              {t("syncGate.guestHintAfter")}
            </Text>
            <Input
              size="large"
              placeholder={t("syncGate.codePlaceholder")}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError("");
              }}
              onPressEnter={handleCodeSubmit}
              style={{ marginBottom: 8 }}
              autoFocus
              disabled={codeChecking}
            />
            {codeError && (
              <Text type="danger" style={{ display: "block", marginBottom: 8 }}>
                {t(codeError)}
              </Text>
            )}
            <Button
              type="primary"
              block
              size="large"
              onClick={handleCodeSubmit}
              loading={codeChecking}
            >
              {t("syncGate.continue")}
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                setMode("account");
                setCodeError("");
              }}
              style={{ marginTop: 12, color: "#a3adb6" }}
            >
              {t("syncGate.signUpLoginInstead")}
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
