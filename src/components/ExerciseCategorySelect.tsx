import { Card, Col, Row, Typography } from "antd";
import type { ExerciseCategory } from "../data/exercises";

const { Title, Text } = Typography;

interface Props {
  section: "grammar" | "word-types";
  categories: ExerciseCategory[];
  onSelect: (categoryKey: string) => void;
}

const SECTION_META = {
  grammar: {
    title: "Grammar",
    subtitle: "Practice key grammar points",
  },
  "word-types": {
    title: "Word Types",
    subtitle: "Practice identifying and using different word types",
  },
};

export default function ExerciseCategorySelect({ section, categories, onSelect }: Props) {
  const meta = SECTION_META[section];

  return (
    <div style={{ padding: "24px 16px", maxWidth: 960, margin: "0 auto" }}>
      <Title
        level={3}
        style={{ textAlign: "center", color: "#5b6b7a", marginBottom: 4, fontSize: "clamp(18px, 5vw, 24px)" }}
      >
        {meta.title}
      </Title>
      <Text
        style={{ display: "block", textAlign: "center", color: "#8a97a3", marginBottom: 32 }}
      >
        {meta.subtitle}
      </Text>
      <Row gutter={[20, 20]} justify="center" align="stretch">
        {categories.map((cat) => (
          <Col key={cat.key} xs={24} sm={12} md={12}>
            <Card
              hoverable
              onClick={() => onSelect(cat.key)}
              style={{
                textAlign: "center",
                borderRadius: 16,
                background: cat.color,
                border: `1px solid ${cat.accent}33`,
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
              <div
                style={{ fontSize: 22, fontWeight: 700, color: cat.accent, marginBottom: 6 }}
              >
                {cat.title}
              </div>
              <Text style={{ color: "#6b7580", fontSize: 14 }}>{cat.subtitle}</Text>
              <Text style={{ color: cat.accent, fontSize: 13, marginTop: 10, fontWeight: 500 }}>
                {cat.questions.length} questions
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
