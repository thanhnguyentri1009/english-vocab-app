import { Card, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { LearningTrack } from "../utils/learningTrack";

const { Title, Text } = Typography;

interface TrackSelectProps {
  onSelect: (track: LearningTrack) => void;
}

export default function TrackSelect({ onSelect }: TrackSelectProps) {
  const { t } = useTranslation();
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
      <div style={{ maxWidth: 520, width: "100%" }}>
        <Title
          level={3}
          style={{ textAlign: "center", color: "#5b6b7a", marginTop: 0 }}
        >
          {t("trackSelect.title")}
        </Title>
        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 24,
            color: "#8a97a3",
          }}
        >
          {t("trackSelect.subtitle")}
        </Text>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => onSelect("english")}
              style={{
                textAlign: "center",
                borderRadius: 16,
                background: "#eaf3ff",
                border: "1px solid #7aa7d933",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
              styles={{ body: { padding: "28px 16px" } }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🇬🇧</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#7aa7d9", marginBottom: 6 }}>
                {t("trackSelect.englishTitle")}
              </div>
              <Text style={{ color: "#6b7580" }}>{t("trackSelect.englishSubtitle")}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => onSelect("japanese")}
              style={{
                textAlign: "center",
                borderRadius: 16,
                background: "#fdeaf0",
                border: "1px solid #d97aa033",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
              styles={{ body: { padding: "28px 16px" } }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🇯🇵</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#d97aa0", marginBottom: 6 }}>
                {t("trackSelect.japaneseTitle")}
              </div>
              <Text style={{ color: "#6b7580" }}>{t("trackSelect.japaneseSubtitle")}</Text>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
