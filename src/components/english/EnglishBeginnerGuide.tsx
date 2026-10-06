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

function ExampleRow({ en, vi, note }: { en: string; vi: string; note?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{en}</span>
      <span style={{ fontSize: 13, color: "#555" }}>→ {vi}</span>
      {note && <span style={{ fontSize: 11, color: "#999", fontStyle: "italic" }}>{note}</span>}
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
  titleEn: string;
  color: string;
  accent: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "parts",
    icon: "🧩",
    titleVi: "Từ loại (Parts of Speech)",
    titleEn: "Parts of Speech",
    color: "#eaf3ff",
    accent: "#5b8ecf",
    content: (
      <div>
        <RuleBox accent="#5b8ecf">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Mỗi từ trong câu đều thuộc một <strong>từ loại</strong> — hiểu từ loại giúp bạn xây dựng câu đúng ngữ pháp.
          </Text>
        </RuleBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { name: "Noun (Danh từ)", color: "#5b8ecf", desc: "Người, vật, địa điểm, ý tưởng", ex: "dog, city, happiness" },
            { name: "Verb (Động từ)", color: "#4caf7d", desc: "Hành động hoặc trạng thái", ex: "run, eat, is, think" },
            { name: "Adjective (Tính từ)", color: "#e07a5f", desc: "Mô tả danh từ", ex: "big, beautiful, fast" },
            { name: "Adverb (Trạng từ)", color: "#9b59b6", desc: "Mô tả động từ/tính từ", ex: "quickly, very, always" },
            { name: "Preposition (Giới từ)", color: "#1abc9c", desc: "Chỉ vị trí, thời gian, hướng", ex: "in, on, at, to, from" },
            { name: "Pronoun (Đại từ)", color: "#f39c12", desc: "Thay thế danh từ", ex: "I, you, he, she, they" },
          ].map((p) => (
            <div key={p.name} style={{ padding: "10px 12px", background: p.color + "12", borderRadius: 10, border: `1px solid ${p.color}33` }}>
              <div style={{ fontWeight: 700, color: p.color, fontSize: 13, marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>{p.desc}</div>
              <div style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>{p.ex}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "sentence",
    icon: "📝",
    titleVi: "Cấu trúc câu",
    titleEn: "Sentence Structure",
    color: "#eafff2",
    accent: "#4caf7d",
    content: (
      <div>
        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Anh có thứ tự <strong>Chủ ngữ + Động từ + Tân ngữ (SVO)</strong>. Không được đảo thứ tự tự do như tiếng Việt.
          </Text>
        </RuleBox>

        {[
          { pattern: "S + V", ex: "She runs.", vi: "Cô ấy chạy.", note: "Câu đơn giản nhất" },
          { pattern: "S + V + O", ex: "I eat rice.", vi: "Tôi ăn cơm.", note: "Phổ biến nhất" },
          { pattern: "S + V + C", ex: "He is happy.", vi: "Anh ấy vui.", note: "C = tính từ/danh từ bổ nghĩa" },
          { pattern: "S + V + O + O", ex: "She gave me a book.", vi: "Cô ấy đưa cho tôi quyển sách.", note: "2 tân ngữ: người + vật" },
        ].map((r) => (
          <div key={r.pattern} style={{ padding: "10px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 8, borderLeft: "3px solid #4caf7d66" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Tag color="#4caf7d">{r.pattern}</Tag>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{r.ex}</span>
            </div>
            <div style={{ fontSize: 13, color: "#555" }}>→ {r.vi}</div>
            <div style={{ fontSize: 11, color: "#999", fontStyle: "italic" }}>{r.note}</div>
          </div>
        ))}

        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 13, color: "#555" }}>
            <strong>Câu hỏi Yes/No</strong> — đảo trợ động từ lên đầu:<br />
            "You are a student." → "<strong>Are</strong> you a student?"<br />
            "She can swim." → "<strong>Can</strong> she swim?"
          </Text>
        </RuleBox>
        <RuleBox accent="#e07a5f">
          <Text style={{ fontSize: 13, color: "#555" }}>
            <strong>Câu hỏi Wh-</strong>: What / Where / When / Who / Why / How + trợ động từ + S + V?<br />
            "Where <strong>do</strong> you live?" &nbsp;|&nbsp; "What <strong>is</strong> your name?"
          </Text>
        </RuleBox>
      </div>
    ),
  },
  {
    id: "tenses",
    icon: "⏱️",
    titleVi: "12 thì tiếng Anh",
    titleEn: "12 English Tenses",
    color: "#fff6ea",
    accent: "#e07a5f",
    content: (
      <div>
        <RuleBox accent="#e07a5f">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Anh có <strong>12 thì</strong>, chia theo 3 nhóm thời gian × 4 khía cạnh. Không cần thuộc hết ngay — bắt đầu với 4 thì cơ bản nhất.
          </Text>
        </RuleBox>

        {[
          {
            group: "Hiện tại",
            color: "#4caf7d",
            tenses: [
              { name: "Simple Present", form: "V / V-s", ex: "I work every day.", vi: "Thói quen, sự thật" },
              { name: "Present Continuous", form: "am/is/are + V-ing", ex: "I am working now.", vi: "Đang xảy ra" },
              { name: "Present Perfect", form: "have/has + V-ed", ex: "I have finished.", vi: "Vừa xong / kinh nghiệm" },
              { name: "Present Perfect Continuous", form: "have been + V-ing", ex: "I have been working.", vi: "Từ trước đến nay" },
            ],
          },
          {
            group: "Quá khứ",
            color: "#e07a5f",
            tenses: [
              { name: "Simple Past", form: "V-ed / V2", ex: "I worked yesterday.", vi: "Đã xảy ra và kết thúc" },
              { name: "Past Continuous", form: "was/were + V-ing", ex: "I was working.", vi: "Đang diễn ra trong quá khứ" },
              { name: "Past Perfect", form: "had + V-ed", ex: "I had finished.", vi: "Xảy ra trước một việc khác" },
              { name: "Past Perfect Continuous", form: "had been + V-ing", ex: "I had been working.", vi: "Kéo dài đến một điểm quá khứ" },
            ],
          },
          {
            group: "Tương lai",
            color: "#9b59b6",
            tenses: [
              { name: "Simple Future", form: "will + V", ex: "I will work tomorrow.", vi: "Quyết định ngay lúc nói" },
              { name: "Future Continuous", form: "will be + V-ing", ex: "I will be working.", vi: "Đang diễn ra trong tương lai" },
              { name: "Future Perfect", form: "will have + V-ed", ex: "I will have finished.", vi: "Hoàn thành trước một mốc tương lai" },
              { name: "Future Perfect Continuous", form: "will have been + V-ing", ex: "I will have been working.", vi: "Kéo dài đến một mốc tương lai" },
            ],
          },
        ].map((group) => (
          <div key={group.group} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <div style={{ width: 3, height: 16, background: group.color, borderRadius: 2 }} />
              <Text style={{ fontWeight: 700, color: group.color, fontSize: 14 }}>{group.group}</Text>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {group.tenses.map((t) => (
                <div key={t.name} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.75)", borderRadius: 10, borderLeft: `3px solid ${group.color}55` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: group.color }}>{t.name}</span>
                    <Tag color={group.color}>{t.form}</Tag>
                  </div>
                  <div style={{ fontSize: 13, color: "#444", marginTop: 2 }}>{t.ex}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{t.vi}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "articles",
    icon: "📖",
    titleVi: "Mạo từ (Articles)",
    titleEn: "Articles: a / an / the",
    color: "#f3eaff",
    accent: "#9b59b6",
    content: (
      <div>
        <RuleBox accent="#9b59b6">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Anh có <strong>mạo từ</strong> — tiếng Việt không có, nên đây là điểm khó nhất với người Việt học tiếng Anh.
          </Text>
        </RuleBox>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
          {[
            {
              art: "a",
              rule: "Danh từ đếm được số ít, bắt đầu bằng phụ âm",
              color: "#5b8ecf",
              examples: ["a dog", "a book", "a university (u phát âm /j/)"],
            },
            {
              art: "an",
              rule: "Danh từ đếm được số ít, bắt đầu bằng nguyên âm (a, e, i, o, u)",
              color: "#4caf7d",
              examples: ["an apple", "an hour (h câm)", "an umbrella"],
            },
            {
              art: "the",
              rule: "Danh từ đã biết, cụ thể, hoặc duy nhất",
              color: "#e07a5f",
              examples: ["the sun", "the book I gave you", "the first time"],
            },
          ].map((a) => (
            <div key={a.art} style={{ padding: "12px 14px", background: a.color + "12", borderRadius: 12, border: `1px solid ${a.color}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: a.color, fontStyle: "italic" }}>{a.art}</span>
                <span style={{ fontSize: 13, color: "#555" }}>{a.rule}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {a.examples.map((ex) => (
                  <span key={ex} style={{ fontSize: 12, background: "rgba(255,255,255,0.8)", padding: "3px 8px", borderRadius: 6, color: a.color, fontStyle: "italic" }}>{ex}</span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ padding: "10px 14px", background: "#99999912", borderRadius: 12, border: "1px solid #99999933" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#999", fontStyle: "italic" }}>∅</span>
            <span style={{ fontSize: 13, color: "#666", marginLeft: 10 }}>Không dùng mạo từ với: danh từ không đếm được, danh từ số nhiều chung chung, tên riêng</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
              {["Water is essential.", "Dogs are friendly.", "Vietnam is beautiful."].map((ex) => (
                <span key={ex} style={{ fontSize: 12, background: "rgba(255,255,255,0.8)", padding: "3px 8px", borderRadius: 6, color: "#888", fontStyle: "italic" }}>{ex}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "mistakes",
    icon: "⚠️",
    titleVi: "Lỗi thường gặp",
    titleEn: "Common Mistakes",
    color: "#eafff9",
    accent: "#1abc9c",
    content: (
      <div>
        <RuleBox accent="#1abc9c">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Người Việt học tiếng Anh thường mắc những lỗi này do ảnh hưởng từ tiếng Việt.
          </Text>
        </RuleBox>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              wrong: "I very like pizza.",
              right: "I like pizza very much.",
              explain: '"Very" không đứng trước động từ — dùng "very much" ở cuối hoặc "really" trước động từ.',
            },
            {
              wrong: "She don't know.",
              right: "She doesn't know.",
              explain: 'Ngôi 3 số ít (he/she/it) dùng "doesn\'t" không phải "don\'t".',
            },
            {
              wrong: "Yesterday I go to school.",
              right: "Yesterday I went to school.",
              explain: "Cần chia động từ sang quá khứ — tiếng Việt không chia, nhưng tiếng Anh bắt buộc.",
            },
            {
              wrong: "I have 20 years old.",
              right: "I am 20 years old.",
              explain: 'Tuổi dùng "be" (am/is/are) không phải "have". Tiếng Việt nói "tôi có 20 tuổi" nhưng tiếng Anh không dùng "have".',
            },
            {
              wrong: "The informations are wrong.",
              right: "The information is wrong.",
              explain: '"Information" là danh từ không đếm được — không thêm "s" và chia số ít.',
            },
            {
              wrong: "I am boring.",
              right: "I am bored.",
              explain: '"Boring" = gây chán (sự vật). "Bored" = cảm thấy chán (con người). Nhớ: -ing (gây ra cảm giác) vs -ed (trải nghiệm cảm giác).',
            },
          ].map((m) => (
            <div key={m.wrong} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e0e0e0" }}>
              <div style={{ padding: "8px 14px", background: "#ffe8e8", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#e74c3c", fontSize: 14 }}>✗</span>
                <span style={{ fontSize: 14, color: "#c0392b", textDecoration: "line-through" }}>{m.wrong}</span>
              </div>
              <div style={{ padding: "8px 14px", background: "#e8f5e9", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#27ae60", fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1e8449" }}>{m.right}</span>
              </div>
              <div style={{ padding: "8px 14px", background: "rgba(255,255,255,0.8)", fontSize: 12, color: "#666" }}>
                {m.explain}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function EnglishBeginnerGuide() {
  const [openId, setOpenId] = useState<string>("parts");

  return (
    <div style={{ padding: "24px 16px", maxWidth: 720, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#5b6b7a", fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4 }}>
        Cho người mới bắt đầu
      </Title>
      <Text style={{ display: "block", textAlign: "center", marginBottom: 28, color: "#8a97a3", fontSize: 14 }}>
        Nền tảng ngữ pháp tiếng Anh — hiểu cơ bản trước khi học từ vựng
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
                  <div style={{ fontSize: 13, color: sec.accent + "aa" }}>{sec.titleEn}</div>
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

      <div style={{ marginTop: 28, padding: "16px 20px", background: "linear-gradient(135deg, #eaf3ff, #eafff2)", borderRadius: 16, border: "1px solid #c8e0f0", textAlign: "center" }}>
        <Text style={{ fontSize: 14, color: "#666" }}>
          Đã nắm vững cơ bản? Chuyển sang tab <strong>Từ vựng</strong> để bắt đầu học từ theo chủ đề!
        </Text>
      </div>
    </div>
  );
}
