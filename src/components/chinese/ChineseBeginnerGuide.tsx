import { useState } from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface Section {
  id: string;
  icon: string;
  titleVi: string;
  titleZh: string;
  color: string;
  accent: string;
  content: React.ReactNode;
}

function ExampleRow({ zh, pinyin, vi }: { zh: string; pinyin: string; vi: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 14px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: "#333", fontFamily: "serif" }}>{zh}</span>
      <span style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>{pinyin}</span>
      <span style={{ fontSize: 14, color: "#555" }}>→ {vi}</span>
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

function RuleBox({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{ border: `1.5px solid ${accent}44`, borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: "10px 14px", background: accent + "09", marginBottom: 12 }}>
      {children}
    </div>
  );
}

const SECTIONS: Section[] = [
  {
    id: "intro",
    icon: "🀄",
    titleVi: "Tiếng Trung là gì?",
    titleZh: "中文是什么？",
    color: "#eaf3ff",
    accent: "#5b8ecf",
    content: (
      <div>
        <RuleBox accent="#5b8ecf">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Mỗi <strong>chữ Hán</strong> là một âm tiết có nghĩa. Tiếng Trung <strong>không có bảng chữ cái</strong> — bạn học từng chữ một.
          </Text>
        </RuleBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { zh: "我", py: "wǒ", vi: "Tôi" },
            { zh: "你", py: "nǐ", vi: "Bạn" },
            { zh: "他", py: "tā", vi: "Anh ấy" },
            { zh: "好", py: "hǎo", vi: "Tốt / Khỏe" },
          ].map((e) => (
            <div key={e.zh} style={{ textAlign: "center", padding: "10px 8px", background: "rgba(255,255,255,0.8)", borderRadius: 10, border: "1px solid #d0e4f7" }}>
              <div style={{ fontSize: 28, fontFamily: "serif", fontWeight: 700, color: "#5b8ecf" }}>{e.zh}</div>
              <div style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{e.py}</div>
              <div style={{ fontSize: 13, color: "#555" }}>{e.vi}</div>
            </div>
          ))}
        </div>
        <RuleBox accent="#5b8ecf">
          <Text style={{ fontSize: 13, color: "#555" }}>
            <strong>Bính âm (拼音 Pīnyīn)</strong> là hệ thống La-tinh hóa giúp bạn đọc tiếng Trung. Học bính âm ở tab <em>Bính âm</em> trước khi học từ vựng!
          </Text>
        </RuleBox>
        <div style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: "#666" }}>Tiếng Trung có <strong>4 thanh điệu</strong> + 1 thanh nhẹ:</Text>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
            {[
              { mark: "ā", num: "1", name: "Bằng", color: "#5b8ecf" },
              { mark: "á", num: "2", name: "Sắc", color: "#e07a5f" },
              { mark: "ǎ", num: "3", name: "Hỏi", color: "#4caf7d" },
              { mark: "à", num: "4", name: "Nặng", color: "#9b59b6" },
              { mark: "a", num: "0", name: "Nhẹ", color: "#999" },
            ].map((t) => (
              <div key={t.num} style={{ textAlign: "center", padding: "6px 10px", background: t.color + "15", borderRadius: 8, border: `1px solid ${t.color}33` }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.color }}>{t.mark}</div>
                <div style={{ fontSize: 11, color: "#777" }}>Thanh {t.num}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sentence",
    icon: "📝",
    titleVi: "Cấu trúc câu cơ bản",
    titleZh: "基本句子结构",
    color: "#eafff2",
    accent: "#4caf7d",
    content: (
      <div>
        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Cấu trúc câu tiếng Trung giống tiếng Anh: <strong>Chủ ngữ + Vị ngữ + Tân ngữ</strong>
          </Text>
          <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <Tag color="#5b8ecf">Chủ ngữ (S)</Tag>
            <span style={{ color: "#999" }}>+</span>
            <Tag color="#4caf7d">Động từ (V)</Tag>
            <span style={{ color: "#999" }}>+</span>
            <Tag color="#e07a5f">Tân ngữ (O)</Tag>
          </div>
        </RuleBox>

        <ExampleRow zh="我 吃 饭。" pinyin="Wǒ chī fàn." vi="Tôi ăn cơm." />
        <ExampleRow zh="你 喝 水 吗？" pinyin="Nǐ hē shuǐ ma?" vi="Bạn có uống nước không?" />
        <ExampleRow zh="她 学 中文。" pinyin="Tā xué Zhōngwén." vi="Cô ấy học tiếng Trung." />

        <RuleBox accent="#4caf7d">
          <Text style={{ fontSize: 13, color: "#555" }}>
            <strong>Thời gian</strong> thường đặt <em>trước động từ</em> hoặc đầu câu (khác tiếng Anh):<br />
            <span style={{ fontFamily: "serif", fontSize: 16 }}>我<strong>今天</strong>吃饭。</span> → Hôm nay tôi ăn cơm.
          </Text>
        </RuleBox>

        <Text style={{ fontSize: 13, color: "#666" }}>Câu phủ định — dùng <strong style={{ fontSize: 16, fontFamily: "serif" }}>不</strong> (bù) hoặc <strong style={{ fontSize: 16, fontFamily: "serif" }}>没</strong> (méi):</Text>
        <div style={{ marginTop: 6 }}>
          <ExampleRow zh="我不吃饭。" pinyin="Wǒ bù chī fàn." vi="Tôi không ăn cơm." />
          <ExampleRow zh="我没吃饭。" pinyin="Wǒ méi chī fàn." vi="Tôi chưa/không ăn cơm (thực tế)." />
        </div>
      </div>
    ),
  },
  {
    id: "tense",
    icon: "⏱️",
    titleVi: "Cách diễn đạt thì",
    titleZh: "时态表达方式",
    color: "#fff6ea",
    accent: "#e07a5f",
    content: (
      <div>
        <RuleBox accent="#e07a5f">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Trung <strong>không chia động từ</strong> theo thì! Thay vào đó, dùng <strong>từ chỉ thời gian</strong> và <strong>trợ từ ngữ khí</strong>.
          </Text>
        </RuleBox>

        {[
          {
            label: "Hiện tại / Trạng thái",
            color: "#4caf7d",
            items: [
              { zh: "我吃饭。", py: "Wǒ chī fàn.", vi: "Tôi ăn cơm. (thói quen)" },
              { zh: "我正在吃饭。", py: "Wǒ zhèngzài chī fàn.", vi: "Tôi đang ăn cơm. (đang diễn ra)", note: "正在...呢" },
            ],
          },
          {
            label: "Quá khứ",
            color: "#e07a5f",
            items: [
              { zh: "我吃饭了。", py: "Wǒ chī fàn le.", vi: "Tôi đã ăn cơm. (vừa xong)", note: "了 (le)" },
              { zh: "我吃过饭。", py: "Wǒ chīguò fàn.", vi: "Tôi từng ăn cơm. (trải nghiệm)", note: "过 (guò)" },
            ],
          },
          {
            label: "Tương lai",
            color: "#9b59b6",
            items: [
              { zh: "我要吃饭。", py: "Wǒ yào chī fàn.", vi: "Tôi sẽ ăn cơm. (có kế hoạch)", note: "要 (yào)" },
              { zh: "我会吃饭。", py: "Wǒ huì chī fàn.", vi: "Tôi sẽ ăn cơm. (khả năng)", note: "会 (huì)" },
            ],
          },
        ].map((block) => (
          <div key={block.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 3, height: 16, background: block.color, borderRadius: 2 }} />
              <Text style={{ fontWeight: 600, color: block.color, fontSize: 13 }}>{block.label}</Text>
            </div>
            {block.items.map((item) => (
              <div key={item.zh} style={{ display: "flex", flexDirection: "column", gap: 1, padding: "8px 12px", background: "rgba(255,255,255,0.7)", borderRadius: 10, marginBottom: 6, borderLeft: `3px solid ${block.color}66` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#333", fontFamily: "serif" }}>{item.zh}</span>
                  {item.note && <Tag color={block.color}>{item.note}</Tag>}
                </div>
                <span style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>{item.py}</span>
                <span style={{ fontSize: 13, color: "#555" }}>→ {item.vi}</span>
              </div>
            ))}
          </div>
        ))}

        <RuleBox accent="#e07a5f">
          <Text style={{ fontSize: 13, color: "#555" }}>
            Cũng có thể thêm từ chỉ thời gian vào đầu câu:<br />
            <span style={{ fontFamily: "serif", fontSize: 15 }}>昨天</span> (zuótiān) = hôm qua &nbsp;|&nbsp;
            <span style={{ fontFamily: "serif", fontSize: 15 }}>今天</span> (jīntiān) = hôm nay &nbsp;|&nbsp;
            <span style={{ fontFamily: "serif", fontSize: 15 }}>明天</span> (míngtiān) = ngày mai
          </Text>
        </RuleBox>
      </div>
    ),
  },
  {
    id: "questions",
    icon: "❓",
    titleVi: "Đặt câu hỏi",
    titleZh: "怎么提问？",
    color: "#f3eaff",
    accent: "#9b59b6",
    content: (
      <div>
        <RuleBox accent="#9b59b6">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Tiếng Trung có <strong>3 cách hỏi</strong> chính.
          </Text>
        </RuleBox>

        <Text style={{ fontWeight: 600, color: "#9b59b6", fontSize: 13 }}>1. Thêm 吗 (ma) cuối câu — câu hỏi Yes/No</Text>
        <div style={{ marginTop: 6, marginBottom: 12 }}>
          <ExampleRow zh="你是学生吗？" pinyin="Nǐ shì xuésheng ma?" vi="Bạn có phải là học sinh không?" />
        </div>

        <Text style={{ fontWeight: 600, color: "#9b59b6", fontSize: 13 }}>2. Từ hỏi thay thế (Wh-questions)</Text>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, margin: "8px 0 12px" }}>
          {[
            { zh: "什么", py: "shénme", vi: "cái gì?" },
            { zh: "谁", py: "shuí", vi: "ai?" },
            { zh: "哪里", py: "nǎlǐ", vi: "ở đâu?" },
            { zh: "什么时候", py: "shénme shíhou", vi: "khi nào?" },
            { zh: "为什么", py: "wèishénme", vi: "tại sao?" },
            { zh: "怎么", py: "zěnme", vi: "như thế nào?" },
          ].map((q) => (
            <div key={q.zh} style={{ padding: "7px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #c8a8e8" }}>
              <div style={{ fontSize: 16, fontFamily: "serif", fontWeight: 700, color: "#9b59b6" }}>{q.zh}</div>
              <div style={{ fontSize: 11, color: "#aaa", fontStyle: "italic" }}>{q.py}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{q.vi}</div>
            </div>
          ))}
        </div>
        <ExampleRow zh="你去哪里？" pinyin="Nǐ qù nǎlǐ?" vi="Bạn đi đâu?" />

        <Text style={{ fontWeight: 600, color: "#9b59b6", fontSize: 13 }}>3. A 还是 B — câu hỏi lựa chọn</Text>
        <div style={{ marginTop: 6 }}>
          <ExampleRow zh="你喝茶还是咖啡？" pinyin="Nǐ hē chá háishi kāfēi?" vi="Bạn uống trà hay cà phê?" />
        </div>
      </div>
    ),
  },
  {
    id: "measure",
    icon: "🔢",
    titleVi: "Lượng từ & Số đếm",
    titleZh: "量词和数字",
    color: "#eafff9",
    accent: "#1abc9c",
    content: (
      <div>
        <RuleBox accent="#1abc9c">
          <Text style={{ fontSize: 14, color: "#444" }}>
            Trong tiếng Trung, khi đếm danh từ bạn <strong>phải dùng lượng từ</strong> giữa số và danh từ. Giống như tiếng Việt!<br />
            <span style={{ fontSize: 13, color: "#666" }}>Số + Lượng từ + Danh từ</span>
          </Text>
        </RuleBox>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
          {[
            { zh: "个", py: "gè", vi: "cái / người (phổ thông nhất)" },
            { zh: "本", py: "běn", vi: "cuốn (sách, vở)" },
            { zh: "张", py: "zhāng", vi: "tờ (giấy, bàn, vé)" },
            { zh: "条", py: "tiáo", vi: "con (cá, rắn) / cái (quần)" },
            { zh: "只", py: "zhī", vi: "con (chim, mèo, tay)" },
            { zh: "杯", py: "bēi", vi: "ly, cốc (đồ uống)" },
          ].map((m) => (
            <div key={m.zh} style={{ padding: "8px 10px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #a0e4d3" }}>
              <span style={{ fontSize: 20, fontFamily: "serif", fontWeight: 700, color: "#1abc9c" }}>{m.zh}</span>
              <span style={{ fontSize: 12, color: "#aaa", fontStyle: "italic", marginLeft: 6 }}>{m.py}</span>
              <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{m.vi}</div>
            </div>
          ))}
        </div>

        <ExampleRow zh="三个苹果" pinyin="sān gè píngguǒ" vi="ba quả táo" />
        <ExampleRow zh="两本书" pinyin="liǎng běn shū" vi="hai quyển sách" />
        <ExampleRow zh="一杯茶" pinyin="yī bēi chá" vi="một ly trà" />

        <RuleBox accent="#1abc9c">
          <Text style={{ fontSize: 13, color: "#555" }}>
            Không biết lượng từ? Dùng <strong style={{ fontFamily: "serif", fontSize: 16 }}>个</strong> (gè) trong hầu hết trường hợp — người bản ngữ vẫn hiểu!
          </Text>
        </RuleBox>

        <Text style={{ fontWeight: 600, color: "#1abc9c", fontSize: 13 }}>Số 1–10:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {[
            ["一", "yī", "1"], ["二", "èr", "2"], ["三", "sān", "3"],
            ["四", "sì", "4"], ["五", "wǔ", "5"], ["六", "liù", "6"],
            ["七", "qī", "7"], ["八", "bā", "8"], ["九", "jiǔ", "9"], ["十", "shí", "10"],
          ].map(([zh, py, n]) => (
            <div key={n} style={{ textAlign: "center", padding: "6px 8px", background: "rgba(255,255,255,0.8)", borderRadius: 8, border: "1px solid #a0e4d3", minWidth: 44 }}>
              <div style={{ fontSize: 18, fontFamily: "serif", fontWeight: 700, color: "#1abc9c" }}>{zh}</div>
              <div style={{ fontSize: 10, color: "#aaa" }}>{py}</div>
              <div style={{ fontSize: 11, color: "#777" }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ChineseBeginnerGuide() {
  const [openId, setOpenId] = useState<string>("intro");

  return (
    <div style={{ padding: "24px 16px", maxWidth: 720, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#5b6b7a", fontSize: "clamp(20px, 5vw, 28px)", marginBottom: 4 }}>
        Cho người mới bắt đầu
      </Title>
      <Text style={{ display: "block", textAlign: "center", marginBottom: 28, color: "#8a97a3", fontSize: 14 }}>
        Nền tảng ngữ pháp tiếng Trung — học trước khi vào HSK
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
                  <div style={{ fontFamily: "serif", fontSize: 13, color: sec.accent + "aa" }}>{sec.titleZh}</div>
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
          Đã nắm vững cơ bản? Bắt đầu học từ vựng từ <strong>HSK 1</strong> để xây dựng vốn từ!
        </Text>
      </div>
    </div>
  );
}
