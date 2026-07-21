import { Button, Card, Input, Typography } from "antd";
import { useState } from "react";
import { codeExists } from "../utils/progress";
import { isValidSyncCode } from "../utils/syncCode";

const { Title, Text } = Typography;

interface SyncCodeGateProps {
  onSubmit: (code: string) => void;
}

export default function SyncCodeGate({ onSubmit }: SyncCodeGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!isValidSyncCode(trimmed)) {
      setError('Enter a name or code without "/" or "." characters.');
      return;
    }
    setChecking(true);
    setError("");
    try {
      const exists = await codeExists(trimmed);
      if (!exists) {
        setError("Bạn không có quyền vào bài học.");
        return;
      }
      onSubmit(trimmed);
    } catch {
      setError("Could not connect right now. Please try again.");
    } finally {
      setChecking(false);
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
      <Card
        style={{
          maxWidth: 360,
          width: "100%",
          borderRadius: 16,
          textAlign: "center",
        }}
      >
        <Title level={3} style={{ marginTop: 0, color: "#5b6b7a" }}>
          Welcome
        </Title>
        <Text style={{ color: "#8a97a3", display: "block", marginBottom: 20 }}>
          Enter a name or code to save your learning progress. Use the same code
          on every device to keep them in sync.
        </Text>
        <Input
          size="large"
          placeholder="Enter your name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onPressEnter={handleSubmit}
          style={{ marginBottom: 8 }}
          autoFocus
          disabled={checking}
        />
        {error && (
          <Text type="danger" style={{ display: "block", marginBottom: 8 }}>
            {error}
          </Text>
        )}
        <Button
          type="primary"
          block
          size="large"
          onClick={handleSubmit}
          loading={checking}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
