import { useState } from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

function RuleBox({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{ border: `1.5px solid ${accent}44`, borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "10px 14px", background: accent + "09", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function ExampleRow({ jp, roma, vi }: { jp: string; roma: string; vi: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>{jp}</span>
      <span style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{roma}</span>
      <span style={{ fontSize: 13, color: "#555" }}>→ {vi}</span>
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{ display: "inline-block", background: color + "22", color, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 600, margin: "2px 3px" }}>
      {children}
    </span>
  );
}

interface Section {
  id: string;
  icon: string;
  titleVi: string;
  titleJp: string;
  color: string;
  accent: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "writing",
    icon: "✍️",
    titleVi: "Hệ thống chữ viết",
    titleJp: "文字システム",
    color: "#eaf3ff",
    accent: "#5b8ecf",
    content: (
      <div>
        <RuleBox accent="#5b8ecf">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Nhật dùng <strong>3 hệ thống chữ viết</strong> kết hợp với nhau trong cùng một câu.
          </Text>
        </RuleBox>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {[
            { name: "Hiragana (ひらがな)", color: "#5b8ecf", desc: "46 ký tự cơ bản — dùng cho từ gốc Nhật, ngữ pháp, trợ từ. Học trước tiên!", chars: "あいうえお / かきくけこ / さしすせそ" },
            { name: "Katakana (カタカナ)", color: "#e07a5f", desc: "46 ký tự tương đương Hiragana — dùng cho từ nước ngoài và tên riêng.", chars: "アイウエオ / カキクケコ / サシスセソ" },
            { name: "Kanji (漢字)", color: "#4caf7d", desc: "Chữ Hán — biểu thị ý nghĩa. Có hơn 2000 chữ thường dùng. Học dần theo cấp.", chars: "山 川 人 日 月 火 水 木 金 土" },
          ].map((s) => (
            <div key={s.name} style={{ padding: "12px 14px", background: s.color + "10", borderRadius: 12, border: `1px solid ${s.color}33` }}>
              <div style={{ fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>{s.desc}</div>
              <div style={{ fontSize: 15, letterSpacing: 2, color: s.color + "cc" }}>{s.chars}</div>
            </div>
          ))}
        </div>
        <RuleBox accent="#5b8ecf">
          <Text style={{ fontSize: 13, color: "#555" }}>
            Ví dụ câu dùng cả 3: <strong>私はコーヒーが好きです。</strong><br />
            <span style={{ color: "#5b8ecf" }}>私・は・が・です</span> = Hiragana/Kanji &nbsp;|&nbsp;
            <span style={{ color: "#e07a5f" }}>コーヒー</span> = Katakana (coffee) &nbsp;|&nbsp;
            <span style={{ color: "#4caf7d" }}>好き</span> = Kanji
          </Text>
        </RuleBox>
      </div>
    ),
  },
  {
    id: "sentence",
    icon: "📝",
    titleVi: "Cấu trúc câu",
    titleJp: "文の構造",
    color: "#eafff2",
    accent: "#4caf7d",
    content: (
      <div>
        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Nhật có thứ tự <strong>Chủ ngữ → Tân ngữ → Động từ (SOV)</strong> — khác tiếng Anh và tiếng Trung. <strong>Động từ luôn ở cuối câu!</strong>
          </Text>
          <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <Tag color="#5b8ecf">Chủ ngữ は/が</Tag>
            <span style={{ color: "#999" }}>+</span>
            <Tag color="#e07a5f">Tân ngữ を</Tag>
            <span style={{ color: "#999" }}>+</span>
            <Tag color="#4caf7d">Động từ (cuối câu)</Tag>
          </div>
        </RuleBox>

        <ExampleRow jp="私はご飯を食べます。" roma="Watashi wa gohan wo tabemasu." vi="Tôi ăn cơm." />
        <ExampleRow jp="彼女は水を飲みます。" roma="Kanojo wa mizu wo nomimasu." vi="Cô ấy uống nước." />
        <ExampleRow jp="私は学生です。" roma="Watashi wa gakusei desu." vi="Tôi là học sinh." />

        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 13, color: "#555" }}>
            Câu phủ định — thay <strong>ます → ません</strong> / <strong>です → ではありません</strong>:<br />
            食べません (tabemasen) = không ăn &nbsp;|&nbsp; 学生ではありません = không phải học sinh
          </Text>
        </RuleBox>
      </div>
    ),
  },
  {
    id: "particles",
    icon: "🔗",
    titleVi: "Trợ từ (Particles)",
    titleJp: "助詞",
    color: "#fff6ea",
    accent: "#e07a5f",
    content: (
      <div>
        <RuleBox accent="#e07a5f">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Trợ từ là các ký tự nhỏ đặt <strong>sau danh từ</strong> để chỉ vai trò của từ đó trong câu. Đây là điểm quan trọng nhất của ngữ pháp tiếng Nhật!
          </Text>
        </RuleBox>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { p: "は", roma: "wa", role: "Chủ đề câu", ex: "私は... (Tôi thì...)" },
            { p: "が", roma: "ga", role: "Chủ ngữ (nhấn mạnh)", ex: "誰が... (Ai đã...)" },
            { p: "を", roma: "wo", role: "Tân ngữ trực tiếp", ex: "ご飯を食べる (ăn cơm)" },
            { p: "に", roma: "ni", role: "Hướng đến / Thời gian", ex: "東京に行く (đi Tokyo)" },
            { p: "で", roma: "de", role: "Địa điểm hành động", ex: "学校で勉強する" },
            { p: "へ", roma: "e", role: "Hướng đến (chuyển động)", ex: "学校へ行く (đi về phía trường)" },
            { p: "と", roma: "to", role: "Và / Cùng với", ex: "友達と行く (đi cùng bạn)" },
            { p: "の", roma: "no", role: "Sở hữu (của)", ex: "私の本 (sách của tôi)" },
          ].map((item) => (
            <div key={item.p} style={{ padding: "8px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 10, border: "1px solid #f0c8a8" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#e07a5f" }}>{item.p}</span>
                <span style={{ fontSize: 11, color: "#aaa", fontStyle: "italic" }}>{item.roma}</span>
              </div>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>{item.role}</div>
              <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{item.ex}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "verbs",
    icon: "⚙️",
    titleVi: "Chia động từ",
    titleJp: "動詞の活用",
    color: "#f3eaff",
    accent: "#9b59b6",
    content: (
      <div>
        <RuleBox accent="#9b59b6">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Nhật có <strong>2 nhóm động từ</strong> chính và cách chia khác nhau. Dạng lịch sự dùng <strong>ます (masu)</strong>.
          </Text>
        </RuleBox>

        <Text style={{ fontWeight: 700, color: "#9b59b6", fontSize: 13 }}>Nhóm 2 (る-verbs) — đuôi る, bỏ る thêm ます:</Text>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, margin: "8px 0 12px" }}>
          {[
            { dict: "食べる", masu: "食べます", vi: "ăn" },
            { dict: "見る", masu: "見ます", vi: "nhìn/xem" },
            { dict: "起きる", masu: "起きます", vi: "thức dậy" },
            { dict: "寝る", masu: "寝ます", vi: "ngủ" },
          ].map((v) => (
            <div key={v.dict} style={{ padding: "8px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #c8a8e8" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#9b59b6" }}>{v.dict}</span>
              <span style={{ fontSize: 12, color: "#aaa", margin: "0 4px" }}>→</span>
              <span style={{ fontSize: 14, color: "#9b59b6" }}>{v.masu}</span>
              <div style={{ fontSize: 11, color: "#888" }}>{v.vi}</div>
            </div>
          ))}
        </div>

        <Text style={{ fontWeight: 700, color: "#5b8ecf", fontSize: 13 }}>Nhóm 1 (う-verbs) — đổi âm cuối thành âm い rồi thêm ます:</Text>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, margin: "8px 0 12px" }}>
          {[
            { dict: "飲む", masu: "飲みます", vi: "uống" },
            { dict: "書く", masu: "書きます", vi: "viết" },
            { dict: "話す", masu: "話します", vi: "nói" },
            { dict: "行く", masu: "行きます", vi: "đi" },
          ].map((v) => (
            <div key={v.dict} style={{ padding: "8px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #a8c8e8" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#5b8ecf" }}>{v.dict}</span>
              <span style={{ fontSize: 12, color: "#aaa", margin: "0 4px" }}>→</span>
              <span style={{ fontSize: 14, color: "#5b8ecf" }}>{v.masu}</span>
              <div style={{ fontSize: 11, color: "#888" }}>{v.vi}</div>
            </div>
          ))}
        </div>

        <RuleBox accent="#9b59b6">
          <Text style={{ fontSize: 13, color: "#555" }}>
            Bất quy tắc chỉ có <strong>2 động từ</strong>:<br />
            する (suru) → します (shimasu) = làm &nbsp;|&nbsp; くる (kuru) → きます (kimasu) = đến
          </Text>
        </RuleBox>
      </div>
    ),
  },
  {
    id: "tense",
    icon: "⏱️",
    titleVi: "Cách diễn đạt thì",
    titleJp: "時制の表現",
    color: "#eafff9",
    accent: "#1abc9c",
    content: (
      <div>
        <RuleBox accent="#1abc9c">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Nhật chỉ có <strong>2 thì chính</strong>: hiện tại/tương lai và quá khứ. Thêm từ chỉ thời gian để làm rõ.
          </Text>
        </RuleBox>

        {[
          {
            label: "Hiện tại / Tương lai",
            color: "#4caf7d",
            note: "ます (masu) / ません (masen)",
            items: [
              { jp: "毎日ご飯を食べます。", roma: "Mainichi gohan wo tabemasu.", vi: "Tôi ăn cơm mỗi ngày." },
              { jp: "明日東京に行きます。", roma: "Ashita Tokyo ni ikimasu.", vi: "Ngày mai tôi đi Tokyo." },
            ],
          },
          {
            label: "Quá khứ",
            color: "#e07a5f",
            note: "ました (mashita) / ませんでした (masen deshita)",
            items: [
              { jp: "昨日映画を見ました。", roma: "Kinō eiga wo mimashita.", vi: "Hôm qua tôi xem phim." },
              { jp: "朝ご飯を食べませんでした。", roma: "Asagohan wo tabemasendeshita.", vi: "Tôi không ăn sáng." },
            ],
          },
          {
            label: "Đang diễn ra",
            color: "#9b59b6",
            note: "て-form + います (te imasu)",
            items: [
              { jp: "今ご飯を食べています。", roma: "Ima gohan wo tabete imasu.", vi: "Tôi đang ăn cơm." },
              { jp: "日本語を勉強しています。", roma: "Nihongo wo benkyō shite imasu.", vi: "Tôi đang học tiếng Nhật." },
            ],
          },
        ].map((block) => (
          <div key={block.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <div style={{ width: 3, height: 16, background: block.color, borderRadius: 2 }} />
              <Text style={{ fontWeight: 600, color: block.color, fontSize: 13 }}>{block.label}</Text>
              <Tag color={block.color}>{block.note}</Tag>
            </div>
            {block.items.map((item) => (
              <div key={item.jp} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 6, borderLeft: `3px solid ${block.color}66` }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>{item.jp}</div>
                <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>{item.roma}</div>
                <div style={{ fontSize: 13, color: "#555" }}>→ {item.vi}</div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {[
            ["今日", "kyō", "hôm nay"],
            ["昨日", "kinō", "hôm qua"],
            ["明日", "ashita", "ngày mai"],
            ["今", "ima", "bây giờ"],
            ["毎日", "mainichi", "mỗi ngày"],
          ].map(([jp, roma, vi]) => (
            <div key={jp} style={{ padding: "5px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #a0e4d3", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1abc9c" }}>{jp}</div>
              <div style={{ fontSize: 10, color: "#aaa" }}>{roma}</div>
              <div style={{ fontSize: 11, color: "#777" }}>{vi}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function JapaneseBeginnerGuide() {
  const [openId, setOpenId] = useState<string>("writing");

  return (
    <div style={{ padding: "24px 16px", maxWidth: 720, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#5b6b7a", fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4 }}>
        Cho người mới bắt đầu
      </Title>
      <Text style={{ display: "block", textAlign: "center", marginBottom: 28, color: "#8a97a3", fontSize: 14 }}>
        Nền tảng ngữ pháp tiếng Nhật — học trước khi vào JLPT
      </Text>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SECTIONS.map((sec) => {
          const isOpen = openId === sec.id;
          return (
            <div
              key={sec.id}
              style={{
                borderRadius: 16,
                background: sec.color,
                border: `1.5px solid ${sec.accent}33`,
                boxShadow: isOpen ? `0 4px 20px ${sec.accent}22` : "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "box-shadow 0.2s",
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? "" : sec.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 24 }}>{sec.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: sec.accent }}>{sec.titleVi}</div>
                  <div style={{ fontSize: 13, color: sec.accent + "aa" }}>{sec.titleJp}</div>
                </div>
                <span style={{ fontSize: 18, color: sec.accent, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ›
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 20px" }}>
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, padding: "16px 20px", background: "linear-gradient(135deg, #fff6ea, #eaf3ff)", borderRadius: 16, border: "1px solid #e0d8f0", textAlign: "center" }}>
        <Text style={{ fontSize: 14, color: "#666" }}>
          Đã nắm vững cơ bản? Học bảng chữ <strong>Hiragana</strong> ở tab tiếp theo, rồi mới vào từ vựng JLPT!
        </Text>
      </div>
    </div>
  );
}
