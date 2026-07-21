import { Button, Card, Col, Row, Typography } from "antd";
import type { Topic, TopicInfo } from "../data/vocabulary";

const { Title, Text } = Typography;

interface TopicSelectProps {
  topics: TopicInfo[];
  onSelect: (topic: Topic) => void;
  syncCode: string;
  onSwitchAccount: () => void;
}

export default function TopicSelect({
  topics,
  onSelect,
  syncCode,
  onSwitchAccount,
}: TopicSelectProps) {
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
        Pick a topic to start learning new words
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
        {topics.map((topic) => (
          <Col key={topic.key} xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => onSelect(topic.key)}
              style={{
                textAlign: "center",
                borderRadius: 16,
                background: topic.color,
                border: `1px solid ${topic.accent}33`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                height: "100%",
              }}
              styles={{
                body: {
                  padding: "32px 16px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                },
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: topic.accent,
                  marginBottom: 6,
                }}
              >
                {topic.title}
              </div>
              <Text style={{ color: "#6b7580" }}>{topic.subtitle}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
