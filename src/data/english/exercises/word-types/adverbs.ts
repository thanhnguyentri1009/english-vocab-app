import type { ExerciseQuestion } from "../types";

export const ADVERB_QUESTIONS: ExerciseQuestion[] = [
  {
    id: "adv001",
    question: "She speaks English ___.",
    options: ["fluent", "fluently", "fluence", "fluently's"],
    correctIndex: 1,
    explanation: "Trạng từ 'fluently' được tạo từ tính từ 'fluent' bằng cách thêm đuôi -ly, dùng để miêu tả cách một hành động diễn ra. Ở đây nó bổ nghĩa cho động từ 'speaks', cho biết cô ấy nói tiếng Anh với mức độ trôi chảy ra sao. Tránh nhầm với 'fluent' (tính từ, chỉ đứng trước danh từ hoặc sau động từ 'to be') vì nó không thể đứng sau động từ hành động 'speaks' như vậy."
  },
  {
    id: "adv002",
    question: "He works very ___ and never takes breaks.",
    options: ["hard", "hardly", "hardness", "harder"],
    correctIndex: 0,
    explanation: "'Hard' là một trường hợp đặc biệt: vừa là tính từ ('a hard test') vừa là trạng từ chỉ cách thức ('work hard' = làm việc chăm chỉ), không thêm -ly. Ở đây 'hard' bổ nghĩa cho động từ 'works', được nhấn mạnh thêm bởi 'very'. Cẩn thận với 'hardly' - trông giống nhưng nghĩa hoàn toàn khác: 'hầu như không', nếu chọn nhầm câu sẽ mang nghĩa ngược lại với ý câu muốn nói."
  },
  {
    id: "adv003",
    question: "The train arrived ___ on time.",
    options: ["exact", "exactness", "exactly", "exacting"],
    correctIndex: 2,
    explanation: "Trạng từ 'exactly' (từ tính từ 'exact' + -ly) dùng để nhấn mạnh mức độ chính xác của cụm 'on time' đứng ngay sau nó. Nó không bổ nghĩa cho danh từ nên 'exactness' (danh từ) và 'exacting' (tính từ/-ing) đều không phù hợp ở vị trí này. Ghi nhớ: trạng từ có thể đứng trước cụm giới từ để nhấn mạnh nó, giống như 'exactly on time'."
  },
  {
    id: "adv004",
    question: "She ___ studies before exams.",
    options: ["careful", "care", "carefully", "carefulness"],
    correctIndex: 2,
    explanation: "'Carefully' là trạng từ của tính từ 'careful' (thêm -ly), dùng để nói cô ấy học bài một cách cẩn thận. Nó bổ nghĩa cho động từ 'studies' đứng ngay sau. Đừng chọn 'careful' vì tính từ không thể đứng liền trước động từ như vậy, và 'carefulness' là danh từ trừu tượng, không có vai trò ngữ pháp phù hợp ở đây."
  },
  {
    id: "adv005",
    question: "He drives ___ on the highway.",
    options: ["quick", "quickly", "quickness", "quicken"],
    correctIndex: 1,
    explanation: "Trạng từ 'quickly' (quick + -ly) bổ nghĩa cho động từ 'drives', miêu tả cách anh ấy lái xe trên đường cao tốc. Tính từ 'quick' không thể đứng sau động từ thường như 'drives' để chỉ cách thức. Còn 'quickness' (danh từ) và 'quicken' (động từ) đều sai từ loại cho vị trí trống này."
  },
  {
    id: "adv006",
    question: "The baby slept ___ all night.",
    options: ["peaceful", "peace", "peacefulness", "peacefully"],
    correctIndex: 3,
    explanation: "'Peacefully' là dạng trạng từ của tính từ 'peaceful', thêm -ly để chỉ cách em bé ngủ. Nó bổ nghĩa cho động từ 'slept' đứng trước. So với 'peaceful' (tính từ) chỉ hợp khi đứng trước danh từ như 'a peaceful night', trạng từ mới đúng ở đây."
  },
  {
    id: "adv007",
    question: "I ___ forgot to call her.",
    options: ["complete", "completion", "completely", "completing"],
    correctIndex: 2,
    explanation: "Trạng từ 'completely' (complete + -ly) mang nghĩa 'hoàn toàn', bổ nghĩa cho động từ 'forgot' để nhấn mạnh mức độ quên. 'Completion' là danh từ và 'completing' là dạng -ing của động từ, cả hai đều không thể đứng ở vị trí bổ nghĩa cho một động từ khác như vậy."
  },
  {
    id: "adv008",
    question: "She smiled ___ at the camera.",
    options: ["bright", "brightness", "brightly", "brighten"],
    correctIndex: 2,
    explanation: "'Brightly' (bright + -ly) là trạng từ chỉ cách thức, bổ nghĩa cho động từ 'smiled' - nụ cười rạng rỡ trước ống kính. Tính từ 'bright' chỉ dùng được với danh từ ('a bright smile'), không đứng sau động từ 'smiled' theo cách này."
  },
  {
    id: "adv009",
    question: "He ___ agreed with the proposal.",
    options: ["ready", "readiness", "readily", "readied"],
    correctIndex: 2,
    explanation: "'Readily' (từ 'ready', đổi y thành i rồi + ly) nghĩa là 'sẵn sàng, vui vẻ', bổ nghĩa cho động từ 'agreed'. Đây là biến âm chính tả cần nhớ: y đổi thành i trước khi thêm -ly (ready → readily), khác với quy tắc thêm -ly trực tiếp thông thường. 'Readiness' (danh từ) và 'readied' (động từ ở dạng quá khứ) đều không phù hợp ngữ pháp ở đây."
  },
  {
    id: "adv010",
    question: "The children played ___ in the park.",
    options: ["happy", "happiness", "happily", "happied"],
    correctIndex: 2,
    explanation: "'Happily' là trạng từ của 'happy', theo quy tắc chính tả: tính từ tận cùng bằng phụ âm + y thì đổi y thành i rồi thêm -ly (happy → happily). Nó bổ nghĩa cho động từ 'played', diễn tả bọn trẻ chơi đùa vui vẻ. 'Happiness' là danh từ nên không thể đứng ở vị trí bổ nghĩa động từ này."
  },
  {
    id: "adv011",
    question: "She answered the question ___ without hesitation.",
    options: ["confident", "confidence", "confide", "confidently"],
    correctIndex: 3,
    explanation: "'Confidently' (confident + ly) là trạng từ bổ nghĩa cho động từ 'answered', cho biết cô ấy trả lời một cách tự tin, không do dự. 'Confidence' là danh từ và 'confide' là động từ ('tâm sự'), cả hai đều sai vị trí ngữ pháp so với 'confidently'."
  },
  {
    id: "adv012",
    question: "He ___ understood the instructions.",
    options: ["clear", "clarity", "clearly", "clearing"],
    correctIndex: 2,
    explanation: "'Clearly' (clear + ly) bổ nghĩa cho động từ 'understood', nghĩa là anh ấy hiểu rõ ràng các hướng dẫn. Tính từ 'clear' không thể đứng ngay sau chủ ngữ trước động từ thường theo cách này; 'clarity' (danh từ) và 'clearing' (-ing) cũng không đúng từ loại."
  },
  {
    id: "adv013",
    question: "The team worked ___ to meet the deadline.",
    options: ["efficient", "efficiency", "efficiently", "efficiented"],
    correctIndex: 2,
    explanation: "'Efficiently' là trạng từ của tính từ 'efficient' (thêm -ly), bổ nghĩa cho động từ 'worked' để nói đội nhóm làm việc hiệu quả nhằm kịp hạn chót. 'Efficiency' (danh từ) và 'efficiented' (không phải từ thật) đều không hợp ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv014",
    question: "She ___ accepted the award.",
    options: ["graceful", "grace", "gracefulness", "gracefully"],
    correctIndex: 3,
    explanation: "'Gracefully' (graceful + ly) là trạng từ chỉ cách thức, bổ nghĩa cho động từ 'accepted' - cô ấy nhận giải thưởng một cách thanh lịch, duyên dáng. Tính từ 'graceful' cần đứng trước danh từ, còn danh từ 'grace' và 'gracefulness' không thể bổ nghĩa cho động từ."
  },
  {
    id: "adv015",
    question: "He spoke ___ to the elderly woman.",
    options: ["kind", "kindness", "kindly", "kinder"],
    correctIndex: 2,
    explanation: "'Kindly' (kind + ly) bổ nghĩa cho động từ 'spoke', diễn tả cách anh ấy nói chuyện tử tế, ân cần với bà cụ. Tính từ 'kind' không đứng được ngay sau chủ ngữ để bổ nghĩa động từ thường; 'kindness' (danh từ) và 'kinder' (so sánh hơn của tính từ) cũng không phù hợp."
  },
  {
    id: "adv016",
    question: "The results were ___ better than expected.",
    options: ["significant", "significance", "signify", "significantly"],
    correctIndex: 3,
    explanation: "'Significantly' (significant + ly) là trạng từ chỉ mức độ, đứng trước và bổ nghĩa cho tính từ so sánh 'better' để nhấn mạnh mức độ chênh lệch. Đây khác với các câu bổ nghĩa cho động từ: ở đây trạng từ bổ nghĩa cho một tính từ. 'Significance' (danh từ) và 'signify' (động từ) không thể đứng trước tính từ theo cách này."
  },
  {
    id: "adv017",
    question: "She ___ denied having any knowledge of the incident.",
    options: ["flat", "flatten", "flatness", "flatly"],
    correctIndex: 3,
    explanation: "'Flatly' (flat + ly) mang nghĩa 'thẳng thừng, dứt khoát', bổ nghĩa cho động từ 'denied'. Đây là một trạng từ mang nghĩa bóng khác hẳn nghĩa đen của 'flat' (phẳng) - cần ghi nhớ như một cụm cố định 'flatly deny'. 'Flatten' (động từ) và 'flatness' (danh từ) đều sai từ loại ở vị trí này."
  },
  {
    id: "adv018",
    question: "He performed ___ at the concert last night.",
    options: ["brilliant", "brilliance", "brilliantly", "brillianted"],
    correctIndex: 2,
    explanation: "'Brilliantly' (brilliant + ly) bổ nghĩa cho động từ 'performed', khen ngợi màn trình diễn xuất sắc trong buổi hòa nhạc. Tính từ 'brilliant' không đứng được sau chủ ngữ để bổ nghĩa cho một động từ hành động; 'brilliance' (danh từ) cũng vậy."
  },
  {
    id: "adv019",
    question: "The door ___ opened as I approached.",
    options: ["slow", "slowly", "slowness", "slowing"],
    correctIndex: 1,
    explanation: "'Slowly' (slow + ly) là trạng từ chỉ cách thức, bổ nghĩa cho động từ 'opened' - cánh cửa mở ra một cách từ từ. Tính từ 'slow' chỉ dùng trước danh từ, còn 'slowness' (danh từ) và 'slowing' (-ing) không đúng vị trí ở đây."
  },
  {
    id: "adv020",
    question: "She ___ refused to give up.",
    options: ["stubborn", "stubbornness", "stubbornly", "stubbornish"],
    correctIndex: 2,
    explanation: "'Stubbornly' (stubborn + ly) bổ nghĩa cho động từ 'refused', diễn tả sự từ chối một cách bướng bỉnh, không lay chuyển. 'Stubbornness' là danh từ nên không thể đứng ở vị trí trạng từ bổ nghĩa động từ này."
  },
  {
    id: "adv021",
    question: "I can ___ believe how fast time has passed.",
    options: ["hard", "hardly", "hardness", "hardens"],
    correctIndex: 1,
    explanation: "'Hardly' là trạng từ mang nghĩa 'hầu như không', khác hẳn với 'hard' (chăm chỉ / cứng). Ở đây 'hardly believe' nghĩa là 'khó mà tin được', bổ nghĩa cho động từ 'believe' để diễn tả mức độ khó tin. Đây là cặp từ dễ gây nhầm lẫn kinh điển: 'work hard' (làm việc chăm chỉ) khác hoàn toàn 'can hardly believe' (hầu như không tin nổi)."
  },
  {
    id: "adv022",
    question: "He ___ arrived when the meeting started.",
    options: ["bare", "barely", "bareness", "bares"],
    correctIndex: 1,
    explanation: "'Barely' (bare + ly) nghĩa là 'vừa đủ, hầu như không kịp', bổ nghĩa cho động từ 'arrived' - anh ấy đến đúng lúc cuộc họp bắt đầu, sát nút. Tính từ 'bare' (trần, trơ) mang nghĩa khác hẳn nên không thể dùng làm trạng từ ở đây; 'bareness' (danh từ) cũng sai vị trí."
  },
  {
    id: "adv023",
    question: "She finished the project ___ before the deadline.",
    options: ["near", "nearly", "nearness", "nearing"],
    correctIndex: 1,
    explanation: "'Nearly' (near + ly) nghĩa là 'gần như, suýt soát', bổ nghĩa cho cụm trạng ngữ 'before the deadline' để nói cô ấy hoàn thành gần sát hạn chót. Lưu ý 'nearly' khác nghĩa với 'near' (gần, về khoảng cách) - đây là một cặp dễ nhầm vì hình thức giống nhau nhưng nghĩa lệch nhau. 'Nearness' (danh từ) không thể đứng ở vị trí này."
  },
  {
    id: "adv024",
    question: "They ___ go to the cinema on weekends.",
    options: ["usual", "usually", "usefulness", "usefully"],
    correctIndex: 1,
    explanation: "'Usually' (usual + ly) là trạng từ tần suất, đứng đầu câu để nói về thói quen lặp lại của họ vào cuối tuần. Nó bổ nghĩa cho cả hành động 'go to the cinema' chứ không riêng một từ nào. Các lựa chọn còn lại như 'usefulness'/'usefully' đến từ từ gốc khác ('useful' - hữu ích), hoàn toàn lạc đề về nghĩa."
  },
  {
    id: "adv025",
    question: "He ___ checks his email in the morning.",
    options: ["regular", "regulate", "regularly", "regularity"],
    correctIndex: 2,
    explanation: "'Regularly' (regular + ly) là trạng từ tần suất nghĩa là 'đều đặn', bổ nghĩa cho động từ 'checks'. 'Regulate' là động từ ('điều chỉnh') và 'regularity' là danh từ, cả hai không thể đứng ở vị trí trạng từ bổ nghĩa cho 'checks' trong câu này."
  },
  {
    id: "adv026",
    question: "She sings ___ in the choir.",
    options: ["beautiful", "beauty", "beautifully", "beautified"],
    correctIndex: 2,
    explanation: "'Beautifully' (beautiful + ly) bổ nghĩa cho động từ 'sings', miêu tả giọng hát hay trong dàn hợp xướng. Tính từ 'beautiful' không thể đứng ngay sau động từ thường 'sings'; danh từ 'beauty' và động từ 'beautified' cũng sai từ loại."
  },
  {
    id: "adv027",
    question: "The project was completed ___ on schedule.",
    options: ["precise", "precisely", "precision", "preciseness"],
    correctIndex: 1,
    explanation: "'Precisely' (precise + ly) nhấn mạnh cho cụm 'on schedule', nghĩa là dự án hoàn thành đúng chính xác thời hạn. Trạng từ có thể đứng trước cụm giới từ để làm rõ nghĩa của nó. 'Precision' (danh từ) và 'preciseness' (danh từ ít dùng hơn) đều không phù hợp ở vị trí trạng từ này."
  },
  {
    id: "adv028",
    question: "He ___ managed to escape from the locked room.",
    options: ["miracle", "miraculously", "miraculous", "miracled"],
    correctIndex: 1,
    explanation: "'Miraculously' là trạng từ (từ tính từ 'miraculous' + ly) nghĩa là 'một cách kỳ diệu', bổ nghĩa cho động từ 'managed'. 'Miracle' là danh từ ('phép màu') và 'miracled' không phải là từ thật, nên đều bị loại. Ghi nhớ chuỗi: miracle (danh từ) → miraculous (tính từ) → miraculously (trạng từ)."
  },
  {
    id: "adv029",
    question: "She ___ thanked her team for the support.",
    options: ["warm", "warmness", "warmly", "warmed"],
    correctIndex: 2,
    explanation: "'Warmly' (warm + ly) bổ nghĩa cho động từ 'thanked', diễn tả lời cảm ơn chân thành, ấm áp dành cho đội nhóm. 'Warmness' là danh từ ít dùng và không hợp ngữ pháp ở vị trí trạng từ; 'warmed' là động từ ở thì quá khứ, sai nghĩa hoàn toàn."
  },
  {
    id: "adv030",
    question: "The child ___ wrote the alphabet.",
    options: ["neat", "neatness", "neatly", "neated"],
    correctIndex: 2,
    explanation: "'Neatly' (neat + ly) bổ nghĩa cho động từ 'wrote', miêu tả đứa trẻ viết chữ cái một cách gọn gàng, ngay ngắn. Tính từ 'neat' không đứng được ngay sau chủ ngữ để bổ nghĩa cho động từ 'wrote'; 'neatness' (danh từ) cũng không đúng vị trí."
  },
  {
    id: "adv031",
    question: "The news spread ___ throughout the city.",
    options: ["rapid", "rapidly", "rapidity", "rapiding"],
    correctIndex: 1,
    explanation: "'Rapidly' (rapid + ly) bổ nghĩa cho động từ 'spread', nói tin tức lan truyền nhanh chóng khắp thành phố. 'Rapidity' là danh từ nên không thể đứng ở vị trí cần trạng từ chỉ cách thức này."
  },
  {
    id: "adv032",
    question: "She ___ decided to move abroad.",
    options: ["eventual", "eventuality", "eventually", "eventing"],
    correctIndex: 2,
    explanation: "'Eventually' (eventual + ly) là trạng từ chỉ trình tự thời gian, nghĩa là 'cuối cùng', bổ nghĩa cho cả sự việc 'decided to move abroad' chứ không phải một từ đơn lẻ. 'Eventuality' là danh từ ('khả năng xảy ra') nên không phù hợp ở đây."
  },
  {
    id: "adv033",
    question: "He ___ agreed with everything his boss said.",
    options: ["blind", "blindness", "blindly", "blinded"],
    correctIndex: 2,
    explanation: "'Blindly' (blind + ly) mang nghĩa bóng 'một cách mù quáng', bổ nghĩa cho động từ 'agreed' để phê phán việc đồng ý mà không suy xét. Tính từ 'blind' (mù) không thể đứng sau chủ ngữ để bổ nghĩa động từ theo cách này; danh từ 'blindness' cũng sai vị trí."
  },
  {
    id: "adv034",
    question: "She handled the situation ___.",
    options: ["wise", "wisdom", "wisely", "wising"],
    correctIndex: 2,
    explanation: "'Wisely' (wise + ly) bổ nghĩa cho động từ 'handled', khen cách cô ấy xử lý tình huống một cách khôn ngoan. 'Wisdom' là danh từ ('sự khôn ngoan') nên không thể đứng ở vị trí trạng từ bổ nghĩa động từ."
  },
  {
    id: "adv035",
    question: "The stars shone ___ in the night sky.",
    options: ["bright", "brightness", "brightly", "brightest"],
    correctIndex: 2,
    explanation: "'Brightly' (bright + ly) bổ nghĩa cho động từ 'shone', miêu tả những vì sao tỏa sáng rực rỡ trên bầu trời đêm. Tính từ 'bright' không đứng được sau động từ 'shone' theo cách này; 'brightest' là dạng so sánh nhất của tính từ, cũng không phù hợp ngữ pháp ở đây."
  },
  {
    id: "adv036",
    question: "He ___ completed the task without any help.",
    options: ["independence", "independent", "independently", "independed"],
    correctIndex: 2,
    explanation: "'Independently' (independent + ly) bổ nghĩa cho động từ 'completed', nghĩa là anh ấy hoàn thành nhiệm vụ mà không cần ai giúp. 'Independence' là danh từ nên không thể đứng ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv037",
    question: "She stared ___ at the painting for several minutes.",
    options: ["intense", "intensity", "intensely", "intenser"],
    correctIndex: 2,
    explanation: "'Intensely' (intense + ly) bổ nghĩa cho động từ 'stared', diễn tả ánh nhìn chăm chú, mãnh liệt vào bức tranh. 'Intensity' (danh từ) và 'intenser' (so sánh hơn của tính từ) đều sai từ loại ở vị trí cần trạng từ này."
  },
  {
    id: "adv038",
    question: "The customer complained ___ about the poor service.",
    options: ["bitter", "bitterness", "bitterly", "bitten"],
    correctIndex: 2,
    explanation: "'Bitterly' (bitter + ly) bổ nghĩa cho động từ 'complained', nghĩa là khách hàng than phiền một cách gay gắt, cay đắng. 'Bitterness' (danh từ) và 'bitten' (quá khứ phân từ của 'bite') đều không phù hợp ở vị trí trạng từ này."
  },
  {
    id: "adv039",
    question: "He ___ expressed his opinion in the meeting.",
    options: ["open", "openness", "openly", "opens"],
    correctIndex: 2,
    explanation: "'Openly' (open + ly) bổ nghĩa cho động từ 'expressed', nghĩa là anh ấy bày tỏ ý kiến một cách công khai, thẳng thắn trong cuộc họp. Tính từ 'open' không đứng được ngay trước động từ thường theo cách này; danh từ 'openness' cũng sai vị trí ngữ pháp."
  },
  {
    id: "adv040",
    question: "The athlete trained ___ for the upcoming competition.",
    options: ["intense", "intensity", "intension", "intensely"],
    correctIndex: 3,
    explanation: "'Intensely' (intense + ly) bổ nghĩa cho động từ 'trained', diễn tả việc luyện tập một cách hết mình, dồn toàn lực. 'Intension' là một danh từ hoàn toàn khác nghĩa (thuộc logic học), còn 'intensity' (danh từ) cũng không thể đứng ở vị trí trạng từ này."
  },
  {
    id: "adv041",
    question: "She ___ mentioned that she was leaving.",
    options: ["casual", "casually", "casualness", "casing"],
    correctIndex: 1,
    explanation: "'Casually' (casual + ly) bổ nghĩa cho động từ 'mentioned', nghĩa là cô ấy nhắc đến việc sắp rời đi một cách nhẹ nhàng, tình cờ. 'Casualness' là danh từ nên không phù hợp ở vị trí trạng từ; 'casing' là một từ hoàn toàn khác nghĩa (vỏ bọc)."
  },
  {
    id: "adv042",
    question: "He responded to the criticism ___.",
    options: ["mature", "maturely", "maturity", "maturing"],
    correctIndex: 1,
    explanation: "'Maturely' (mature + ly) bổ nghĩa cho động từ 'responded', khen cách anh ấy phản hồi lời phê bình một cách chín chắn, trưởng thành. 'Maturity' (danh từ) và 'maturing' (-ing) đều sai từ loại ở vị trí cần trạng từ này."
  },
  {
    id: "adv043",
    question: "The team ___ implemented the new strategy.",
    options: ["success", "successful", "successfully", "succeeded"],
    correctIndex: 2,
    explanation: "'Successfully' (successful + ly) bổ nghĩa cho động từ 'implemented', nghĩa là đội nhóm triển khai chiến lược mới một cách thành công. 'Success' là danh từ và 'successful' là tính từ - cả hai từ loại đều không thể đứng ở vị trí bổ nghĩa cho động từ như trạng từ."
  },
  {
    id: "adv044",
    question: "She writes her diary ___ every evening.",
    options: ["faithful", "faith", "faithfully", "faithed"],
    correctIndex: 2,
    explanation: "'Faithfully' (faithful + ly) bổ nghĩa cho động từ 'writes', nghĩa là cô ấy viết nhật ký đều đặn, trung thành với thói quen mỗi tối. 'Faith' (danh từ, 'niềm tin') và 'faithed' (không phải từ thật) đều không phù hợp ở vị trí này."
  },
  {
    id: "adv045",
    question: "He ___ solved the math problem in his head.",
    options: ["mental", "mentality", "mentally", "mented"],
    correctIndex: 2,
    explanation: "'Mentally' (mental + ly) bổ nghĩa cho động từ 'solved', nghĩa là anh ấy giải bài toán trong đầu, không cần viết ra giấy. 'Mentality' (danh từ, 'não trạng') không thể đứng ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv046",
    question: "She waited ___ for the doctor.",
    options: ["patient", "patience", "patiently", "patiented"],
    correctIndex: 2,
    explanation: "'Patiently' (patient + ly) bổ nghĩa cho động từ 'waited', nghĩa là cô ấy chờ bác sĩ một cách kiên nhẫn. 'Patience' là danh từ nên không thể đứng ở vị trí cần trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv047",
    question: "He shouted ___ across the room.",
    options: ["anger", "angry", "angrily", "angered"],
    correctIndex: 2,
    explanation: "'Angrily' là trạng từ của tính từ 'angry', áp dụng quy tắc đổi y thành i trước khi thêm -ly (angry → angrily), bổ nghĩa cho động từ 'shouted'. 'Anger' là danh từ ('sự tức giận') và 'angered' là động từ ở thì quá khứ, cả hai đều sai vị trí ngữ pháp so với trạng từ cần điền."
  },
  {
    id: "adv048",
    question: "She ___ apologized for being late.",
    options: ["sincere", "sincerity", "sincerely", "sincerest"],
    correctIndex: 2,
    explanation: "'Sincerely' (sincere + ly) bổ nghĩa cho động từ 'apologized', nghĩa là cô ấy xin lỗi một cách chân thành vì đến muộn. 'Sincerity' (danh từ) và 'sincerest' (so sánh nhất của tính từ) đều không phù hợp ở vị trí trạng từ này."
  },
  {
    id: "adv049",
    question: "The elderly man walked ___ to the park.",
    options: ["slow", "slowly", "slowness", "slowed"],
    correctIndex: 1,
    explanation: "'Slowly' (slow + ly) bổ nghĩa cho động từ 'walked', miêu tả ông cụ đi bộ chậm rãi đến công viên. Tính từ 'slow' không đứng được ngay sau chủ ngữ để bổ nghĩa cho một động từ hành động như vậy."
  },
  {
    id: "adv050",
    question: "He ___ disagreed with the decision.",
    options: ["strong", "strongness", "strongly", "stronger"],
    correctIndex: 2,
    explanation: "'Strongly' (strong + ly) bổ nghĩa cho động từ 'disagreed', nghĩa là anh ấy phản đối quyết định một cách mạnh mẽ, kiên quyết. 'Strongness' không phải từ thật trong tiếng Anh chuẩn, và 'stronger' là so sánh hơn của tính từ - cả hai đều sai so với trạng từ 'strongly'."
  },
  {
    id: "adv051",
    question: "She ___ picked up the broken glass.",
    options: ["careful", "care", "carefulness", "carefully"],
    correctIndex: 3,
    explanation: "'Carefully' (careful + ly) bổ nghĩa cho cụm động từ 'picked up', nghĩa là cô ấy nhặt mảnh kính vỡ một cách thận trọng. Tính từ 'careful' không thể đứng ngay sau chủ ngữ để bổ nghĩa cho một hành động; 'carefulness' (danh từ) cũng sai vị trí ngữ pháp."
  },
  {
    id: "adv052",
    question: "The presentation was ___ organised and easy to follow.",
    options: ["logic", "logically", "logical", "logicness"],
    correctIndex: 1,
    explanation: "'Logically' (logical + ly) bổ nghĩa cho phân từ 'organised', nghĩa là bài thuyết trình được sắp xếp một cách hợp lý, dễ theo dõi. 'Logical' là tính từ và 'logic' là danh từ, cả hai không thể đứng trước 'organised' theo cách trạng từ bổ nghĩa cho phân từ này."
  },
  {
    id: "adv053",
    question: "He ___ forgot her birthday again.",
    options: ["thought", "thoughtless", "thoughtlessly", "thoughtful"],
    correctIndex: 2,
    explanation: "'Thoughtlessly' là trạng từ của tính từ 'thoughtless' (thêm -ly), nghĩa là 'một cách vô tâm, thiếu suy nghĩ', bổ nghĩa cho động từ 'forgot'. Đối lập với 'thoughtful' (chu đáo), 'thoughtless' mang nghĩa tiêu cực. 'Thoughtful' (tính từ trái nghĩa) và 'thought' (danh từ/động từ quá khứ) đều sai nghĩa và sai từ loại ở đây."
  },
  {
    id: "adv054",
    question: "The politician spoke ___ to avoid controversy.",
    options: ["diplomatic", "diplomacy", "diplomatically", "diplomated"],
    correctIndex: 2,
    explanation: "'Diplomatically' (diplomatic + ly) bổ nghĩa cho động từ 'spoke', nghĩa là chính trị gia phát biểu khéo léo để tránh tranh cãi. 'Diplomacy' (danh từ) và 'diplomated' (không phải từ thật) đều không phù hợp ở vị trí trạng từ này."
  },
  {
    id: "adv055",
    question: "She ___ followed the recipe step by step.",
    options: ["exact", "exactly", "exactness", "exacted"],
    correctIndex: 1,
    explanation: "'Exactly' (exact + ly) bổ nghĩa cho động từ 'followed', nghĩa là cô ấy làm theo công thức một cách chính xác từng bước. Tính từ 'exact' không thể đứng ngay sau chủ ngữ để bổ nghĩa cho động từ; 'exactness' (danh từ) và 'exacted' (động từ khác nghĩa, 'đòi hỏi') cũng sai."
  },
  {
    id: "adv056",
    question: "The workers completed the building ___ ahead of schedule.",
    options: ["week", "weeks", "weekly", "weekdays"],
    correctIndex: 2,
    explanation: "'Weekly' là một trạng từ đặc biệt: tính từ và trạng từ có cùng hình thức, không thêm -ly nữa, nghĩa là 'hàng tuần', bổ nghĩa cho 'completed... ahead of schedule' để nói công việc được hoàn thành đều đặn theo tuần. Danh từ số ít/số nhiều 'week/weeks' không thể tự đứng làm trạng từ; 'weekdays' chỉ những ngày trong tuần chứ không mang nghĩa tần suất."
  },
  {
    id: "adv057",
    question: "He ___ reads the news to stay updated.",
    options: ["day", "daily", "daytime", "daydream"],
    correctIndex: 1,
    explanation: "'Daily' cũng là trạng từ đặc biệt không thêm -ly (giống weekly, monthly, yearly), nghĩa là 'hàng ngày', bổ nghĩa cho động từ 'reads'. 'Day' là danh từ đơn thuần, còn 'daytime' (ban ngày) và 'daydream' (mơ mộng giữa ban ngày) đều lạc nghĩa so với ý 'mỗi ngày'."
  },
  {
    id: "adv058",
    question: "She ___ visits her grandmother on Sundays.",
    options: ["frequent", "frequency", "frequently", "frequented"],
    correctIndex: 2,
    explanation: "'Frequently' (frequent + ly) là trạng từ tần suất, bổ nghĩa cho động từ 'visits', nghĩa là cô ấy thường xuyên thăm bà vào Chủ nhật. 'Frequency' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv059",
    question: "He ___ exercises because he dislikes the gym.",
    options: ["rare", "rarely", "rareness", "rarest"],
    correctIndex: 1,
    explanation: "'Rarely' (rare + ly) là trạng từ tần suất nghĩa là 'hiếm khi', bổ nghĩa cho động từ 'exercises'. 'Rareness' (danh từ) và 'rarest' (so sánh nhất của tính từ) đều sai vị trí ngữ pháp so với trạng từ cần điền."
  },
  {
    id: "adv060",
    question: "She ___ eats fast food.",
    options: ["seldom", "seldomness", "seldomed", "seldomly"],
    correctIndex: 0,
    explanation: "'Seldom' là trạng từ tần suất tự nhiên đã hoàn chỉnh, không cần thêm -ly (mặc dù 'seldomly' có tồn tại, nó rất hiếm dùng và không tự nhiên bằng 'seldom'). Nó bổ nghĩa cho động từ 'eats', nghĩa là cô ấy hiếm khi ăn đồ ăn nhanh. Ghi nhớ nhóm trạng từ tần suất không theo quy tắc thêm -ly: often, always, seldom, never."
  },
  {
    id: "adv061",
    question: "He is ___ honest and always tells the truth.",
    options: ["absolute", "absoluteness", "absolutely", "absoluted"],
    correctIndex: 2,
    explanation: "'Absolutely' (absolute + ly) là trạng từ chỉ mức độ, đứng trước và bổ nghĩa cho tính từ 'honest' để nhấn mạnh 'hoàn toàn trung thực'. Trạng từ mức độ luôn đứng trước tính từ nó bổ nghĩa, khác với trạng từ cách thức thường đứng cạnh động từ. 'Absoluteness' (danh từ) không thể đứng ở vị trí này."
  },
  {
    id: "adv062",
    question: "The food at this restaurant is ___ delicious.",
    options: ["extreme", "extremeness", "extremity", "extremely"],
    correctIndex: 3,
    explanation: "'Extremely' (extreme + ly) là trạng từ chỉ mức độ, đứng trước tính từ 'delicious' để nhấn mạnh món ăn cực kỳ ngon. 'Extremeness' và 'extremity' đều là danh từ, không thể bổ nghĩa cho tính từ theo cách trạng từ làm được."
  },
  {
    id: "adv063",
    question: "She is ___ talented in music.",
    options: ["exception", "exceptional", "exceptionally", "excepted"],
    correctIndex: 2,
    explanation: "'Exceptionally' (exceptional + ly) là trạng từ chỉ mức độ, đứng trước tính từ/phân từ 'talented' để nhấn mạnh tài năng vượt trội. 'Exceptional' (tính từ) và 'exception' (danh từ) không thể đứng ở vị trí bổ nghĩa cho tính từ khác như vậy."
  },
  {
    id: "adv064",
    question: "The test was ___ difficult.",
    options: ["surprise", "surprising", "surprisingly", "surprised"],
    correctIndex: 2,
    explanation: "'Surprisingly' (surprising + ly) là trạng từ chỉ mức độ/thái độ, đứng trước tính từ 'difficult' để nói bài kiểm tra khó đến bất ngờ. 'Surprising' (tính từ) và 'surprised' (tính từ bị động) đều không thể đứng trước một tính từ khác để bổ nghĩa cho nó."
  },
  {
    id: "adv065",
    question: "He is ___ good at drawing.",
    options: ["remark", "remarkably", "remarkable", "remarked"],
    correctIndex: 1,
    explanation: "'Remarkably' (remarkable + ly) là trạng từ chỉ mức độ, đứng trước tính từ 'good' để nhấn mạnh anh ấy giỏi vẽ một cách đáng kể. 'Remarkable' (tính từ) không thể đứng trước một tính từ khác; 'remark' (danh từ/động từ, 'nhận xét') cũng lạc nghĩa."
  },
  {
    id: "adv066",
    question: "She is ___ skilled for her age.",
    options: ["incredible", "incredibly", "incredibility", "incredibleness"],
    correctIndex: 1,
    explanation: "'Incredibly' (incredible + ly) là trạng từ chỉ mức độ, đứng trước tính từ/phân từ 'skilled' để nhấn mạnh sự khéo léo đáng kinh ngạc so với tuổi. 'Incredibility' và 'incredibleness' đều là danh từ, không thể bổ nghĩa cho tính từ."
  },
  {
    id: "adv067",
    question: "The weather was ___ cold last winter.",
    options: ["unusual", "unusually", "unusualness", "unusualing"],
    correctIndex: 1,
    explanation: "'Unusually' (unusual + ly) là trạng từ chỉ mức độ, đứng trước tính từ 'cold' để nói thời tiết lạnh một cách khác thường. 'Unusualness' (danh từ) không thể đứng ở vị trí bổ nghĩa cho tính từ như trạng từ làm được."
  },
  {
    id: "adv068",
    question: "He is ___ taller than his brother.",
    options: ["consider", "considerable", "considerably", "considered"],
    correctIndex: 2,
    explanation: "'Considerably' (considerable + ly) là trạng từ chỉ mức độ, đứng trước tính từ so sánh 'taller' để nhấn mạnh sự chênh lệch chiều cao đáng kể. 'Considerable' (tính từ) và 'consider' (động từ) đều không thể đứng ở vị trí bổ nghĩa cho tính từ so sánh này."
  },
  {
    id: "adv069",
    question: "She became ___ famous after the book was published.",
    options: ["wide", "widely", "wideness", "widen"],
    correctIndex: 1,
    explanation: "'Widely' (wide + ly) là trạng từ chỉ mức độ/phạm vi, đứng trước tính từ 'famous' để nói cô ấy trở nên nổi tiếng rộng rãi sau khi sách xuất bản. 'Wideness' (danh từ) và 'widen' (động từ, 'mở rộng') đều sai từ loại ở vị trí này."
  },
  {
    id: "adv070",
    question: "The instructions were ___ written and easy to understand.",
    options: ["clear", "clearly", "clearness", "clearing"],
    correctIndex: 1,
    explanation: "'Clearly' (clear + ly) bổ nghĩa cho phân từ 'written' (được dùng như tính từ ở đây), nghĩa là bản hướng dẫn được viết rõ ràng, dễ hiểu. Tính từ 'clear' không thể đứng ngay trước một phân từ theo cách trạng từ làm được; 'clearness' (danh từ) cũng sai vị trí."
  },
  {
    id: "adv071",
    question: "He was ___ surprised by the announcement.",
    options: ["total", "totally", "totality", "totaled"],
    correctIndex: 1,
    explanation: "'Totally' (total + ly) là trạng từ chỉ mức độ, đứng trước tính từ/phân từ 'surprised' để nhấn mạnh sự ngạc nhiên hoàn toàn. 'Totality' (danh từ) không thể bổ nghĩa cho tính từ ở vị trí này."
  },
  {
    id: "adv072",
    question: "She is ___ committed to her studies.",
    options: ["deep", "deeply", "depth", "deepness"],
    correctIndex: 1,
    explanation: "'Deeply' (deep + ly) là trạng từ chỉ mức độ, đứng trước phân từ 'committed' để nhấn mạnh sự tận tâm sâu sắc với việc học. Lưu ý 'deep' cũng có thể làm trạng từ chỉ chiều sâu vật lý ('dig deep'), nhưng để diễn tả mức độ trừu tượng như ở đây cần dùng 'deeply'. 'Depth' (danh từ) và 'deepness' (danh từ ít dùng) đều sai vị trí."
  },
  {
    id: "adv073",
    question: "The building was ___ damaged in the fire.",
    options: ["severe", "severity", "severely", "severed"],
    correctIndex: 2,
    explanation: "'Severely' (severe + ly) là trạng từ chỉ mức độ, đứng trước phân từ 'damaged' để nói tòa nhà bị hư hại nghiêm trọng trong vụ cháy. 'Severity' (danh từ) và 'severed' (động từ khác nghĩa, 'cắt đứt') đều không phù hợp ở vị trí này."
  },
  {
    id: "adv074",
    question: "He ___ agreed to help without any conditions.",
    options: ["willing", "willingness", "willingly", "willed"],
    correctIndex: 2,
    explanation: "'Willingly' (willing + ly) bổ nghĩa cho động từ 'agreed', nghĩa là anh ấy đồng ý giúp đỡ một cách sẵn lòng, không điều kiện. 'Willingness' (danh từ) và 'willed' (quá khứ của 'will' với nghĩa khác) đều sai vị trí ngữ pháp."
  },
  {
    id: "adv075",
    question: "The plan was ___ carried out by the team.",
    options: ["effect", "effective", "effectively", "effected"],
    correctIndex: 2,
    explanation: "'Effectively' (effective + ly) bổ nghĩa cho cụm động từ 'carried out', nghĩa là kế hoạch được thực hiện một cách hiệu quả. 'Effective' (tính từ) và 'effect' (danh từ, 'tác động') đều không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv076",
    question: "She ___ sat down without saying a word.",
    options: ["quiet", "quite", "quietly", "quietness"],
    correctIndex: 2,
    explanation: "'Quietly' (quiet + ly) bổ nghĩa cho cụm động từ 'sat down', nghĩa là cô ấy ngồi xuống một cách im lặng, không nói gì. Chú ý phân biệt 'quiet' (tính từ, 'yên tĩnh') với 'quite' (trạng từ mức độ, 'khá là') - hai từ dễ viết nhầm vì chỉ khác vị trí chữ i/t. 'Quietness' (danh từ) cũng không phù hợp ở vị trí này."
  },
  {
    id: "adv077",
    question: "He ___ turned down the job offer.",
    options: ["polite", "politeness", "politely", "polited"],
    correctIndex: 2,
    explanation: "'Politely' (polite + ly) bổ nghĩa cho cụm động từ 'turned down', nghĩa là anh ấy từ chối lời mời làm việc một cách lịch sự. 'Politeness' (danh từ) và 'polited' (không phải từ thật) đều sai vị trí so với trạng từ cần điền."
  },
  {
    id: "adv078",
    question: "The surgery was ___ performed by the specialist.",
    options: ["skill", "skillful", "skillfully", "skilled"],
    correctIndex: 2,
    explanation: "'Skillfully' (skillful + ly) bổ nghĩa cho động từ 'performed', nghĩa là ca phẫu thuật được bác sĩ chuyên khoa thực hiện một cách thành thạo, khéo léo. 'Skillful' (tính từ) và 'skill' (danh từ) đều không thể đứng ở vị trí bổ nghĩa cho động từ như trạng từ."
  },
  {
    id: "adv079",
    question: "She ___ hid her disappointment.",
    options: ["brave", "bravely", "braveness", "braved"],
    correctIndex: 1,
    explanation: "'Bravely' (brave + ly) bổ nghĩa cho động từ 'hid', nghĩa là cô ấy giấu đi sự thất vọng một cách dũng cảm. 'Braveness' (danh từ ít dùng, thường dùng 'bravery' hơn) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ."
  },
  {
    id: "adv080",
    question: "He ___ saved enough money to buy a car.",
    options: ["final", "finality", "finally", "finaled"],
    correctIndex: 2,
    explanation: "'Finally' (final + ly) là trạng từ chỉ trình tự, nghĩa là 'cuối cùng', bổ nghĩa cho cả sự việc 'saved enough money to buy a car'. 'Finality' (danh từ) không thể đứng ở vị trí này, và 'finaled' không phải là một từ thật trong tiếng Anh."
  },
  {
    id: "adv081",
    question: "She looked ___ beautiful in her wedding dress.",
    options: ["absolute", "absolutely", "absoluteness", "absoluter"],
    correctIndex: 1,
    explanation: "'Absolutely' (absolute + ly) là trạng từ chỉ mức độ, đứng trước tính từ 'beautiful' để nhấn mạnh cô dâu đẹp một cách tuyệt đối trong váy cưới. 'Absoluteness' (danh từ) và 'absoluter' (không phải dạng so sánh chuẩn) đều không phù hợp ở vị trí này."
  },
  {
    id: "adv082",
    question: "He spoke ___ about the benefits of exercise.",
    options: ["passion", "passionate", "passionately", "passioned"],
    correctIndex: 2,
    explanation: "'Passionately' (passionate + ly) bổ nghĩa cho động từ 'spoke', nghĩa là anh ấy nói về lợi ích của việc tập thể dục một cách say mê, nhiệt huyết. 'Passionate' (tính từ) và 'passion' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv083",
    question: "The children ___ ran to greet their mother.",
    options: ["eager", "eagerness", "eagerly", "eagered"],
    correctIndex: 2,
    explanation: "'Eagerly' (eager + ly) bổ nghĩa cho động từ 'ran', nghĩa là bọn trẻ chạy đến chào mẹ một cách háo hức, hăng hái. 'Eagerness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ."
  },
  {
    id: "adv084",
    question: "She ___ admitted she was wrong.",
    options: ["humble", "humbleness", "humbly", "humbled"],
    correctIndex: 2,
    explanation: "'Humbly' (humble + ly, bỏ chữ e câm trước khi thêm -ly) bổ nghĩa cho động từ 'admitted', nghĩa là cô ấy thừa nhận sai lầm một cách khiêm tốn. 'Humbleness' (danh từ) không thể đứng ở vị trí trạng từ này."
  },
  {
    id: "adv085",
    question: "The bomb was ___ defused by the expert.",
    options: ["careful", "care", "carefulness", "carefully"],
    correctIndex: 3,
    explanation: "'Carefully' (careful + ly) bổ nghĩa cho động từ 'defused', nghĩa là quả bom được chuyên gia tháo gỡ một cách thận trọng, tỉ mỉ. Tính từ 'careful' không thể đứng ở vị trí bổ nghĩa cho động từ bị động này; 'carefulness' (danh từ) cũng sai."
  },
  {
    id: "adv086",
    question: "He ___ listened to what she had to say.",
    options: ["attention", "attentive", "attentively", "attended"],
    correctIndex: 2,
    explanation: "'Attentively' (attentive + ly) bổ nghĩa cho động từ 'listened', nghĩa là anh ấy lắng nghe một cách chăm chú những gì cô ấy nói. 'Attentive' (tính từ) và 'attention' (danh từ) đều không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ."
  },
  {
    id: "adv087",
    question: "She prepared for the interview ___.",
    options: ["thorough", "thoroughly", "thoroughness", "thoroughed"],
    correctIndex: 1,
    explanation: "'Thoroughly' (thorough + ly) bổ nghĩa cho động từ 'prepared', nghĩa là cô ấy chuẩn bị cho buổi phỏng vấn một cách kỹ lưỡng, toàn diện. 'Thoroughness' (danh từ) không thể đứng ở vị trí trạng từ này."
  },
  {
    id: "adv088",
    question: "He ___ questioned the motives of his colleagues.",
    options: ["open", "openly", "openness", "opener"],
    correctIndex: 1,
    explanation: "'Openly' (open + ly) bổ nghĩa cho động từ 'questioned', nghĩa là anh ấy công khai đặt nghi vấn về động cơ của đồng nghiệp. 'Openness' (danh từ) và 'opener' (danh từ, 'vật/người mở') đều sai vị trí ngữ pháp so với trạng từ."
  },
  {
    id: "adv089",
    question: "The teacher explained the concept ___.",
    options: ["patient", "patience", "patiently", "patienced"],
    correctIndex: 2,
    explanation: "'Patiently' (patient + ly) bổ nghĩa cho động từ 'explained', nghĩa là giáo viên giải thích khái niệm một cách kiên nhẫn. 'Patience' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv090",
    question: "She ___ completed the assignment without any guidance.",
    options: ["independent", "independence", "independently", "independed"],
    correctIndex: 2,
    explanation: "'Independently' (independent + ly) bổ nghĩa cho động từ 'completed', nghĩa là cô ấy hoàn thành bài tập mà không cần hướng dẫn. 'Independence' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv091",
    question: "He ___ realised that he had made a mistake.",
    options: ["sudden", "suddenly", "suddenness", "suddened"],
    correctIndex: 1,
    explanation: "'Suddenly' (sudden + ly) bổ nghĩa cho động từ 'realised', nghĩa là anh ấy đột nhiên nhận ra mình đã mắc lỗi. 'Suddenness' (danh từ) không thể đứng ở vị trí trạng từ này."
  },
  {
    id: "adv092",
    question: "She ___ refuses to eat vegetables.",
    options: ["persistent", "persistence", "persistently", "persisted"],
    correctIndex: 2,
    explanation: "'Persistently' (persistent + ly) bổ nghĩa cho động từ 'refuses', nghĩa là cô bé cứ khăng khăng từ chối ăn rau một cách dai dẳng. 'Persistence' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv093",
    question: "The data was ___ recorded in the lab.",
    options: ["accurate", "accuracy", "accurately", "accurated"],
    correctIndex: 2,
    explanation: "'Accurately' (accurate + ly) bổ nghĩa cho động từ 'recorded', nghĩa là dữ liệu được ghi lại một cách chính xác trong phòng thí nghiệm. 'Accuracy' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ bị động này."
  },
  {
    id: "adv094",
    question: "He arrived ___ at the meeting.",
    options: ["late", "lately", "lateness", "latest"],
    correctIndex: 0,
    explanation: "'Late' vừa là tính từ ('a late train') vừa là trạng từ chỉ thời gian ('arrive late' = đến muộn), không thêm -ly khi dùng theo nghĩa này. 'Lately' trông giống nhưng lại mang nghĩa hoàn toàn khác: 'gần đây' (recently), không phải 'muộn' - nếu chọn 'lately' câu sẽ sai nghĩa hoàn toàn. Đây là một trong những cặp từ dễ gây nhầm lẫn nhất khi học trạng từ."
  },
  {
    id: "adv095",
    question: "She has been working very ___ these days.",
    options: ["hard", "hardly", "hardness", "harder"],
    correctIndex: 0,
    explanation: "'Hard' là trạng từ chỉ cường độ/sự cố gắng ('work hard' = làm việc chăm chỉ), không phải là dạng rút gọn mà là một từ hoàn chỉnh, không thêm -ly. Nó bổ nghĩa cho cụm động từ 'has been working' cùng với 'very'. Đừng nhầm với 'hardly' (hầu như không) - nếu chọn nhầm, câu sẽ mang nghĩa ngược lại hoàn toàn."
  },
  {
    id: "adv096",
    question: "Have you seen him ___?",
    options: ["late", "lately", "lateness", "latest"],
    correctIndex: 1,
    explanation: "'Lately' (nghĩa là 'gần đây', tương đương 'recently') bổ nghĩa cho cả câu hỏi 'have you seen him...?', thường dùng với thì hiện tại hoàn thành. Đừng nhầm với 'late' - tuy cùng gốc nhưng 'late' nghĩa là 'muộn', hoàn toàn khác nghĩa với 'lately'. Đây là cặp từ cần ghi nhớ kỹ vì rất dễ nhầm lẫn khi làm bài."
  },
  {
    id: "adv097",
    question: "He plays guitar ___.",
    options: ["good", "well", "goodness", "goody"],
    correctIndex: 1,
    explanation: "'Well' là trạng từ bất quy tắc của tính từ 'good' - không phải 'goodly' - dùng để bổ nghĩa cho động từ 'plays', nói anh ấy chơi guitar giỏi. Đây là một trong những cặp tính từ - trạng từ bất quy tắc quan trọng nhất cần nhớ: good (tính từ) → well (trạng từ). 'Goodness' (danh từ) và 'goody' (thán từ) đều không phù hợp ở vị trí này."
  },
  {
    id: "adv098",
    question: "She arrived ___ after everyone else had left.",
    options: ["long", "long after", "at long last", "shortly"],
    correctIndex: 3,
    explanation: "'Shortly' (short + ly) bổ nghĩa cho cụm 'after everyone else had left', tạo thành cụm cố định 'shortly after' nghĩa là 'ngay sau đó, không lâu sau'. Lựa chọn 'long after' mang nghĩa ngược lại (rất lâu sau) nên không phù hợp ngữ cảnh câu vốn ngụ ý cô đến gần thời điểm mọi người rời đi. Ghi nhớ cụm 'shortly after/before' như một cách diễn đạt hai mốc thời gian sát nhau."
  },
  {
    id: "adv099",
    question: "He works ___ than I do.",
    options: ["hard", "harder", "hardly", "hardness"],
    correctIndex: 1,
    explanation: "'Harder' là dạng so sánh hơn của trạng từ 'hard' (không dùng 'more hard'), bổ nghĩa cho động từ 'works' trong phép so sánh 'than I do'. Vì 'hard' là trạng từ một âm tiết nên chỉ cần thêm -er, không cần 'more'. 'Hardly' (hầu như không) là từ khác nghĩa hoàn toàn, không phải dạng so sánh của 'hard'."
  },
  {
    id: "adv100",
    question: "She dances ___ than anyone in the class.",
    options: ["beautiful", "more beautiful", "beautifully", "more beautifully"],
    correctIndex: 3,
    explanation: "'More beautifully' là dạng so sánh hơn của trạng từ 'beautifully' (trạng từ nhiều âm tiết dùng 'more' thay vì thêm -er), bổ nghĩa cho động từ 'dances' trong phép so sánh. Tính từ 'beautiful' hay 'more beautiful' đều sai vì cần trạng từ để bổ nghĩa cho động từ 'dances' chứ không phải danh từ."
  },
  {
    id: "adv101",
    question: "He finished the test ___ in the class.",
    options: ["fast", "faster", "fastest", "more fast"],
    correctIndex: 2,
    explanation: "'Fast' là trạng từ bất quy tắc, không thêm -ly, và dạng so sánh nhất của nó là 'fastest' (thêm -est trực tiếp vì là từ một âm tiết). Nó bổ nghĩa cho động từ 'finished', so sánh trong phạm vi 'in the class'. 'More fast' sai vì trạng từ một âm tiết không dùng 'more' để so sánh nhất."
  },
  {
    id: "adv102",
    question: "She runs ___ of all the athletes on the team.",
    options: ["quick", "quickly", "quickest", "most quickly"],
    correctIndex: 3,
    explanation: "'Most quickly' là so sánh nhất của trạng từ 'quickly' (trạng từ có đuôi -ly dùng 'most' thay vì thêm -est), bổ nghĩa cho động từ 'runs' trong so sánh với tất cả vận động viên. 'Quickest' sai vì không thể vừa giữ đuôi -ly vừa thêm -est cùng lúc kiểu 'quicklyest'."
  },
  {
    id: "adv103",
    question: "He speaks English ___ than he did last year.",
    options: ["fluent", "fluently", "more fluently", "most fluently"],
    correctIndex: 2,
    explanation: "'More fluently' là so sánh hơn của trạng từ 'fluently', bổ nghĩa cho động từ 'speaks' trong phép so sánh với 'last year'. Vì đây là so sánh giữa hai thời điểm (chỉ 2 đối tượng so sánh) nên dùng 'more', không dùng 'most' (dành cho so sánh nhất từ 3 trở lên)."
  },
  {
    id: "adv104",
    question: "The team performed ___ than in the previous match.",
    options: ["bad", "badly", "worse", "worst"],
    correctIndex: 2,
    explanation: "'Worse' là dạng so sánh hơn bất quy tắc của trạng từ 'badly' (badly → worse → worst, giống tính từ bad → worse → worst), bổ nghĩa cho động từ 'performed' trong so sánh với trận đấu trước. Đây không theo quy tắc thêm -er hay 'more' thông thường nên cần ghi nhớ như một ngoại lệ riêng."
  },
  {
    id: "adv105",
    question: "She studied ___ for the exam and passed it easily.",
    options: ["thorough", "thoroughly", "more thoroughly", "most thoroughly"],
    correctIndex: 1,
    explanation: "Câu này không có cấu trúc so sánh (không có 'than'), nên chỉ cần trạng từ gốc 'thoroughly' (thorough + ly) bổ nghĩa cho động từ 'studied'. Thêm 'more' hay 'most' vào đây là thừa và sai ngữ pháp vì không có đối tượng nào được đem ra so sánh. Đây là điểm cần chú ý: không phải cứ thấy trạng từ dài là mặc định phải so sánh."
  },
  {
    id: "adv106",
    question: "___ I take the bus, but today I walked.",
    options: ["Sometimes", "Sometime", "Some time", "Someday"],
    correctIndex: 0,
    explanation: "'Sometimes' (có 's' ở cuối) là trạng từ tần suất nghĩa là 'đôi khi', bổ nghĩa cho cả câu, tương phản với 'today I walked'. Cần phân biệt với 'sometime' (một lúc nào đó, không rõ khi nào), 'some time' (một khoảng thời gian) và 'someday' (một ngày nào đó) - các từ/cụm từ này trông giống nhau nhưng nghĩa khác hẳn nhau. Ở đây ngữ cảnh nói về thói quen lặp lại nên chỉ 'sometimes' là phù hợp."
  },
  {
    id: "adv107",
    question: "She ___ goes to bed before midnight.",
    options: ["ever", "never", "always", "ever never"],
    correctIndex: 1,
    explanation: "'Never' (không bao giờ) là trạng từ tần suất phù hợp nhất vì câu diễn tả việc hoàn toàn không xảy ra: cô ấy không bao giờ đi ngủ trước nửa đêm. 'Ever' thường chỉ dùng tự nhiên trong câu hỏi/phủ định/so sánh chứ không đứng một mình trong câu khẳng định như thế này, còn 'always' lại mang nghĩa ngược lại (luôn luôn)."
  },
  {
    id: "adv108",
    question: "He is ___ busy when I call him.",
    options: ["always", "ever", "just", "still"],
    correctIndex: 0,
    explanation: "'Always' (luôn luôn) là trạng từ tần suất diễn đạt tính liên tục, lặp lại mỗi khi gọi điện cho anh ấy. 'Ever' cần ngữ cảnh nghi vấn/phủ định để dùng tự nhiên, còn 'just' (vừa mới) và 'still' (vẫn còn) đều không khớp với ý 'lúc nào cũng bận' trong câu này."
  },
  {
    id: "adv109",
    question: "I have ___ seen such a beautiful sunset.",
    options: ["ever", "never", "already", "yet"],
    correctIndex: 0,
    explanation: "'Ever' (đã từng, bao giờ) thường xuất hiện trong câu nghi vấn, phủ định hoặc câu mang sắc thái cảm thán để nhấn mạnh trải nghiệm, như ở đây diễn tả sự ngạc nhiên trước cảnh hoàng hôn đẹp hiếm có. Phân biệt với 'never' (không bao giờ) vốn dùng để phủ định một hành động chưa từng xảy ra, còn 'already' và 'yet' chỉ dùng khi nói về việc đã/chưa hoàn thành một hành động cụ thể, không phù hợp với sắc thái nhấn mạnh trải nghiệm ở đây."
  },
  {
    id: "adv110",
    question: "She has ___ finished her homework.",
    options: ["yet", "still", "already", "just"],
    correctIndex: 2,
    explanation: "'Already' (đã ... rồi) dùng trong câu khẳng định ở thì hiện tại hoàn thành để nói một việc đã hoàn thành, ở đây là 'has already finished her homework'. Nó thường đứng giữa trợ động từ 'has' và động từ chính. Phân biệt với 'yet' (dùng trong câu hỏi/phủ định) và 'still' (diễn tả việc đang tiếp diễn, chưa kết thúc) - cả hai đều không hợp với câu khẳng định này."
  },
  {
    id: "adv111",
    question: "Have you read the book ___?",
    options: ["already", "just", "yet", "ever"],
    correctIndex: 2,
    explanation: "'Yet' (chưa, đã... chưa) dùng trong câu hỏi và câu phủ định ở thì hiện tại hoàn thành, thường đứng cuối câu như trong 'Have you read the book yet?'. Phân biệt với 'already' (dùng trong câu khẳng định) và 'just' (vừa mới, chỉ hành động vừa xảy ra) - cả hai không phù hợp với câu hỏi này."
  },
  {
    id: "adv112",
    question: "He has ___ arrived; he is parking the car.",
    options: ["yet", "already", "still", "just"],
    correctIndex: 3,
    explanation: "'Just' (vừa mới) diễn tả một hành động vừa mới xảy ra ngay trước thời điểm nói, đứng giữa trợ động từ 'has' và động từ chính 'arrived'. Ngữ cảnh 'he is parking the car' xác nhận anh ấy vừa mới đến. 'Yet' và 'already' đều mang nghĩa về việc đã/chưa hoàn thành lâu hơn, không khớp với ý 'vừa mới' ở đây."
  },
  {
    id: "adv113",
    question: "I haven't finished the report ___.",
    options: ["already", "just", "still", "yet"],
    correctIndex: 3,
    explanation: "'Yet' dùng trong câu phủ định của thì hiện tại hoàn thành, thường đứng cuối câu như 'haven't finished... yet' (chưa hoàn thành). 'Already' chỉ dùng trong câu khẳng định, còn 'still' dù cũng gợi ý một việc chưa hoàn thành nhưng thường đứng giữa câu trước động từ chứ không đứng cuối theo cách này."
  },
  {
    id: "adv114",
    question: "She is ___ waiting for the bus.",
    options: ["already", "yet", "still", "just"],
    correctIndex: 2,
    explanation: "'Still' (vẫn còn) diễn tả một hành động đang tiếp diễn, kéo dài đến hiện tại, đứng trước động từ chính 'waiting'. Phân biệt với 'already' (đã hoàn thành) và 'yet' (dùng ở câu hỏi/phủ định) - cả hai không hợp với ý 'vẫn đang chờ' ở đây."
  },
  {
    id: "adv115",
    question: "He ___ works at the company despite his health issues.",
    options: ["yet", "still", "already", "just"],
    correctIndex: 1,
    explanation: "'Still' (vẫn) diễn tả một hành động tiếp tục diễn ra bất chấp trở ngại, ở đây là vấn đề sức khỏe, đứng trước động từ 'works'. 'Yet' và 'already' không phù hợp ngữ nghĩa khi diễn tả sự tiếp diễn liên tục như thế này."
  },
  {
    id: "adv116",
    question: "Put the dishes ___.",
    options: ["there", "their", "they're", "therein"],
    correctIndex: 0,
    explanation: "'There' (ở đó, chỗ đó) là trạng từ chỉ nơi chốn, bổ nghĩa cho động từ 'put' để chỉ vị trí đặt đĩa. Cần phân biệt về chính tả và nghĩa với 'their' (sở hữu, 'của họ') và 'they're' (rút gọn của 'they are') - ba từ đồng âm này rất dễ viết nhầm dù phát âm giống nhau."
  },
  {
    id: "adv117",
    question: "Come ___! The food is ready.",
    options: ["hear", "here", "hare", "heer"],
    correctIndex: 1,
    explanation: "'Here' (ở đây) là trạng từ chỉ nơi chốn, bổ nghĩa cho động từ 'come' để gọi ai đó đến chỗ người nói. Các lựa chọn khác như 'hear' (nghe, đồng âm với 'here') hay 'hare' (con thỏ rừng) đều là từ đồng âm/gần âm gây nhiễu, không liên quan đến nghĩa chỉ nơi chốn."
  },
  {
    id: "adv118",
    question: "She looked ___ and saw the birds flying overhead.",
    options: ["up", "upon", "upper", "upward"],
    correctIndex: 0,
    explanation: "'Up' (lên trên) là trạng từ chỉ hướng, bổ nghĩa cho động từ 'looked' để chỉ hành động ngước nhìn lên trời. 'Upward' cũng chỉ hướng lên nhưng thường trang trọng hơn và ít tự nhiên với 'look' bằng 'up'; 'upon' là giới từ, không phải trạng từ chỉ hướng đơn thuần."
  },
  {
    id: "adv119",
    question: "The cat jumped ___ from the shelf.",
    options: ["down", "downward", "below", "under"],
    correctIndex: 0,
    explanation: "'Down' (xuống) là trạng từ chỉ hướng, bổ nghĩa cho động từ 'jumped' để nói con mèo nhảy xuống từ giá sách. 'Below' và 'under' đều là giới từ cần có tân ngữ đi kèm, không thể đứng một mình sau 'jumped' như trạng từ 'down'."
  },
  {
    id: "adv120",
    question: "Turn ___ at the traffic light.",
    options: ["left", "leftward", "leftside", "to the left side"],
    correctIndex: 0,
    explanation: "'Left' (sang trái) là trạng từ chỉ hướng, dùng trực tiếp sau động từ chỉ chuyển động như 'turn' mà không cần giới từ. Cụm dài hơn 'to the left side' tuy đúng nghĩa nhưng không tự nhiên bằng cách dùng trạng từ đơn 'left' trong khẩu lệnh ngắn gọn này; 'leftward' ít dùng trong văn nói thông thường."
  },
  {
    id: "adv121",
    question: "He will be back ___.",
    options: ["soon", "sooner", "soonest", "soonness"],
    correctIndex: 0,
    explanation: "'Soon' (sớm thôi, chẳng bao lâu nữa) là trạng từ chỉ thời gian, bổ nghĩa cho cụm động từ 'will be back' để nói về tương lai gần. 'Sooner' là dạng so sánh hơn (cần có đối tượng so sánh) và 'soonest' là so sánh nhất, cả hai không phù hợp khi câu không có sự so sánh nào."
  },
  {
    id: "adv122",
    question: "___, she was a famous actress.",
    options: ["Former", "Formerly", "Before", "Formerness"],
    correctIndex: 1,
    explanation: "'Formerly' (trước đây, ngày xưa) là trạng từ chỉ thời gian, đứng đầu câu để giới thiệu một sự thật đã không còn đúng ở hiện tại - cô ấy từng là diễn viên nổi tiếng. Đừng nhầm với tính từ 'former' (trước đây, cựu) vốn phải đứng trước danh từ như 'the former actress' chứ không thể đứng đầu câu độc lập như vậy."
  },
  {
    id: "adv123",
    question: "He will ___ leave for Paris.",
    options: ["soon", "shortly", "immediately", "presently"],
    correctIndex: 2,
    explanation: "'Immediately' (ngay lập tức) bổ nghĩa cho động từ 'leave', diễn tả hành động xảy ra tức thì, không trì hoãn. So với 'soon' và 'shortly' (chỉ thời gian gần nhưng ít khẩn cấp hơn) hay 'presently' (thường mang nghĩa khác), 'immediately' là từ nhấn mạnh tính tức khắc phù hợp nhất với trợ động từ 'will'."
  },
  {
    id: "adv124",
    question: "She will call you ___.",
    options: ["lately", "lately on", "later", "latest"],
    correctIndex: 2,
    explanation: "'Later' (sau này, lát nữa) là trạng từ chỉ thời gian trong tương lai, bổ nghĩa cho động từ 'call'. Phân biệt với 'lately' (gần đây, dùng cho quá khứ/hiện tại hoàn thành) - hai từ dễ nhầm vì gần giống nhau về hình thức nhưng chỉ thời điểm hoàn toàn khác nhau."
  },
  {
    id: "adv125",
    question: "He was ___ a soldier before becoming a teacher.",
    options: ["prior", "previously", "priory", "priored"],
    correctIndex: 1,
    explanation: "'Previously' (trước đây, trước kia) là trạng từ chỉ thời gian, bổ nghĩa cho cả mệnh đề 'was a soldier before becoming a teacher'. 'Prior' là tính từ, thường đi với giới từ 'to' ('prior to'), không thể đứng một mình bổ nghĩa cho động từ theo cách trạng từ làm được ở đây."
  },
  {
    id: "adv126",
    question: "She ___ forgets where she puts her keys.",
    options: ["constant", "constantly", "constancy", "constanted"],
    correctIndex: 1,
    explanation: "'Constantly' (constant + ly) là trạng từ tần suất nghĩa 'liên tục, suốt', bổ nghĩa cho động từ 'forgets'. 'Constancy' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv127",
    question: "He ___ checks the weather before going out.",
    options: ["occasion", "occasional", "occasionally", "occasioned"],
    correctIndex: 2,
    explanation: "'Occasionally' (occasional + ly) là trạng từ tần suất nghĩa 'thỉnh thoảng', bổ nghĩa cho động từ 'checks'. 'Occasional' (tính từ) và 'occasion' (danh từ, 'dịp') đều không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ."
  },
  {
    id: "adv128",
    question: "She ___ goes hiking on weekends.",
    options: ["frequent", "frequently", "frequency", "frequented"],
    correctIndex: 1,
    explanation: "'Frequently' (frequent + ly) là trạng từ tần suất nghĩa 'thường xuyên', bổ nghĩa cho động từ 'goes'. 'Frequency' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv129",
    question: "He ___ loses his temper, but today was an exception.",
    options: ["rare", "rarer", "rarely", "rarest"],
    correctIndex: 2,
    explanation: "'Rarely' (rare + ly) là trạng từ tần suất nghĩa 'hiếm khi', bổ nghĩa cho động từ 'loses'. 'Rarer' và 'rarest' là các dạng so sánh của tính từ 'rare', không phù hợp khi câu không mang cấu trúc so sánh."
  },
  {
    id: "adv130",
    question: "She ___ stays up late watching movies.",
    options: ["general", "generally", "generality", "generaled"],
    correctIndex: 1,
    explanation: "'Generally' (general + ly) là trạng từ tần suất nghĩa 'thường thì, nhìn chung', bổ nghĩa cho cụm động từ 'stays up late'. 'Generality' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ."
  },
  {
    id: "adv131",
    question: "She writes ___ than her classmates.",
    options: ["more creative", "more creatively", "most creative", "most creatively"],
    correctIndex: 1,
    explanation: "'More creatively' là so sánh hơn của trạng từ 'creatively' (trạng từ đa âm tiết dùng 'more', không thêm -er), bổ nghĩa cho động từ 'writes' trong phép so sánh với bạn cùng lớp. 'More creative' sai vì đó là so sánh hơn của tính từ, trong khi từ cần điền phải bổ nghĩa cho động từ 'writes' nên cần trạng từ."
  },
  {
    id: "adv132",
    question: "He explained things ___ of all the tutors.",
    options: ["more clear", "clearer", "most clearly", "more clearly"],
    correctIndex: 2,
    explanation: "'Most clearly' là so sánh nhất của trạng từ 'clearly' (trạng từ có đuôi -ly dùng 'most'), bổ nghĩa cho động từ 'explained things' trong so sánh với 'all of the tutors' (từ ba đối tượng trở lên nên dùng so sánh nhất). 'Clearer' là so sánh hơn của tính từ 'clear', sai cả về từ loại lẫn mức so sánh."
  },
  {
    id: "adv133",
    question: "The new machine works ___ than the old one.",
    options: ["efficient", "more efficient", "efficiently", "more efficiently"],
    correctIndex: 3,
    explanation: "'More efficiently' là so sánh hơn của trạng từ 'efficiently', bổ nghĩa cho động từ 'works' trong phép so sánh với máy cũ. 'Efficient' và 'more efficient' đều là tính từ/so sánh của tính từ, không thể bổ nghĩa cho động từ như trạng từ."
  },
  {
    id: "adv134",
    question: "She drives ___ of all the members in the family.",
    options: ["careful", "most careful", "carefully", "most carefully"],
    correctIndex: 3,
    explanation: "'Most carefully' là so sánh nhất của trạng từ 'carefully', bổ nghĩa cho động từ 'drives' khi so sánh với tất cả thành viên trong gia đình. 'Most careful' là so sánh nhất của tính từ 'careful', sai từ loại vì cần bổ nghĩa cho động từ 'drives'."
  },
  {
    id: "adv135",
    question: "He performed ___ in the group project.",
    options: ["good", "well", "better", "best"],
    correctIndex: 3,
    explanation: "'Best' là dạng so sánh nhất bất quy tắc của trạng từ 'well' (well → better → best), bổ nghĩa cho động từ 'performed' trong dự án nhóm. Đây là chuỗi bất quy tắc quan trọng cần nhớ, không theo quy tắc thêm -est hay 'most' thông thường; 'good' là tính từ gốc tương ứng, không dùng được ở vị trí trạng từ này."
  },
  {
    id: "adv136",
    question: "She can type ___ than most people in the office.",
    options: ["fast", "faster", "fastest", "more fast"],
    correctIndex: 1,
    explanation: "'Faster' là so sánh hơn của trạng từ 'fast' (từ một âm tiết, chỉ cần thêm -er, không thêm -ly và không dùng 'more'), bổ nghĩa cho động từ 'type' trong phép so sánh với đồng nghiệp. 'More fast' sai vì trạng từ một âm tiết không kết hợp với 'more'."
  },
  {
    id: "adv137",
    question: "He argued ___ than his opponent in the debate.",
    options: ["persuasive", "persuasively", "more persuasive", "more persuasively"],
    correctIndex: 3,
    explanation: "'More persuasively' là so sánh hơn của trạng từ 'persuasively' (persuasive + ly), bổ nghĩa cho động từ 'argued' trong phần tranh luận so với đối thủ. 'More persuasive' là so sánh hơn của tính từ, không thể đứng ở vị trí bổ nghĩa cho động từ như trạng từ cần có ở đây."
  },
  {
    id: "adv138",
    question: "She sings ___ of all the contestants.",
    options: ["beautiful", "most beautiful", "beautifully", "most beautifully"],
    correctIndex: 3,
    explanation: "'Most beautifully' là so sánh nhất của trạng từ 'beautifully', bổ nghĩa cho động từ 'sings' khi so sánh với tất cả thí sinh. 'Most beautiful' là so sánh nhất của tính từ, sai từ loại so với vị trí cần trạng từ bổ nghĩa cho động từ 'sings'."
  },
  {
    id: "adv139",
    question: "He acted ___ in the crisis than expected.",
    options: ["calm", "calmer", "calmly", "more calmly"],
    correctIndex: 3,
    explanation: "'More calmly' là so sánh hơn của trạng từ 'calmly' (calm + ly), bổ nghĩa cho động từ 'acted' khi so với những gì được kỳ vọng. 'Calmer' là so sánh hơn của tính từ 'calm', không thể bổ nghĩa cho động từ 'acted' theo cách trạng từ làm được."
  },
  {
    id: "adv140",
    question: "The patient recovered ___ than the doctors predicted.",
    options: ["quick", "quickly", "more quick", "more quickly"],
    correctIndex: 3,
    explanation: "'More quickly' là so sánh hơn của trạng từ 'quickly' (trạng từ đa âm tiết dùng 'more'), bổ nghĩa cho động từ 'recovered' khi so với dự đoán của bác sĩ. 'More quick' sai vì 'more' phải đi với trạng từ có đuôi -ly ('quickly'), không đi trực tiếp với tính từ gốc 'quick' trong trường hợp này."
  },
  {
    id: "adv141",
    question: "He spoke ___ that no one could hear him.",
    options: ["so quiet", "so quietly", "such quietly", "such quiet"],
    correctIndex: 1,
    explanation: "Cấu trúc 'so + trạng từ + that + mệnh đề' diễn đạt kết quả, nên cần trạng từ 'quietly' (quiet + ly) chứ không phải tính từ 'quiet', vì từ cần điền bổ nghĩa cho động từ 'spoke'. 'Such' chỉ kết hợp với danh từ ('such a quiet voice'), không đi thẳng với trạng từ như 'such quietly' - đây là lỗi ngữ pháp phổ biến cần tránh."
  },
  {
    id: "adv142",
    question: "She ran ___ that she finished first.",
    options: ["so fast", "such fast", "so fastly", "such fastly"],
    correctIndex: 0,
    explanation: "Cấu trúc 'so + trạng từ + that' cần một trạng từ, và ở đây là 'fast' - từ đặc biệt vừa là tính từ vừa là trạng từ, không có dạng 'fastly'. 'Such' không đi trực tiếp với trạng từ/tính từ mà phải đi với danh từ, nên 'such fast' và 'such fastly' đều sai cấu trúc lẫn từ vựng."
  },
  {
    id: "adv143",
    question: "He drives ___ carefully ___ to avoid accidents.",
    options: ["so / that", "such / that", "too / to", "enough / to"],
    correctIndex: 0,
    explanation: "Cấu trúc đúng ở đây là 'so + trạng từ (carefully) + that + mệnh đề kết quả': 'He drives so carefully that...' diễn đạt mức độ dẫn đến kết quả. 'Such... that' chỉ dùng với danh từ, còn 'too... to' và 'enough... to' đi với động từ nguyên mẫu chứ không phải mệnh đề 'that', nên không khớp cấu trúc của câu này."
  },
  {
    id: "adv144",
    question: "She studied ___ to pass the exam.",
    options: ["hard enough", "enough hard", "hardly enough", "enough hardly"],
    correctIndex: 0,
    explanation: "Cấu trúc 'trạng từ + enough + to V' luôn đặt trạng từ trước 'enough', nên đúng là 'hard enough to pass' (hard ở đây là trạng từ nghĩa 'chăm chỉ', không thêm -ly). Đảo ngược thành 'enough hard' là sai trật tự từ; còn 'hardly' (hầu như không) hoàn toàn lạc nghĩa so với ý 'học đủ chăm để vượt qua kỳ thi'."
  },
  {
    id: "adv145",
    question: "He spoke ___ for everyone to understand.",
    options: ["clearly enough", "enough clearly", "clear enough", "enough clear"],
    correctIndex: 0,
    explanation: "Cấu trúc 'trạng từ + enough + to V' yêu cầu trạng từ đứng trước 'enough': 'clearly enough for everyone to understand'. 'Clear enough' dùng tính từ nên chỉ hợp khi bổ nghĩa cho danh từ hoặc sau động từ liên kết, không hợp để bổ nghĩa cho động từ 'spoke' ở đây; đảo vị trí thành 'enough clearly' cũng sai trật tự từ."
  },
  {
    id: "adv146",
    question: "She practiced ___ to win the competition.",
    options: ["enough hard", "hard enough", "hardly enough", "too hard"],
    correctIndex: 1,
    explanation: "'Hard enough to win' theo đúng cấu trúc 'trạng từ + enough + to V', với 'hard' là trạng từ (không thêm -ly) đứng trước 'enough'. 'Enough hard' sai vì đảo ngược trật tự từ, còn 'too hard' (quá chăm chỉ, mang nghĩa thái quá dẫn đến kết quả tiêu cực) lại trái nghĩa với ý muốn nói 'đủ chăm chỉ để thắng'."
  },
  {
    id: "adv147",
    question: "He arrived ___ early ___ get a good seat.",
    options: ["so / that", "too / to", "enough / to", "such / that"],
    correctIndex: 1,
    explanation: "Cấu trúc 'too + trạng từ + to V' diễn đạt nghĩa 'quá... để làm gì đó', nên đáp án đúng là 'too / to': 'arrived too early to get a good seat' (đến quá sớm, trước khi có chỗ ngồi tốt). Phân biệt với 'so... that' phải đi kèm một mệnh đề đầy đủ, còn 'enough... to' đặt trạng từ trước 'enough' chứ không dùng với 'too'."
  },
  {
    id: "adv148",
    question: "She reads ___ quickly ___ remember the details.",
    options: ["so / that", "enough / to", "such / that", "too / to"],
    correctIndex: 3,
    explanation: "Cấu trúc 'too + trạng từ + to V' diễn đạt 'quá... đến nỗi không thể làm gì': 'reads too quickly to remember the details' (đọc quá nhanh nên không nhớ được chi tiết). 'So... that' cần một mệnh đề đầy đủ sau 'that', không dùng với động từ nguyên mẫu như trong câu này; 'enough... to' lại mang nghĩa 'đủ để', trái ngược hoàn toàn với ý 'quá nhanh nên không thể'."
  },
  {
    id: "adv149",
    question: "He spoke ___ that I couldn't follow.",
    options: ["too fast", "fast too", "so fast", "fast so"],
    correctIndex: 2,
    explanation: "Cấu trúc 'so + trạng từ + that + mệnh đề' diễn đạt kết quả, nên đúng là 'so fast that I couldn't follow' - từ 'so' luôn đứng ngay trước trạng từ/tính từ nó bổ nghĩa, không đứng sau. Các đáp án đảo vị trí như 'fast too' hay 'fast so' đều sai trật tự từ trong tiếng Anh."
  },
  {
    id: "adv150",
    question: "She typed ___ for a data entry position.",
    options: ["slow too", "too slowly", "slowly too", "so slowly"],
    correctIndex: 1,
    explanation: "Cấu trúc 'too + trạng từ + for + danh từ' diễn đạt sự không đủ tiêu chuẩn: 'typed too slowly for a data entry position' (gõ quá chậm so với yêu cầu công việc nhập liệu). 'Too' phải đứng ngay trước trạng từ 'slowly', không đứng sau như 'slow too' hay 'slowly too' - đây là lỗi trật tự từ phổ biến."
  },
  {
    id: "adv151",
    question: "The music played ___ in the background.",
    options: ["soft", "softly", "softness", "softer"],
    correctIndex: 1,
    explanation: "'Softly' (soft + ly) bổ nghĩa cho động từ 'played', nghĩa là âm nhạc vang lên nhẹ nhàng ở phía sau. Tính từ 'soft' không thể đứng sau động từ 'played' theo cách bổ nghĩa cách thức này; 'softness' (danh từ) và 'softer' (so sánh hơn của tính từ) cũng sai vị trí."
  },
  {
    id: "adv152",
    question: "He walked ___ in the dark room.",
    options: ["cautious", "caution", "cautiously", "cautioned"],
    correctIndex: 2,
    explanation: "'Cautiously' (cautious + ly) bổ nghĩa cho động từ 'walked', nghĩa là anh ấy đi lại thận trọng trong căn phòng tối. 'Caution' (danh từ) và 'cautioned' (động từ quá khứ) đều sai vị trí so với trạng từ chỉ cách thức này."
  },
  {
    id: "adv153",
    question: "She pressed the button ___ and the machine started.",
    options: ["firm", "firmness", "firmly", "firmed"],
    correctIndex: 2,
    explanation: "'Firmly' (firm + ly) bổ nghĩa cho động từ 'pressed', nghĩa là cô ấy nhấn nút một cách dứt khoát, chắc chắn. 'Firmness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv154",
    question: "He speaks ___ in front of large audiences.",
    options: ["nervousness", "nervous", "nervously", "nervousting"],
    correctIndex: 2,
    explanation: "'Nervously' (nervous + ly) bổ nghĩa cho động từ 'speaks', nghĩa là anh ấy nói một cách lo lắng, hồi hộp trước đám đông lớn. 'Nervous' (tính từ) và 'nervousness' (danh từ) đều không thể đứng ở vị trí bổ nghĩa cho động từ như trạng từ."
  },
  {
    id: "adv155",
    question: "She cleaned the house ___ before the guests arrived.",
    options: ["thorough", "thoroughness", "thoroughly", "thoroughed"],
    correctIndex: 2,
    explanation: "'Thoroughly' (thorough + ly) bổ nghĩa cho động từ 'cleaned', nghĩa là cô ấy dọn nhà kỹ lưỡng trước khi khách đến. 'Thoroughness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv156",
    question: "___, he got a promotion after only six months.",
    options: "Surprise / Surprising / Surprisingly / Surprised".split(" / "),
    correctIndex: 2,
    explanation: "'Surprisingly' (surprising + ly) đứng đầu câu, đóng vai trò trạng từ bình luận cho cả sự việc anh ấy được thăng chức chỉ sau sáu tháng. 'Surprise' (danh từ/động từ) và 'surprised' (tính từ bị động) không thể đứng độc lập đầu câu để bổ nghĩa cho toàn bộ mệnh đề theo cách trạng từ làm được."
  },
  {
    id: "adv157",
    question: "___, the meeting was cancelled at the last minute.",
    options: ["Fortunate", "Fortune", "Fortunately", "Fortunateness"],
    correctIndex: 2,
    explanation: "'Fortunately' (fortunate + ly) đứng đầu câu như một trạng từ bình luận, thể hiện thái độ 'may mắn thay' của người nói về việc cuộc họp bị hủy. 'Fortunate' (tính từ) và 'fortune' (danh từ, 'vận may') không thể đứng độc lập ở đầu câu để bổ nghĩa cho cả mệnh đề như trạng từ."
  },
  {
    id: "adv158",
    question: "___, there were no casualties in the accident.",
    options: ["Lucky", "Luck", "Luckily", "Lucked"],
    correctIndex: 2,
    explanation: "'Luckily' (lucky + ly, đổi y thành i) đứng đầu câu như một trạng từ bình luận, nghĩa là 'may mắn thay', về việc không có ai bị thương trong tai nạn. 'Lucky' (tính từ) và 'luck' (danh từ) không thể đứng độc lập đầu câu để bổ nghĩa cho cả mệnh đề như trạng từ 'luckily' làm được."
  },
  {
    id: "adv159",
    question: "___, she failed the exam again.",
    options: ["Sad", "Sadly", "Sadness", "Sadder"],
    correctIndex: 1,
    explanation: "'Sadly' (sad + ly) đứng đầu câu như một trạng từ bình luận, nghĩa là 'đáng buồn thay', thể hiện thái độ của người nói về việc cô ấy trượt kỳ thi lần nữa. 'Sad' (tính từ) và 'sadness' (danh từ) không thể đứng độc lập ở đầu câu theo cách trạng từ bình luận làm được."
  },
  {
    id: "adv160",
    question: "___, he is one of the best students in the school.",
    options: ["Undoubted", "Undoubtedly", "Undoubtful", "Undoubting"],
    correctIndex: 1,
    explanation: "'Undoubtedly' (undoubted + ly) đứng đầu câu như một trạng từ bình luận, nghĩa là 'chắc chắn, không nghi ngờ gì', khẳng định anh ấy là một trong những học sinh giỏi nhất trường. 'Undoubtful' không phải từ chuẩn, còn 'undoubting' không phải cách dùng tự nhiên ở vị trí trạng từ đầu câu."
  },
  {
    id: "adv161",
    question: "She closed the door ___ so as not to wake the baby.",
    options: ["gentle", "gentleness", "gently", "gentled"],
    correctIndex: 2,
    explanation: "'Gently' (gentle + ly, bỏ e trước khi thêm ly) bổ nghĩa cho động từ 'closed', nghĩa là cô ấy khép cửa nhẹ nhàng để không đánh thức em bé. 'Gentleness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv162",
    question: "He apologised ___ for the misunderstanding.",
    options: ["sincere", "sincerity", "sincerely", "sincerest"],
    correctIndex: 2,
    explanation: "'Sincerely' (sincere + ly) bổ nghĩa cho động từ 'apologised', nghĩa là anh ấy xin lỗi một cách chân thành vì sự hiểu lầm. 'Sincerity' (danh từ) và 'sincerest' (so sánh nhất của tính từ) đều sai vị trí ngữ pháp so với trạng từ cần điền."
  },
  {
    id: "adv163",
    question: "The old couple held hands ___.",
    options: ["tender", "tenderness", "tenderly", "tendered"],
    correctIndex: 2,
    explanation: "'Tenderly' (tender + ly) bổ nghĩa cho động từ 'held', nghĩa là đôi vợ chồng già nắm tay nhau một cách trìu mến, dịu dàng. 'Tenderness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv164",
    question: "She fell ___ the moment she sat down.",
    options: ["asleep", "sleep", "sleeping", "slept"],
    correctIndex: 0,
    explanation: "'Asleep' là một trạng từ/vị từ đặc biệt, chỉ dùng sau động từ như 'fall' hay 'be', không đứng trước danh từ, tạo thành cụm cố định 'fall asleep' nghĩa là 'chìm vào giấc ngủ'. 'Sleep' (động từ nguyên mẫu/danh từ) và 'sleeping' (-ing) không kết hợp tự nhiên với 'fell' theo cách này; 'slept' là dạng quá khứ của chính động từ cần theo sau, nên không thể lặp lại một động từ chia thì khác ở vị trí đó."
  },
  {
    id: "adv165",
    question: "He stood ___ as the anthem played.",
    options: ["still", "stilly", "stillness", "stilled"],
    correctIndex: 0,
    explanation: "'Still' ở đây mang nghĩa 'bất động, đứng yên', là trạng từ đặc biệt không thêm -ly (khác với 'still' nghĩa 'vẫn' trong các câu thì hoàn thành), bổ nghĩa cho động từ 'stood'. 'Stilly' không phải từ thông dụng, còn 'stillness' (danh từ) và 'stilled' (động từ) đều sai từ loại ở vị trí trạng từ chỉ trạng thái này."
  },
  {
    id: "adv166",
    question: "She ___ relies on others for support.",
    options: ["heavy", "heaviness", "heavily", "heavied"],
    correctIndex: 2,
    explanation: "'Heavily' (heavy + ly, đổi y thành i) bổ nghĩa cho động từ 'relies', nghĩa là cô ấy phụ thuộc nhiều vào sự giúp đỡ của người khác. 'Heaviness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv167",
    question: "He reacted ___ to the bad news.",
    options: ["poor", "poorly", "poorness", "poored"],
    correctIndex: 1,
    explanation: "'Poorly' (poor + ly) bổ nghĩa cho động từ 'reacted', nghĩa là anh ấy phản ứng kém, không tốt trước tin xấu. 'Poorness' (danh từ ít dùng) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv168",
    question: "She smiled ___ at the camera.",
    options: ["shy", "shyness", "shyly", "shied"],
    correctIndex: 2,
    explanation: "'Shyly' (shy + ly) bổ nghĩa cho động từ 'smiled', nghĩa là cô ấy mỉm cười một cách e thẹn, nhút nhát trước ống kính. 'Shyness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv169",
    question: "He laughed ___ at the joke.",
    options: ["heart", "heartiness", "heartily", "heartied"],
    correctIndex: 2,
    explanation: "'Heartily' (hearty + ly, hearty→heartily) bổ nghĩa cho động từ 'laughed', nghĩa là anh ấy cười sảng khoái, thật lòng trước câu chuyện đùa. 'Heart' (danh từ, 'trái tim') và 'heartiness' (danh từ trừu tượng) đều sai vị trí so với trạng từ cần điền."
  },
  {
    id: "adv170",
    question: "The road ___ leading to the village was narrow.",
    options: ["ahead", "forward", "behind", "backward"],
    correctIndex: 0,
    explanation: "'Ahead' (phía trước) là trạng từ chỉ vị trí, đứng sau danh từ 'road' để chỉ rõ con đường phía trước dẫn đến ngôi làng. 'Forward' chỉ hướng chuyển động chứ không dùng để định vị một vật tĩnh như con đường theo cách này; 'behind' (phía sau) và 'backward' (về phía sau) đều sai nghĩa vì trái ngược với ý 'phía trước'."
  },
  {
    id: "adv171",
    question: "She walked ___ without looking back.",
    options: ["forth", "forward", "before", "ahead"],
    correctIndex: 1,
    explanation: "'Forward' (về phía trước) là trạng từ chỉ hướng, bổ nghĩa cho động từ 'walked' để nói cô ấy bước tiếp mà không ngoái lại. 'Forth' gần nghĩa nhưng thường đi cùng cụm cố định như 'back and forth', ít tự nhiên khi đứng một mình sau 'walked' như 'forward'; 'ahead' thường đi kèm giới từ 'of' khi so sánh vị trí, còn 'before' chủ yếu là giới từ/liên từ chỉ thời gian."
  },
  {
    id: "adv172",
    question: "He looked ___ before crossing the road.",
    options: ["both ways", "both side", "to both", "both way"],
    correctIndex: 0,
    explanation: "'Both ways' (cả hai phía/hướng) là cụm trạng từ chỉ hướng, bổ nghĩa cho động từ 'looked' - nhìn cả hai bên trước khi qua đường. Cần chú ý 'ways' phải có 's' vì đây là cụm cố định; 'both side' và 'both way' thiếu 's' đều sai ngữ pháp, còn 'to both' không tạo thành cụm trạng từ hoàn chỉnh và tự nhiên."
  },
  {
    id: "adv173",
    question: "She returned ___ after a year abroad.",
    options: ["home", "homely", "homeward", "homeness"],
    correctIndex: 0,
    explanation: "'Home' có thể tự làm trạng từ chỉ nơi chốn (không cần giới từ 'to'), bổ nghĩa cho động từ 'returned': 'returned home' nghĩa là trở về nhà. 'Homely' là tính từ (nghĩa 'giản dị, mộc mạc') chứ không phải trạng từ chỉ hướng; 'homeward' đúng là trạng từ chỉ hướng nhưng ít tự nhiên hơn 'home' trong câu này, còn 'homeness' không phải từ thật."
  },
  {
    id: "adv174",
    question: "The kids played ___ in the garden.",
    options: ["outside", "out of", "outer", "outsider"],
    correctIndex: 0,
    explanation: "'Outside' (bên ngoài) là trạng từ chỉ nơi chốn, bổ nghĩa cho động từ 'played' - bọn trẻ chơi ngoài vườn. 'Out of' là giới từ cần có tân ngữ theo sau, không thể đứng một mình; 'outer' (tính từ, chỉ đứng trước danh từ) và 'outsider' (danh từ, 'người ngoài cuộc') đều sai từ loại ở vị trí này."
  },
  {
    id: "adv175",
    question: "Please come ___ out of the rain.",
    options: ["inside", "in side", "inner", "inward"],
    correctIndex: 0,
    explanation: "'Inside' (bên trong) là trạng từ chỉ nơi chốn, bổ nghĩa cho động từ 'come' để mời ai đó vào nhà tránh mưa. 'In side' không phải cách viết đúng (phải viết liền thành 'inside'); 'inner' (tính từ, chỉ đứng trước danh từ) và 'inward' (thường mang nghĩa trừu tượng hơn) đều không tự nhiên bằng 'inside' trong ngữ cảnh này."
  },
  {
    id: "adv176",
    question: "He moved ___ to make room for her.",
    options: ["side", "sideways", "sidering", "sideness"],
    correctIndex: 1,
    explanation: "'Sideways' (sang một bên) là trạng từ chỉ hướng, bổ nghĩa cho động từ 'moved' - anh ấy dịch người sang bên để nhường chỗ cho cô ấy. 'Side' là danh từ đơn thuần, không thể tự làm trạng từ chỉ hướng; 'sidering' và 'sideness' đều không phải từ thật trong tiếng Anh."
  },
  {
    id: "adv177",
    question: "The price of petrol has gone ___ again.",
    options: ["up", "high", "highly", "above"],
    correctIndex: 0,
    explanation: "'Up' bổ nghĩa cho động từ 'gone', tạo thành cụm động từ 'go up' nghĩa là 'tăng lên' (giá xăng lại tăng). 'High' là tính từ/trạng từ chỉ độ cao vật lý chứ không diễn tả sự gia tăng theo cách này; 'highly' là trạng từ chỉ mức độ ('extremely') và 'above' là giới từ chỉ vị trí trên, cả hai đều không phù hợp với cụm 'gone up' quen thuộc."
  },
  {
    id: "adv178",
    question: "The sun rises ___ in the east.",
    options: ["every day", "everyday", "always", "each day"],
    correctIndex: 0,
    explanation: "'Every day' (viết thành hai từ) là cụm trạng từ chỉ thời gian nghĩa là 'mỗi ngày', bổ nghĩa cho động từ 'rises'. Cần phân biệt với 'everyday' (viết liền) - đó là tính từ nghĩa 'hàng ngày, bình thường' và phải đứng trước danh từ, không thể bổ nghĩa cho động từ như trạng từ 'every day'."
  },
  {
    id: "adv179",
    question: "She called me ___ afternoon.",
    options: ["yesterday", "last", "the other", "passed"],
    correctIndex: 0,
    explanation: "'Yesterday' kết hợp với 'afternoon' tạo thành cụm trạng từ chỉ thời gian cụ thể 'yesterday afternoon' (chiều hôm qua), bổ nghĩa cho động từ 'called'. 'Last' cần đi với danh từ chỉ thời gian theo cấu trúc khác, không tự nhiên bằng 'yesterday afternoon'; còn 'the other' và 'passed' không tạo thành cụm trạng từ chỉ thời gian chuẩn trong tiếng Anh."
  },
  {
    id: "adv180",
    question: "I'll see you ___ morning.",
    options: ["this", "next", "tomorrow", "the future"],
    correctIndex: 2,
    explanation: "'Tomorrow' kết hợp với 'morning' tạo thành cụm trạng từ chỉ thời gian tương lai 'tomorrow morning' (sáng mai), bổ nghĩa cho cả câu. 'This morning' chỉ dùng cho hiện tại/quá khứ gần, không hợp với hành động tương lai 'I'll see you'; 'next' cần một danh từ khác đi kèm hợp lý hơn và 'the future' là cụm danh từ chung chung, không đủ cụ thể để dùng ở đây."
  },
  {
    id: "adv181",
    question: "He ___ felt a sense of achievement after completing the project.",
    options: ["deep", "deeply", "depth", "deepen"],
    correctIndex: 1,
    explanation: "'Deeply' (deep + ly) là trạng từ chỉ mức độ, bổ nghĩa cho động từ 'felt' - anh ấy cảm thấy một cảm giác thành tựu sâu sắc. 'Depth' (danh từ) và 'deepen' (động từ, 'làm sâu thêm') đều sai từ loại ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv182",
    question: "She paused ___ before answering the question.",
    options: ["brief", "briefness", "briefly", "briefed"],
    correctIndex: 2,
    explanation: "'Briefly' (brief + ly) bổ nghĩa cho động từ 'paused', nghĩa là cô ấy ngừng lại trong chốc lát trước khi trả lời. 'Briefness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv183",
    question: "He nodded ___ to show he understood.",
    options: ["slight", "slightly", "slightness", "slighted"],
    correctIndex: 1,
    explanation: "'Slightly' (slight + ly) bổ nghĩa cho động từ 'nodded', nghĩa là anh ấy khẽ gật đầu để ra hiệu đã hiểu. 'Slightness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv184",
    question: "The clock ticked ___ in the silent room.",
    options: ["loud", "loudness", "loudly", "louder"],
    correctIndex: 2,
    explanation: "'Loudly' (loud + ly) bổ nghĩa cho động từ 'ticked', nghĩa là chiếc đồng hồ kêu tích tắc to, rõ trong căn phòng yên tĩnh. 'Loudness' (danh từ) và 'louder' (so sánh hơn của tính từ) đều sai từ loại ở vị trí trạng từ này."
  },
  {
    id: "adv185",
    question: "She ___ glanced at her watch during the meeting.",
    options: ["occasion", "occasional", "occasioning", "occasionally"],
    correctIndex: 3,
    explanation: "'Occasionally' (occasional + ly) bổ nghĩa cho động từ 'glanced', nghĩa là cô ấy thỉnh thoảng liếc nhìn đồng hồ trong cuộc họp. 'Occasional' (tính từ) và 'occasion' (danh từ) đều không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv186",
    question: "He spoke ___ to make his point.",
    options: "Deliberately / Deliberate / Deliberation / Deliberated".split(" / "),
    correctIndex: 0,
    explanation: "'Deliberately' (deliberate + ly) bổ nghĩa cho động từ 'spoke', nghĩa là anh ấy nói một cách cố ý, có chủ đích để nhấn mạnh quan điểm. 'Deliberate' (tính từ/động từ) và 'deliberation' (danh từ, 'sự cân nhắc') đều sai từ loại ở vị trí trạng từ này."
  },
  {
    id: "adv187",
    question: "The fire spread ___ through the forest.",
    options: ["rapid", "rapidity", "rapidly", "rapided"],
    correctIndex: 2,
    explanation: "'Rapidly' (rapid + ly) bổ nghĩa cho động từ 'spread', nghĩa là đám cháy lan nhanh qua khu rừng. 'Rapidity' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv188",
    question: "She held the fragile vase ___.",
    options: ["gentle", "gentleness", "gently", "gentler"],
    correctIndex: 2,
    explanation: "'Gently' (gentle + ly) bổ nghĩa cho động từ 'held', nghĩa là cô ấy cầm chiếc bình dễ vỡ một cách nhẹ nhàng. 'Gentleness' (danh từ) và 'gentler' (so sánh hơn của tính từ) đều sai từ loại ở vị trí trạng từ này."
  },
  {
    id: "adv189",
    question: "He ___ checked all the details in the contract.",
    options: ["method", "methodical", "methodically", "methodiced"],
    correctIndex: 2,
    explanation: "'Methodically' (methodical + ly) bổ nghĩa cho động từ 'checked', nghĩa là anh ấy kiểm tra mọi chi tiết trong hợp đồng một cách có hệ thống, khoa học. 'Methodical' (tính từ) và 'method' (danh từ) đều không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv190",
    question: "The teacher spoke ___ to encourage the shy student.",
    options: ["encourage", "encouragingly", "encouraged", "encouragement"],
    correctIndex: 1,
    explanation: "'Encouragingly' (encouraging + ly) bổ nghĩa cho động từ 'spoke', nghĩa là giáo viên nói chuyện với giọng khích lệ để động viên học sinh nhút nhát. 'Encouraged' (tính từ bị động) và 'encouragement' (danh từ) đều sai từ loại ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv191",
    question: "She pressed her hands ___ together in prayer.",
    options: ["tight", "tightly", "tightness", "tighten"],
    correctIndex: 1,
    explanation: "'Tightly' (tight + ly) bổ nghĩa cho cụm động từ 'pressed together', nghĩa là cô ấy áp chặt hai tay vào nhau khi cầu nguyện. 'Tightness' (danh từ) và 'tighten' (động từ, 'siết chặt') đều sai từ loại ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv192",
    question: "He ___ mentioned the problem without going into detail.",
    options: ["brief", "briefly", "briefness", "briefed"],
    correctIndex: 1,
    explanation: "'Briefly' (brief + ly) bổ nghĩa cho động từ 'mentioned', nghĩa là anh ấy chỉ nhắc qua vấn đề mà không đi sâu vào chi tiết. 'Briefness' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv193",
    question: "She ___ hinted that something was wrong.",
    options: ["subtle", "subtlety", "subtly", "subtled"],
    correctIndex: 2,
    explanation: "'Subtly' (subtle + ly, bỏ e trước khi thêm ly) bổ nghĩa cho động từ 'hinted', nghĩa là cô ấy ám chỉ một cách tinh tế, kín đáo rằng có gì đó không ổn. 'Subtlety' (danh từ) không thể đứng ở vị trí trạng từ bổ nghĩa cho động từ này."
  },
  {
    id: "adv194",
    question: "He ___ pointed out the flaws in the argument.",
    options: "Sharply / Sharp / Sharpness / Sharpen".split(" / "),
    correctIndex: 0,
    explanation: "'Sharply' (sharp + ly) bổ nghĩa cho cụm động từ 'pointed out', nghĩa là anh ấy chỉ ra những sai sót trong lập luận một cách sắc bén, thẳng thắn. 'Sharp' (tính từ) và 'sharpen' (động từ, 'làm sắc') đều sai từ loại ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv195",
    question: "She responded to the insult ___.",
    options: ["calmness", "calm", "calmer", "calmly"],
    correctIndex: 3,
    explanation: "'Calmly' (calm + ly) bổ nghĩa cho động từ 'responded', nghĩa là cô ấy đáp lại lời xúc phạm một cách bình tĩnh, điềm đạm. 'Calmness' (danh từ) và 'calmer' (so sánh hơn của tính từ) đều sai từ loại ở vị trí trạng từ chỉ cách thức này."
  },
  {
    id: "adv196",
    question: "He ___ took responsibility for the mistake.",
    options: ["full", "fullness", "fully", "fuller"],
    correctIndex: 2,
    explanation: "'Fully' (full + ly) bổ nghĩa cho cụm 'took responsibility', nghĩa là anh ấy nhận trách nhiệm hoàn toàn về sai lầm của mình. 'Fullness' (danh từ) và 'fuller' (so sánh hơn của tính từ) đều sai từ loại ở vị trí trạng từ chỉ mức độ này."
  },
  {
    id: "adv197",
    question: "She ___ believes that hard work pays off.",
    options: "Firm / Firmly / Firmness / Firmed".split(" / "),
    correctIndex: 1,
    explanation: "'Firmly' (firm + ly) bổ nghĩa cho động từ 'believes', nghĩa là cô ấy tin chắc, vững vàng rằng làm việc chăm chỉ sẽ được đền đáp. 'Firmness' (danh từ) và 'firmed' (động từ quá khứ) đều sai từ loại ở vị trí trạng từ này."
  },
  {
    id: "adv198",
    question: "He ___ refused to back down from his position.",
    options: ["stubborn", "stubbornness", "stubbornly", "stubbornly-headed"],
    correctIndex: 2,
    explanation: "'Stubbornly' (stubborn + ly) bổ nghĩa cho động từ 'refused', nghĩa là anh ấy từ chối lùi bước khỏi lập trường của mình một cách bướng bỉnh. 'Stubbornness' (danh từ) và 'stubbornly-headed' (không phải từ thật) đều sai so với trạng từ chuẩn 'stubbornly'."
  },
  {
    id: "adv199",
    question: "She ___ overcame every obstacle in her path.",
    options: ["brave", "bravely", "braveness", "braver"],
    correctIndex: 1,
    explanation: "'Bravely' (brave + ly) bổ nghĩa cho động từ 'overcame', nghĩa là cô ấy vượt qua mọi trở ngại trên đường đi một cách dũng cảm. 'Braveness' (danh từ ít dùng, thường dùng 'bravery') và 'braver' (so sánh hơn của tính từ) đều sai từ loại ở vị trí trạng từ này."
  },
  {
    id: "adv200",
    question: "He dedicated himself ___ to his craft.",
    options: ["whole", "wholeness", "wholly", "wholesome"],
    correctIndex: 2,
    explanation: "'Wholly' (whole + ly, giữ nguyên hai chữ l) bổ nghĩa cho cụm 'dedicated himself', nghĩa là anh ấy cống hiến hoàn toàn, tuyệt đối cho nghề nghiệp của mình. Cẩn thận chính tả: 'wholly' có hai chữ l vì gốc 'whole' đã có l, cộng thêm -ly. 'Wholesome' là tính từ hoàn toàn khác nghĩa ('lành mạnh, bổ dưỡng'), dễ gây nhầm lẫn về hình thức nhưng không liên quan đến nghĩa 'toàn bộ, hoàn toàn' cần ở đây."
  },
];
