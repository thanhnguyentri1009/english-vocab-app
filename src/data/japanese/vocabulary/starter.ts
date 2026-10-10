import type { JapaneseWord } from '../types'

// The very first words to learn before N5 — greetings, pronouns, numbers,
// particles and the handful of verbs needed to build a first sentence.
export const STARTER: JapaneseWord[] = [
  // Greetings & courtesy
  { id: 'starter-0001', jp: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', meaning: 'hello, good afternoon', vi: 'xin chào', example: { sentence: 'こんにちは、たなかです。', reading: 'こんにちは、たなかです。', vi: 'Xin chào, tôi là Tanaka.', meaning: "Hello, I'm Tanaka." } },
  { id: 'starter-0002', jp: 'おはようございます', reading: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: 'good morning', vi: 'chào buổi sáng', example: { sentence: 'せんせい、おはようございます。', reading: 'せんせい、おはようございます。', vi: 'Chào buổi sáng, thầy/cô.', meaning: 'Good morning, teacher.' } },
  { id: 'starter-0003', jp: 'こんばんは', reading: 'こんばんは', romaji: 'konbanwa', meaning: 'good evening', vi: 'chào buổi tối', example: { sentence: 'みなさん、こんばんは。', reading: 'みなさん、こんばんは。', vi: 'Chào buổi tối mọi người.', meaning: 'Good evening, everyone.' } },
  { id: 'starter-0004', jp: 'さようなら', reading: 'さようなら', romaji: 'sayounara', meaning: 'goodbye', vi: 'tạm biệt', example: { sentence: 'さようなら、またあした。', reading: 'さようなら、またあした。', vi: 'Tạm biệt, mai gặp lại.', meaning: 'Goodbye, see you tomorrow.' } },
  { id: 'starter-0005', jp: 'おやすみなさい', reading: 'おやすみなさい', romaji: 'oyasuminasai', meaning: 'good night', vi: 'chúc ngủ ngon', example: { sentence: 'おかあさん、おやすみなさい。', reading: 'おかあさん、おやすみなさい。', vi: 'Mẹ ơi, chúc mẹ ngủ ngon.', meaning: 'Good night, mom.' } },
  { id: 'starter-0006', jp: 'ありがとうございます', reading: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: 'thank you', vi: 'cảm ơn', example: { sentence: 'どうもありがとうございます。', reading: 'どうもありがとうございます。', vi: 'Cảm ơn rất nhiều.', meaning: 'Thank you very much.' } },
  { id: 'starter-0007', jp: 'すみません', reading: 'すみません', romaji: 'sumimasen', meaning: 'excuse me', vi: 'xin lỗi (làm phiền), cho hỏi', example: { sentence: 'すみません、トイレはどこですか。', reading: 'すみません、トイレはどこですか。', vi: 'Xin lỗi, nhà vệ sinh ở đâu ạ?', meaning: 'Excuse me, where is the toilet?' } },
  { id: 'starter-0008', jp: 'ごめんなさい', reading: 'ごめんなさい', romaji: 'gomennasai', meaning: "I'm sorry (apology)", vi: 'xin lỗi (khi mắc lỗi)', example: { sentence: 'おそくなって、ごめんなさい。', reading: 'おそくなって、ごめんなさい。', vi: 'Xin lỗi vì đến muộn.', meaning: "Sorry I'm late." } },
  { id: 'starter-0009', jp: 'はじめまして', reading: 'はじめまして', romaji: 'hajimemashite', meaning: 'nice to meet you', vi: 'rất vui được gặp bạn', example: { sentence: 'はじめまして、アンです。', reading: 'はじめまして、アンです。', vi: 'Rất vui được gặp bạn, tôi là An.', meaning: "Nice to meet you, I'm An." } },
  { id: 'starter-0010', jp: 'よろしくおねがいします', reading: 'よろしくおねがいします', romaji: 'yoroshiku onegaishimasu', meaning: 'please treat me well', vi: 'rất mong được giúp đỡ', example: { sentence: 'どうぞよろしくおねがいします。', reading: 'どうぞよろしくおねがいします。', vi: 'Rất mong được bạn giúp đỡ.', meaning: 'Pleased to meet you.' } },
  { id: 'starter-0011', jp: 'おねがいします', reading: 'おねがいします', romaji: 'onegaishimasu', meaning: 'please (request)', vi: 'làm ơn, xin vui lòng', example: { sentence: 'みず、おねがいします。', reading: 'みず、おねがいします。', vi: 'Cho tôi nước, làm ơn.', meaning: 'Water, please.' } },
  { id: 'starter-0012', jp: 'いただきます', reading: 'いただきます', romaji: 'itadakimasu', meaning: 'said before eating', vi: 'mời mọi người (trước khi ăn)', example: { sentence: 'では、いただきます。', reading: 'では、いただきます。', vi: 'Vậy thì, mời mọi người ăn.', meaning: "Well then, let's eat." } },
  { id: 'starter-0013', jp: 'ごちそうさまでした', reading: 'ごちそうさまでした', romaji: 'gochisousama deshita', meaning: 'thank you for the meal', vi: 'cảm ơn vì bữa ăn', example: { sentence: 'おいしかったです。ごちそうさまでした。', reading: 'おいしかったです。ごちそうさまでした。', vi: 'Ngon lắm. Cảm ơn vì bữa ăn.', meaning: 'It was delicious. Thank you for the meal.' } },

  // Yes / no
  { id: 'starter-0014', jp: 'はい', reading: 'はい', romaji: 'hai', meaning: 'yes', vi: 'vâng, có', example: { sentence: 'はい、そうです。', reading: 'はい、そうです。', vi: 'Vâng, đúng vậy.', meaning: "Yes, that's right." } },
  { id: 'starter-0015', jp: 'いいえ', reading: 'いいえ', romaji: 'iie', meaning: 'no (answer)', vi: 'không (câu trả lời)', example: { sentence: 'いいえ、ちがいます。', reading: 'いいえ、ちがいます。', vi: 'Không, không phải.', meaning: "No, that's wrong." } },
  { id: 'starter-0016', jp: 'そうです', reading: 'そうです', romaji: 'sou desu', meaning: "that's right", vi: 'đúng vậy', example: { sentence: 'はい、そうです。', reading: 'はい、そうです。', vi: 'Vâng, đúng vậy.', meaning: "Yes, that's right." } },
  { id: 'starter-0017', jp: 'ちがいます', reading: 'ちがいます', romaji: 'chigaimasu', meaning: "that's wrong, no", vi: 'không phải, sai rồi', example: { sentence: 'いいえ、ちがいます。', reading: 'いいえ、ちがいます。', vi: 'Không, không phải.', meaning: "No, that's not it." } },
  { id: 'starter-0018', jp: 'です', reading: 'です', romaji: 'desu', meaning: 'is, am, are (polite)', vi: 'là (lịch sự)', example: { sentence: 'わたしはがくせいです。', reading: 'わたしはがくせいです。', vi: 'Tôi là học sinh.', meaning: 'I am a student.' } },

  // Pronouns
  { id: 'starter-0019', jp: '私', reading: 'わたし', romaji: 'watashi', meaning: 'I, me', vi: 'tôi', example: { sentence: '私はベトナム人です。', reading: 'わたしはベトナムじんです。', vi: 'Tôi là người Việt Nam.', meaning: 'I am Vietnamese.' } },
  { id: 'starter-0020', jp: 'あなた', reading: 'あなた', romaji: 'anata', meaning: 'you', vi: 'bạn', example: { sentence: 'あなたはがくせいですか。', reading: 'あなたはがくせいですか。', vi: 'Bạn là học sinh à?', meaning: 'Are you a student?' } },
  { id: 'starter-0021', jp: '彼', reading: 'かれ', romaji: 'kare', meaning: 'he, him', vi: 'anh ấy', example: { sentence: '彼はせんせいです。', reading: 'かれはせんせいです。', vi: 'Anh ấy là giáo viên.', meaning: 'He is a teacher.' } },
  { id: 'starter-0022', jp: '彼女', reading: 'かのじょ', romaji: 'kanojo', meaning: 'she, her', vi: 'cô ấy', example: { sentence: '彼女はともだちです。', reading: 'かのじょはともだちです。', vi: 'Cô ấy là bạn tôi.', meaning: 'She is my friend.' } },
  { id: 'starter-0023', jp: '私たち', reading: 'わたしたち', romaji: 'watashitachi', meaning: 'we, us', vi: 'chúng tôi', example: { sentence: '私たちはともだちです。', reading: 'わたしたちはともだちです。', vi: 'Chúng tôi là bạn.', meaning: 'We are friends.' } },
  { id: 'starter-0024', jp: '誰', reading: 'だれ', romaji: 'dare', meaning: 'who', vi: 'ai', example: { sentence: 'あのひとはだれですか。', reading: 'あのひとはだれですか。', vi: 'Người kia là ai vậy?', meaning: 'Who is that person?' } },

  // This / that / where
  { id: 'starter-0025', jp: 'これ', reading: 'これ', romaji: 'kore', meaning: 'this (thing)', vi: 'cái này', example: { sentence: 'これはほんです。', reading: 'これはほんです。', vi: 'Đây là quyển sách.', meaning: 'This is a book.' } },
  { id: 'starter-0026', jp: 'それ', reading: 'それ', romaji: 'sore', meaning: 'that (near you)', vi: 'cái đó', example: { sentence: 'それはなんですか。', reading: 'それはなんですか。', vi: 'Cái đó là gì vậy?', meaning: 'What is that?' } },
  { id: 'starter-0027', jp: 'あれ', reading: 'あれ', romaji: 'are', meaning: 'that (over there)', vi: 'cái kia', example: { sentence: 'あれはがっこうです。', reading: 'あれはがっこうです。', vi: 'Kia là trường học.', meaning: 'That over there is a school.' } },
  { id: 'starter-0028', jp: 'ここ', reading: 'ここ', romaji: 'koko', meaning: 'here', vi: 'ở đây', example: { sentence: 'ここはどこですか。', reading: 'ここはどこですか。', vi: 'Đây là đâu vậy?', meaning: 'Where is this place?' } },
  { id: 'starter-0029', jp: 'そこ', reading: 'そこ', romaji: 'soko', meaning: 'there (near you)', vi: 'ở đó', example: { sentence: 'そこにいます。', reading: 'そこにいます。', vi: 'Tôi ở đó.', meaning: "I'm there." } },
  { id: 'starter-0030', jp: 'あそこ', reading: 'あそこ', romaji: 'asoko', meaning: 'over there', vi: 'ở đằng kia', example: { sentence: 'えきはあそこです。', reading: 'えきはあそこです。', vi: 'Nhà ga ở đằng kia.', meaning: 'The station is over there.' } },

  // Question words
  { id: 'starter-0031', jp: 'か', reading: 'か', romaji: 'ka', meaning: 'question particle', vi: 'không? à? (trợ từ hỏi)', example: { sentence: 'がくせいですか。', reading: 'がくせいですか。', vi: 'Bạn là học sinh à?', meaning: 'Are you a student?' } },
  { id: 'starter-0032', jp: '何', reading: 'なに', romaji: 'nani', meaning: 'what', vi: 'cái gì', example: { sentence: 'これは何ですか。', reading: 'これはなんですか。', vi: 'Cái này là gì?', meaning: 'What is this?' } },
  { id: 'starter-0033', jp: 'どこ', reading: 'どこ', romaji: 'doko', meaning: 'where', vi: 'ở đâu', example: { sentence: 'トイレはどこですか。', reading: 'トイレはどこですか。', vi: 'Nhà vệ sinh ở đâu?', meaning: 'Where is the toilet?' } },
  { id: 'starter-0034', jp: 'いつ', reading: 'いつ', romaji: 'itsu', meaning: 'when', vi: 'khi nào', example: { sentence: 'たんじょうびはいつですか。', reading: 'たんじょうびはいつですか。', vi: 'Sinh nhật bạn khi nào?', meaning: 'When is your birthday?' } },
  { id: 'starter-0035', jp: 'いくら', reading: 'いくら', romaji: 'ikura', meaning: 'how much (price)', vi: 'bao nhiêu tiền', example: { sentence: 'これはいくらですか。', reading: 'これはいくらですか。', vi: 'Cái này bao nhiêu tiền?', meaning: 'How much is this?' } },
  { id: 'starter-0036', jp: 'どう', reading: 'どう', romaji: 'dou', meaning: 'how', vi: 'thế nào', example: { sentence: 'にほんごはどうですか。', reading: 'にほんごはどうですか。', vi: 'Tiếng Nhật thế nào?', meaning: 'How is Japanese?' } },

  // Particles
  { id: 'starter-0037', jp: 'は', reading: 'は', romaji: 'wa', meaning: 'topic particle', vi: 'thì, là (trợ từ chủ đề)', example: { sentence: 'わたしはアンです。', reading: 'わたしはアンです。', vi: 'Tôi là An.', meaning: "I'm An." } },
  { id: 'starter-0038', jp: 'の', reading: 'の', romaji: 'no', meaning: "possessive particle ('s)", vi: 'của', example: { sentence: 'わたしのほんです。', reading: 'わたしのほんです。', vi: 'Sách của tôi.', meaning: "It's my book." } },
  { id: 'starter-0039', jp: 'も', reading: 'も', romaji: 'mo', meaning: 'also, too', vi: 'cũng', example: { sentence: 'わたしもがくせいです。', reading: 'わたしもがくせいです。', vi: 'Tôi cũng là học sinh.', meaning: 'I am a student too.' } },
  { id: 'starter-0040', jp: 'を', reading: 'を', romaji: 'o', meaning: 'object particle', vi: '(trợ từ tân ngữ)', example: { sentence: 'みずをのみます。', reading: 'みずをのみます。', vi: 'Tôi uống nước.', meaning: 'I drink water.' } },
  { id: 'starter-0041', jp: 'に', reading: 'に', romaji: 'ni', meaning: 'to, at (particle)', vi: 'đến, vào lúc (trợ từ)', example: { sentence: 'がっこうにいきます。', reading: 'がっこうにいきます。', vi: 'Tôi đi đến trường.', meaning: 'I go to school.' } },
  { id: 'starter-0042', jp: 'と', reading: 'と', romaji: 'to', meaning: 'and, with', vi: 'và, cùng với', example: { sentence: 'ともだちといきます。', reading: 'ともだちといきます。', vi: 'Tôi đi cùng bạn.', meaning: "I'll go with a friend." } },

  // Numbers
  { id: 'starter-0043', jp: 'ゼロ', reading: 'ゼロ', romaji: 'zero', meaning: 'zero', vi: 'không (số 0)', example: { sentence: 'ゼロからはじめます。', reading: 'ゼロからはじめます。', vi: 'Bắt đầu từ con số 0.', meaning: 'I start from zero.' } },
  { id: 'starter-0044', jp: '一', reading: 'いち', romaji: 'ichi', meaning: 'one', vi: 'một', example: { sentence: 'いち、に、さん！', reading: 'いち、に、さん！', vi: 'Một, hai, ba!', meaning: 'One, two, three!' } },
  { id: 'starter-0045', jp: '二', reading: 'に', romaji: 'ni', meaning: 'two', vi: 'hai', example: { sentence: 'にじにあいましょう。', reading: 'にじにあいましょう。', vi: 'Gặp nhau lúc hai giờ nhé.', meaning: "Let's meet at two o'clock." } },
  { id: 'starter-0046', jp: '三', reading: 'さん', romaji: 'san', meaning: 'three', vi: 'ba', example: { sentence: 'いまさんじです。', reading: 'いまさんじです。', vi: 'Bây giờ là ba giờ.', meaning: "It's three o'clock now." } },
  { id: 'starter-0047', jp: '四', reading: 'よん', romaji: 'yon', meaning: 'four', vi: 'bốn', example: { sentence: 'よにんかぞくです。', reading: 'よにんかぞくです。', vi: 'Gia đình tôi có bốn người.', meaning: 'I have a family of four.' } },
  { id: 'starter-0048', jp: '五', reading: 'ご', romaji: 'go', meaning: 'five', vi: 'năm', example: { sentence: 'ごじにかえります。', reading: 'ごじにかえります。', vi: 'Tôi về lúc năm giờ.', meaning: "I'll go home at five." } },
  { id: 'starter-0049', jp: '六', reading: 'ろく', romaji: 'roku', meaning: 'six', vi: 'sáu', example: { sentence: 'ろくじにおきます。', reading: 'ろくじにおきます。', vi: 'Tôi dậy lúc sáu giờ.', meaning: 'I get up at six.' } },
  { id: 'starter-0050', jp: '七', reading: 'なな', romaji: 'nana', meaning: 'seven', vi: 'bảy', example: { sentence: 'しちじにばんごはんをたべます。', reading: 'しちじにばんごはんをたべます。', vi: 'Tôi ăn tối lúc bảy giờ.', meaning: 'I eat dinner at seven.' } },
  { id: 'starter-0051', jp: '八', reading: 'はち', romaji: 'hachi', meaning: 'eight', vi: 'tám', example: { sentence: 'はちじにがっこうへいきます。', reading: 'はちじにがっこうへいきます。', vi: 'Tôi đến trường lúc tám giờ.', meaning: 'I go to school at eight.' } },
  { id: 'starter-0052', jp: '九', reading: 'きゅう', romaji: 'kyuu', meaning: 'nine', vi: 'chín', example: { sentence: 'いまくじです。', reading: 'いまくじです。', vi: 'Bây giờ là chín giờ.', meaning: "It's nine o'clock now." } },
  { id: 'starter-0053', jp: '十', reading: 'じゅう', romaji: 'juu', meaning: 'ten', vi: 'mười', example: { sentence: 'じゅうじにねます。', reading: 'じゅうじにねます。', vi: 'Tôi đi ngủ lúc mười giờ.', meaning: 'I go to bed at ten.' } },
  { id: 'starter-0054', jp: '百', reading: 'ひゃく', romaji: 'hyaku', meaning: 'hundred', vi: 'trăm', example: { sentence: 'これはひゃくえんです。', reading: 'これはひゃくえんです。', vi: 'Cái này 100 yên.', meaning: 'This is 100 yen.' } },
  { id: 'starter-0055', jp: '円', reading: 'えん', romaji: 'en', meaning: 'yen', vi: 'yên (tiền Nhật)', example: { sentence: 'ごひゃくえんです。', reading: 'ごひゃくえんです。', vi: '500 yên ạ.', meaning: "It's 500 yen." } },

  // People & family
  { id: 'starter-0056', jp: '人', reading: 'ひと', romaji: 'hito', meaning: 'person', vi: 'người', example: { sentence: 'あのひとはだれですか。', reading: 'あのひとはだれですか。', vi: 'Người kia là ai vậy?', meaning: 'Who is that person?' } },
  { id: 'starter-0057', jp: '友達', reading: 'ともだち', romaji: 'tomodachi', meaning: 'friend', vi: 'bạn bè', example: { sentence: 'かれはわたしの友達です。', reading: 'かれはわたしのともだちです。', vi: 'Anh ấy là bạn tôi.', meaning: 'He is my friend.' } },
  { id: 'starter-0058', jp: '先生', reading: 'せんせい', romaji: 'sensei', meaning: 'teacher', vi: 'giáo viên', example: { sentence: 'たなか先生はやさしいです。', reading: 'たなかせんせいはやさしいです。', vi: 'Thầy Tanaka rất hiền.', meaning: 'Mr. Tanaka (teacher) is kind.' } },
  { id: 'starter-0059', jp: '学生', reading: 'がくせい', romaji: 'gakusei', meaning: 'student', vi: 'học sinh, sinh viên', example: { sentence: 'わたしは学生です。', reading: 'わたしはがくせいです。', vi: 'Tôi là sinh viên.', meaning: 'I am a student.' } },
  { id: 'starter-0060', jp: 'お父さん', reading: 'おとうさん', romaji: 'otousan', meaning: 'father, dad', vi: 'bố', example: { sentence: 'お父さんはかいしゃいんです。', reading: 'おとうさんはかいしゃいんです。', vi: 'Bố tôi là nhân viên công ty.', meaning: 'My dad is an office worker.' } },
  { id: 'starter-0061', jp: 'お母さん', reading: 'おかあさん', romaji: 'okaasan', meaning: 'mother, mom', vi: 'mẹ', example: { sentence: 'お母さん、ただいま。', reading: 'おかあさん、ただいま。', vi: 'Mẹ ơi, con về rồi.', meaning: "Mom, I'm home." } },
  { id: 'starter-0062', jp: 'お兄さん', reading: 'おにいさん', romaji: 'oniisan', meaning: 'older brother', vi: 'anh trai', example: { sentence: 'お兄さんはせがたかいです。', reading: 'おにいさんはせがたかいです。', vi: 'Anh trai tôi cao.', meaning: 'My older brother is tall.' } },
  { id: 'starter-0063', jp: 'お姉さん', reading: 'おねえさん', romaji: 'oneesan', meaning: 'older sister', vi: 'chị gái', example: { sentence: 'お姉さんはやさしいです。', reading: 'おねえさんはやさしいです。', vi: 'Chị gái tôi rất hiền.', meaning: 'My older sister is kind.' } },
  { id: 'starter-0064', jp: '名前', reading: 'なまえ', romaji: 'namae', meaning: 'name', vi: 'tên', example: { sentence: 'お名前はなんですか。', reading: 'おなまえはなんですか。', vi: 'Tên bạn là gì?', meaning: "What's your name?" } },

  // Core verbs
  { id: 'starter-0065', jp: '食べる', reading: 'たべる', romaji: 'taberu', meaning: 'to eat', vi: 'ăn', example: { sentence: 'ごはんを食べます。', reading: 'ごはんをたべます。', vi: 'Tôi ăn cơm.', meaning: 'I eat rice.' } },
  { id: 'starter-0066', jp: '飲む', reading: 'のむ', romaji: 'nomu', meaning: 'to drink', vi: 'uống', example: { sentence: 'おちゃを飲みます。', reading: 'おちゃをのみます。', vi: 'Tôi uống trà.', meaning: 'I drink tea.' } },
  { id: 'starter-0067', jp: '行く', reading: 'いく', romaji: 'iku', meaning: 'to go', vi: 'đi', example: { sentence: 'がっこうに行きます。', reading: 'がっこうにいきます。', vi: 'Tôi đi đến trường.', meaning: 'I go to school.' } },
  { id: 'starter-0068', jp: '来る', reading: 'くる', romaji: 'kuru', meaning: 'to come', vi: 'đến', example: { sentence: 'ともだちが来ます。', reading: 'ともだちがきます。', vi: 'Bạn tôi sẽ đến.', meaning: 'My friend is coming.' } },
  { id: 'starter-0069', jp: '帰る', reading: 'かえる', romaji: 'kaeru', meaning: 'to go home', vi: 'về (nhà)', example: { sentence: 'うちに帰ります。', reading: 'うちにかえります。', vi: 'Tôi về nhà.', meaning: "I'm going home." } },
  { id: 'starter-0070', jp: '見る', reading: 'みる', romaji: 'miru', meaning: 'to see, to watch', vi: 'xem, nhìn', example: { sentence: 'テレビを見ます。', reading: 'テレビをみます。', vi: 'Tôi xem tivi.', meaning: 'I watch TV.' } },
  { id: 'starter-0071', jp: '聞く', reading: 'きく', romaji: 'kiku', meaning: 'to listen; to ask', vi: 'nghe; hỏi', example: { sentence: 'おんがくを聞きます。', reading: 'おんがくをききます。', vi: 'Tôi nghe nhạc.', meaning: 'I listen to music.' } },
  { id: 'starter-0072', jp: '話す', reading: 'はなす', romaji: 'hanasu', meaning: 'to speak', vi: 'nói', example: { sentence: 'にほんごを話します。', reading: 'にほんごをはなします。', vi: 'Tôi nói tiếng Nhật.', meaning: 'I speak Japanese.' } },
  { id: 'starter-0073', jp: '買う', reading: 'かう', romaji: 'kau', meaning: 'to buy', vi: 'mua', example: { sentence: 'パンを買います。', reading: 'パンをかいます。', vi: 'Tôi mua bánh mì.', meaning: 'I buy bread.' } },
  { id: 'starter-0074', jp: 'する', reading: 'する', romaji: 'suru', meaning: 'to do', vi: 'làm', example: { sentence: 'しゅくだいをします。', reading: 'しゅくだいをします。', vi: 'Tôi làm bài tập.', meaning: 'I do my homework.' } },
  { id: 'starter-0075', jp: 'ある', reading: 'ある', romaji: 'aru', meaning: 'to exist, to have (things)', vi: 'có (đồ vật)', example: { sentence: 'ほんがあります。', reading: 'ほんがあります。', vi: 'Có quyển sách.', meaning: 'There is a book.' } },
  { id: 'starter-0076', jp: 'いる', reading: 'いる', romaji: 'iru', meaning: 'to exist, to be (people, animals)', vi: 'có, ở (người, con vật)', example: { sentence: 'ねこがいます。', reading: 'ねこがいます。', vi: 'Có con mèo.', meaning: 'There is a cat.' } },
  { id: 'starter-0077', jp: '分かる', reading: 'わかる', romaji: 'wakaru', meaning: 'to understand', vi: 'hiểu', example: { sentence: 'すこし分かります。', reading: 'すこしわかります。', vi: 'Tôi hiểu một chút.', meaning: 'I understand a little.' } },
  { id: 'starter-0078', jp: '寝る', reading: 'ねる', romaji: 'neru', meaning: 'to sleep', vi: 'ngủ', example: { sentence: 'じゅうじに寝ます。', reading: 'じゅうじにねます。', vi: 'Tôi ngủ lúc mười giờ.', meaning: 'I go to bed at ten.' } },
  { id: 'starter-0079', jp: '好き', reading: 'すき', romaji: 'suki', meaning: 'to like', vi: 'thích', example: { sentence: 'すしが好きです。', reading: 'すしがすきです。', vi: 'Tôi thích sushi.', meaning: 'I like sushi.' } },

  // Describing words
  { id: 'starter-0080', jp: '大きい', reading: 'おおきい', romaji: 'ookii', meaning: 'big', vi: 'to, lớn', example: { sentence: 'このいえは大きいです。', reading: 'このいえはおおきいです。', vi: 'Ngôi nhà này to.', meaning: 'This house is big.' } },
  { id: 'starter-0081', jp: '小さい', reading: 'ちいさい', romaji: 'chiisai', meaning: 'small', vi: 'nhỏ, bé', example: { sentence: 'このねこは小さいです。', reading: 'このねこはちいさいです。', vi: 'Con mèo này nhỏ.', meaning: 'This cat is small.' } },
  { id: 'starter-0082', jp: 'いい', reading: 'いい', romaji: 'ii', meaning: 'good', vi: 'tốt, hay', example: { sentence: 'いいてんきですね。', reading: 'いいてんきですね。', vi: 'Thời tiết đẹp nhỉ.', meaning: "Nice weather, isn't it?" } },
  { id: 'starter-0083', jp: 'おいしい', reading: 'おいしい', romaji: 'oishii', meaning: 'delicious', vi: 'ngon', example: { sentence: 'これはおいしいです！', reading: 'これはおいしいです！', vi: 'Cái này ngon quá!', meaning: 'This is delicious!' } },
  { id: 'starter-0084', jp: '暑い', reading: 'あつい', romaji: 'atsui', meaning: 'hot (weather)', vi: 'nóng (thời tiết)', example: { sentence: 'きょうは暑いです。', reading: 'きょうはあついです。', vi: 'Hôm nay nóng.', meaning: "It's hot today." } },
  { id: 'starter-0085', jp: '寒い', reading: 'さむい', romaji: 'samui', meaning: 'cold (weather)', vi: 'lạnh (thời tiết)', example: { sentence: 'ふゆは寒いです。', reading: 'ふゆはさむいです。', vi: 'Mùa đông lạnh.', meaning: 'Winter is cold.' } },
  { id: 'starter-0086', jp: '高い', reading: 'たかい', romaji: 'takai', meaning: 'expensive; tall', vi: 'đắt; cao', example: { sentence: 'このかばんは高いです。', reading: 'このかばんはたかいです。', vi: 'Cái túi này đắt.', meaning: 'This bag is expensive.' } },
  { id: 'starter-0087', jp: '安い', reading: 'やすい', romaji: 'yasui', meaning: 'cheap', vi: 'rẻ', example: { sentence: 'このみせは安いです。', reading: 'このみせはやすいです。', vi: 'Cửa hàng này rẻ.', meaning: 'This shop is cheap.' } },
  { id: 'starter-0088', jp: 'とても', reading: 'とても', romaji: 'totemo', meaning: 'very', vi: 'rất', example: { sentence: 'とてもおいしいです。', reading: 'とてもおいしいです。', vi: 'Rất ngon.', meaning: "It's very delicious." } },

  // Time
  { id: 'starter-0089', jp: '今', reading: 'いま', romaji: 'ima', meaning: 'now', vi: 'bây giờ', example: { sentence: '今なんじですか。', reading: 'いまなんじですか。', vi: 'Bây giờ là mấy giờ?', meaning: 'What time is it now?' } },
  { id: 'starter-0090', jp: '今日', reading: 'きょう', romaji: 'kyou', meaning: 'today', vi: 'hôm nay', example: { sentence: '今日はげつようびです。', reading: 'きょうはげつようびです。', vi: 'Hôm nay là thứ Hai.', meaning: 'Today is Monday.' } },
  { id: 'starter-0091', jp: '明日', reading: 'あした', romaji: 'ashita', meaning: 'tomorrow', vi: 'ngày mai', example: { sentence: 'また明日。', reading: 'またあした。', vi: 'Mai gặp lại.', meaning: 'See you tomorrow.' } },
  { id: 'starter-0092', jp: '昨日', reading: 'きのう', romaji: 'kinou', meaning: 'yesterday', vi: 'hôm qua', example: { sentence: '昨日はあめでした。', reading: 'きのうはあめでした。', vi: 'Hôm qua trời mưa.', meaning: 'It rained yesterday.' } },
  { id: 'starter-0093', jp: '〜時', reading: '〜じ', romaji: '~ji', meaning: "o'clock", vi: 'giờ', example: { sentence: 'いま三時です。', reading: 'いまさんじです。', vi: 'Bây giờ là ba giờ.', meaning: "It's three o'clock now." } },

  // Everyday things
  { id: 'starter-0094', jp: '水', reading: 'みず', romaji: 'mizu', meaning: 'water', vi: 'nước', example: { sentence: '水をください。', reading: 'みずをください。', vi: 'Cho tôi nước.', meaning: 'Water, please.' } },
  { id: 'starter-0095', jp: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: 'tea', vi: 'trà', example: { sentence: 'お茶をのみませんか。', reading: 'おちゃをのみませんか。', vi: 'Bạn uống trà không?', meaning: 'Would you like some tea?' } },
  { id: 'starter-0096', jp: 'ご飯', reading: 'ごはん', romaji: 'gohan', meaning: 'rice; meal', vi: 'cơm; bữa ăn', example: { sentence: 'ご飯をたべましょう。', reading: 'ごはんをたべましょう。', vi: 'Cùng ăn cơm nào.', meaning: "Let's eat." } },
  { id: 'starter-0097', jp: 'お金', reading: 'おかね', romaji: 'okane', meaning: 'money', vi: 'tiền', example: { sentence: 'お金がありません。', reading: 'おかねがありません。', vi: 'Tôi không có tiền.', meaning: "I don't have money." } },
  { id: 'starter-0098', jp: '家', reading: 'いえ', romaji: 'ie', meaning: 'house, home', vi: 'nhà', example: { sentence: 'わたしの家はちかいです。', reading: 'わたしのいえはちかいです。', vi: 'Nhà tôi ở gần.', meaning: 'My house is close.' } },
  { id: 'starter-0099', jp: '本', reading: 'ほん', romaji: 'hon', meaning: 'book', vi: 'sách', example: { sentence: 'これは私の本です。', reading: 'これはわたしのほんです。', vi: 'Đây là sách của tôi.', meaning: 'This is my book.' } },
  { id: 'starter-0100', jp: '日本', reading: 'にほん', romaji: 'nihon', meaning: 'Japan', vi: 'Nhật Bản', example: { sentence: '日本に行きたいです。', reading: 'にほんにいきたいです。', vi: 'Tôi muốn đi Nhật Bản.', meaning: 'I want to go to Japan.' } },
  { id: 'starter-0101', jp: '日本語', reading: 'にほんご', romaji: 'nihongo', meaning: 'Japanese language', vi: 'tiếng Nhật', example: { sentence: '日本語をべんきょうします。', reading: 'にほんごをべんきょうします。', vi: 'Tôi học tiếng Nhật.', meaning: 'I study Japanese.' } },
]
