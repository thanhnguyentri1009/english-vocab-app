import { Card, Col, Row, Typography } from "antd";
import type { SpeakingLevel } from "../data/speaking/sentences";

const { Title, Text } = Typography;

interface Props {
  levels: SpeakingLevel[];
  onSelect: (key: string) => void;
}

export default function SpeakingLevelSelect({ levels, onSelect }: Props) {
  return (
    <div style={{ padding: "24px 16px", maxWidth: 960, margin: "0 auto" }}>
      <Title
        level={3}
        style={{ textAlign: "center", color: "#5b6b7a", marginBottom: 4, fontSize: "clamp(18px, 5vw, 24px)" }}
      >
        Speaking Practice
      </Title>
      <Text style={{ display: "block", textAlign: "center", color: "#8a97a3", marginBottom: 32 }}>
        Choose your level and practise speaking aloud
      </Text>
      <Row gutter={[20, 20]} justify="center" align="stretch">
        {levels.map((level) => (
          <Col key={level.key} xs={24} sm={12} md={8}>
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
                cursor: "pointer",
              }}
              styles={{
                body: {
                  padding: "28px 20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: level.accent, marginBottom: 6 }}>
                {level.label}
              </div>
              <Text style={{ color: "#6b7580", fontSize: 13, marginBottom: 10 }}>
                {level.description}
              </Text>
              <Text style={{ color: level.accent, fontSize: 13, fontWeight: 500 }}>
                {level.sentences.length} sentences
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
