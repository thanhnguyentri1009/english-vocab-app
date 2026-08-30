import { Button, Card, Input, Typography } from "antd";
import { useState } from "react";
import type { User } from "firebase/auth";
import {
  accountLabel,
  accountSyncCode,
  friendlyAuthError,
  isAccountAuthAvailable,
  loginWithEmail,
  refreshEmailVerified,
  registerWithEmail,
  sendVerificationEmail,
  signOutAccount,
} from "../utils/account";
import { codeExists } from "../utils/progress";
import { isValidSyncCode } from "../utils/syncCode";

const { Title, Text } = Typography;

interface SyncCodeGateProps {
  onSubmit: (code: string, label?: string) => void;
}

type Mode = "account" | "code";
type AccountMode = "register" | "login";

export default function SyncCodeGate({ onSubmit }: SyncCodeGateProps) {
  const [mode, setMode] = useState<Mode>(isAccountAuthAvailable ? "account" : "code");
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
      setAccountError("Enter both an email and a password.");
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
        setVerifyMessage("Still not verified — check your inbox (and spam folder) for the link.");
      }
    } catch {
      setVerifyMessageIsError(true);
      setVerifyMessage("Could not check right now. Please try again.");
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
      setVerifyMessage("Verification email sent again.");
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
      setCodeError('Enter a name or code without "/" or "." characters.');
      return;
    }
    setCodeChecking(true);
    setCodeError("");
    try {
      const exists = await codeExists(trimmed);
      if (!exists) {
        setCodeError("This code does not exist. Please check and try again.");
        return;
      }
      onSubmit(trimmed);
    } catch {
      setCodeError("Could not connect right now. Please try again.");
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
          Welcome
        </Title>

        {pendingUser ? (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
              We sent a verification link to <Text strong>{pendingUser.email}</Text>. Click
              the link in that email, then come back here.
            </Text>
            {verifyMessage && (
              <Text
                type={verifyMessageIsError ? "danger" : "success"}
                style={{ display: "block", marginBottom: 8 }}
              >
                {verifyMessage}
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
              I've verified — Continue
            </Button>
            <Button
              block
              size="large"
              onClick={handleResendVerification}
              loading={verifyBusy === "resend"}
              disabled={verifyBusy !== null && verifyBusy !== "resend"}
              style={{ marginBottom: 16 }}
            >
              Resend email
            </Button>
            <Button type="link" size="small" onClick={handleLeaveVerify} style={{ color: "#a3adb6" }}>
              Use a different email
            </Button>
          </>
        ) : mode === "account" ? (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
              {accountMode === "register"
                ? "Create an account to save your learning progress and sync it across devices."
                : "Log in to pick up right where you left off."}
            </Text>

            <Input
              size="large"
              placeholder="Email"
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
              placeholder="Password"
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
                {accountError}
              </Text>
            )}
            <Button
              type="primary"
              block
              size="large"
              onClick={handleAccountSubmit}
              loading={accountBusy}
            >
              {accountMode === "register" ? "Sign up" : "Log in"}
            </Button>

            <Text style={{ color: "#8a97a3", fontSize: 13, display: "block", marginTop: 16 }}>
              {accountMode === "register" ? (
                <>
                  Already have an account?{" "}
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setAccountMode("login");
                      setAccountError("");
                    }}
                  >
                    Log in
                  </Button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setAccountMode("register");
                      setAccountError("");
                    }}
                  >
                    Sign up
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
              Use a sync code instead
            </Button>
          </>
        ) : (
          <>
            <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
              Enter a name or code to save your learning progress. Use the same code
              on every device to keep them in sync.
            </Text>
            <Input
              size="large"
              placeholder="Enter your name"
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
                {codeError}
              </Text>
            )}
            <Button
              type="primary"
              block
              size="large"
              onClick={handleCodeSubmit}
              loading={codeChecking}
            >
              Continue
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
              Sign up / log in with an account instead
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
