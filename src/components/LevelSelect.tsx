import { Button, Card, Col, Row, Typography } from "antd";
import { CefrLevel, LEVELS, VOCABULARY } from "../data/vocabulary";

const { Title, Text } = Typography;

interface LevelSelectProps {
  onSelect: (level: CefrLevel) => void;
  learnedWords: Partial<Record<CefrLevel, string[]>>;
  syncCode: string;
  onSwitchAccount: () => void;
}

export default function LevelSelect({
  onSelect,
  learnedWords,
  syncCode,
  onSwitchAccount,
}: LevelSelectProps) {
  return (
    <div style={{ padding: "24px 16px", maxWidth: 960, margin: "0 auto" }}>
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#5b6b7a",
          fontSize: "clamp(22px, 6vw, 30px)",
        }}
      >
        English Vocabulary Builder
      </Title>
      <Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: 8,
          color: "#8a97a3",
        }}
      >
        Pick a level to start learning new words
      </Text>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Text style={{ color: "#a3adb6" }}>
          Signed in as <Text strong>{syncCode}</Text>
        </Text>{" "}
        <Button
          type="link"
          size="small"
          onClick={onSwitchAccount}
          style={{ padding: 0 }}
        >
          Switch
        </Button>
      </div>
      <Row gutter={[20, 20]} justify="center" align="stretch">
        {LEVELS.map((level) => {
          const learnedCount = learnedWords[level.key]?.length ?? 0;
          const total = VOCABULARY[level.key].length;
          return (
            <Col key={level.key} xs={12} sm={12} md={6}>
              <Card
                hoverable
                onClick={() => onSelect(level.key)}
                style={{
                  textAlign: "center",
                  borderRadius: 16,
                  background: level.color,
                  border: `1px solid ${level.accent}33`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  height: "100%",
                }}
                styles={{
                  body: {
                    padding: "28px 12px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  },
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: level.accent,
                    marginBottom: 6,
                  }}
                >
                  {level.title}
                </div>
                <Text style={{ color: "#6b7580" }}>{level.subtitle}</Text>
                <Text
                  style={{
                    display: "block",
                    color: level.accent,
                    marginTop: 4,
                  }}
                >
                  {learnedCount > 0 ? `${learnedCount}/${total} learned` : " "}
                </Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
