import type { ChineseWord } from '../types'

// The very first words to learn before HSK 1 — pronouns, greetings, numbers,
// question words and the handful of verbs needed to build a first sentence.
export const STARTER: ChineseWord[] = [
  // Pronouns
  { id: 'starter-0001', zh: '我', pinyin: 'wǒ', meaning: 'I, me', vi: 'tôi', example: { sentence: '我是学生。', pinyin: 'Wǒ shì xuésheng.', vi: 'Tôi là học sinh.', meaning: 'I am a student.' } },
  { id: 'starter-0002', zh: '你', pinyin: 'nǐ', meaning: 'you', vi: 'bạn', example: { sentence: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Xin chào!', meaning: 'Hello!' } },
  { id: 'starter-0003', zh: '您', pinyin: 'nín', meaning: 'you (polite)', vi: 'ngài, ông/bà (lịch sự)', example: { sentence: '您好！', pinyin: 'Nín hǎo!', vi: 'Xin chào ông/bà!', meaning: 'Hello! (polite)' } },
  { id: 'starter-0004', zh: '他', pinyin: 'tā', meaning: 'he, him', vi: 'anh ấy', example: { sentence: '他是我朋友。', pinyin: 'Tā shì wǒ péngyou.', vi: 'Anh ấy là bạn tôi.', meaning: 'He is my friend.' } },
  { id: 'starter-0005', zh: '她', pinyin: 'tā', meaning: 'she, her', vi: 'cô ấy', example: { sentence: '她是老师。', pinyin: 'Tā shì lǎoshī.', vi: 'Cô ấy là giáo viên.', meaning: 'She is a teacher.' } },
  { id: 'starter-0006', zh: '我们', pinyin: 'wǒmen', meaning: 'we, us', vi: 'chúng tôi', example: { sentence: '我们是朋友。', pinyin: 'Wǒmen shì péngyou.', vi: 'Chúng tôi là bạn.', meaning: 'We are friends.' } },
  { id: 'starter-0007', zh: '你们', pinyin: 'nǐmen', meaning: 'you (plural)', vi: 'các bạn', example: { sentence: '你们好！', pinyin: 'Nǐmen hǎo!', vi: 'Chào các bạn!', meaning: 'Hello, everyone!' } },
  { id: 'starter-0008', zh: '他们', pinyin: 'tāmen', meaning: 'they, them', vi: 'họ', example: { sentence: '他们是学生。', pinyin: 'Tāmen shì xuésheng.', vi: 'Họ là học sinh.', meaning: 'They are students.' } },

  // Greetings & courtesy
  { id: 'starter-0009', zh: '你好', pinyin: 'nǐ hǎo', meaning: 'hello', vi: 'xin chào', example: { sentence: '你好，我叫小明。', pinyin: 'Nǐ hǎo, wǒ jiào Xiǎomíng.', vi: 'Xin chào, tôi tên là Tiểu Minh.', meaning: 'Hello, my name is Xiaoming.' } },
  { id: 'starter-0010', zh: '早上好', pinyin: 'zǎoshang hǎo', meaning: 'good morning', vi: 'chào buổi sáng', example: { sentence: '老师，早上好！', pinyin: 'Lǎoshī, zǎoshang hǎo!', vi: 'Chào buổi sáng, thầy/cô!', meaning: 'Good morning, teacher!' } },
  { id: 'starter-0011', zh: '谢谢', pinyin: 'xièxie', meaning: 'thank you', vi: 'cảm ơn', example: { sentence: '谢谢你！', pinyin: 'Xièxie nǐ!', vi: 'Cảm ơn bạn!', meaning: 'Thank you!' } },
  { id: 'starter-0012', zh: '不客气', pinyin: 'bú kèqi', meaning: "you're welcome", vi: 'không có gì', example: { sentence: '不客气！', pinyin: 'Bú kèqi!', vi: 'Không có gì!', meaning: "You're welcome!" } },
  { id: 'starter-0013', zh: '对不起', pinyin: 'duìbuqǐ', meaning: 'sorry', vi: 'xin lỗi', example: { sentence: '对不起，我来晚了。', pinyin: 'Duìbuqǐ, wǒ lái wǎn le.', vi: 'Xin lỗi, tôi đến muộn.', meaning: "Sorry, I'm late." } },
  { id: 'starter-0014', zh: '没关系', pinyin: 'méi guānxi', meaning: "it doesn't matter", vi: 'không sao', example: { sentence: '没关系！', pinyin: 'Méi guānxi!', vi: 'Không sao đâu!', meaning: "It's okay!" } },
  { id: 'starter-0015', zh: '再见', pinyin: 'zàijiàn', meaning: 'goodbye', vi: 'tạm biệt', example: { sentence: '明天见，再见！', pinyin: 'Míngtiān jiàn, zàijiàn!', vi: 'Mai gặp lại, tạm biệt!', meaning: 'See you tomorrow, goodbye!' } },
  { id: 'starter-0016', zh: '请', pinyin: 'qǐng', meaning: 'please', vi: 'xin mời, làm ơn', example: { sentence: '请喝茶。', pinyin: 'Qǐng hē chá.', vi: 'Mời uống trà.', meaning: 'Please have some tea.' } },

  // Yes / no
  { id: 'starter-0017', zh: '是', pinyin: 'shì', meaning: 'to be; yes', vi: 'là; vâng', example: { sentence: '我是越南人。', pinyin: 'Wǒ shì Yuènán rén.', vi: 'Tôi là người Việt Nam.', meaning: 'I am Vietnamese.' } },
  { id: 'starter-0018', zh: '不', pinyin: 'bù', meaning: 'no, not', vi: 'không (phủ định)', example: { sentence: '我不是老师。', pinyin: 'Wǒ bú shì lǎoshī.', vi: 'Tôi không phải giáo viên.', meaning: 'I am not a teacher.' } },
  { id: 'starter-0019', zh: '对', pinyin: 'duì', meaning: 'right, correct', vi: 'đúng', example: { sentence: '对，我是学生。', pinyin: 'Duì, wǒ shì xuésheng.', vi: 'Đúng, tôi là học sinh.', meaning: "Right, I'm a student." } },
  { id: 'starter-0020', zh: '好', pinyin: 'hǎo', meaning: 'good; OK', vi: 'tốt; được', example: { sentence: '好，我们走吧。', pinyin: 'Hǎo, wǒmen zǒu ba.', vi: 'Được, chúng ta đi thôi.', meaning: "OK, let's go." } },
  { id: 'starter-0021', zh: '有', pinyin: 'yǒu', meaning: 'to have; there is', vi: 'có', example: { sentence: '我有一个哥哥。', pinyin: 'Wǒ yǒu yí ge gēge.', vi: 'Tôi có một anh trai.', meaning: 'I have an older brother.' } },
  { id: 'starter-0022', zh: '没有', pinyin: 'méiyǒu', meaning: "not have; there isn't", vi: 'không có', example: { sentence: '我没有钱。', pinyin: 'Wǒ méiyǒu qián.', vi: 'Tôi không có tiền.', meaning: "I don't have money." } },

  // Numbers
  { id: 'starter-0023', zh: '零', pinyin: 'líng', meaning: 'zero', vi: 'không (số 0)', example: { sentence: '零加一是一。', pinyin: 'Líng jiā yī shì yī.', vi: 'Không cộng một là một.', meaning: 'Zero plus one is one.' } },
  { id: 'starter-0024', zh: '一', pinyin: 'yī', meaning: 'one', vi: 'một', example: { sentence: '我有一本书。', pinyin: 'Wǒ yǒu yì běn shū.', vi: 'Tôi có một quyển sách.', meaning: 'I have one book.' } },
  { id: 'starter-0025', zh: '二', pinyin: 'èr', meaning: 'two (counting)', vi: 'hai (số đếm)', example: { sentence: '一，二，三！', pinyin: 'Yī, èr, sān!', vi: 'Một, hai, ba!', meaning: 'One, two, three!' } },
  { id: 'starter-0026', zh: '两', pinyin: 'liǎng', meaning: 'two (with measure words)', vi: 'hai (dùng trước lượng từ)', example: { sentence: '我有两个妹妹。', pinyin: 'Wǒ yǒu liǎng ge mèimei.', vi: 'Tôi có hai em gái.', meaning: 'I have two younger sisters.' } },
  { id: 'starter-0027', zh: '三', pinyin: 'sān', meaning: 'three', vi: 'ba', example: { sentence: '我们家有三个人。', pinyin: 'Wǒmen jiā yǒu sān ge rén.', vi: 'Nhà chúng tôi có ba người.', meaning: 'There are three people in our family.' } },
  { id: 'starter-0028', zh: '四', pinyin: 'sì', meaning: 'four', vi: 'bốn', example: { sentence: '我四点回家。', pinyin: 'Wǒ sì diǎn huí jiā.', vi: 'Tôi về nhà lúc bốn giờ.', meaning: "I go home at four o'clock." } },
  { id: 'starter-0029', zh: '五', pinyin: 'wǔ', meaning: 'five', vi: 'năm', example: { sentence: '我有五块钱。', pinyin: 'Wǒ yǒu wǔ kuài qián.', vi: 'Tôi có năm đồng.', meaning: 'I have five yuan.' } },
  { id: 'starter-0030', zh: '六', pinyin: 'liù', meaning: 'six', vi: 'sáu', example: { sentence: '今天六月一日。', pinyin: 'Jīntiān liù yuè yī rì.', vi: 'Hôm nay là ngày một tháng sáu.', meaning: 'Today is June 1st.' } },
  { id: 'starter-0031', zh: '七', pinyin: 'qī', meaning: 'seven', vi: 'bảy', example: { sentence: '我七点起床。', pinyin: 'Wǒ qī diǎn qǐchuáng.', vi: 'Tôi dậy lúc bảy giờ.', meaning: "I get up at seven o'clock." } },
  { id: 'starter-0032', zh: '八', pinyin: 'bā', meaning: 'eight', vi: 'tám', example: { sentence: '他八岁。', pinyin: 'Tā bā suì.', vi: 'Cậu ấy tám tuổi.', meaning: 'He is eight years old.' } },
  { id: 'starter-0033', zh: '九', pinyin: 'jiǔ', meaning: 'nine', vi: 'chín', example: { sentence: '现在九点。', pinyin: 'Xiànzài jiǔ diǎn.', vi: 'Bây giờ là chín giờ.', meaning: "It's nine o'clock now." } },
  { id: 'starter-0034', zh: '十', pinyin: 'shí', meaning: 'ten', vi: 'mười', example: { sentence: '我有十个朋友。', pinyin: 'Wǒ yǒu shí ge péngyou.', vi: 'Tôi có mười người bạn.', meaning: 'I have ten friends.' } },
  { id: 'starter-0035', zh: '百', pinyin: 'bǎi', meaning: 'hundred', vi: 'trăm', example: { sentence: '这个一百块。', pinyin: 'Zhège yìbǎi kuài.', vi: 'Cái này một trăm đồng.', meaning: 'This is one hundred yuan.' } },
  { id: 'starter-0036', zh: '个', pinyin: 'gè', meaning: 'general measure word', vi: 'cái, chiếc (lượng từ chung)', example: { sentence: '一个人。', pinyin: 'Yí ge rén.', vi: 'Một người.', meaning: 'One person.' } },

  // Question words
  { id: 'starter-0037', zh: '吗', pinyin: 'ma', meaning: 'question particle (yes/no)', vi: 'không? (trợ từ nghi vấn)', example: { sentence: '你好吗？', pinyin: 'Nǐ hǎo ma?', vi: 'Bạn khỏe không?', meaning: 'How are you?' } },
  { id: 'starter-0038', zh: '呢', pinyin: 'ne', meaning: 'and you? (particle)', vi: 'thì sao? (trợ từ)', example: { sentence: '我很好，你呢？', pinyin: 'Wǒ hěn hǎo, nǐ ne?', vi: 'Tôi khỏe, còn bạn?', meaning: "I'm fine, and you?" } },
  { id: 'starter-0039', zh: '什么', pinyin: 'shénme', meaning: 'what', vi: 'cái gì', example: { sentence: '这是什么？', pinyin: 'Zhè shì shénme?', vi: 'Đây là cái gì?', meaning: 'What is this?' } },
  { id: 'starter-0040', zh: '谁', pinyin: 'shéi', meaning: 'who', vi: 'ai', example: { sentence: '他是谁？', pinyin: 'Tā shì shéi?', vi: 'Anh ấy là ai?', meaning: 'Who is he?' } },
  { id: 'starter-0041', zh: '哪里', pinyin: 'nǎlǐ', meaning: 'where', vi: 'ở đâu', example: { sentence: '你去哪里？', pinyin: 'Nǐ qù nǎlǐ?', vi: 'Bạn đi đâu?', meaning: 'Where are you going?' } },
  { id: 'starter-0042', zh: '几', pinyin: 'jǐ', meaning: 'how many (small number)', vi: 'mấy', example: { sentence: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', vi: 'Bây giờ mấy giờ?', meaning: 'What time is it now?' } },
  { id: 'starter-0043', zh: '多少', pinyin: 'duōshao', meaning: 'how much, how many', vi: 'bao nhiêu', example: { sentence: '这个多少钱？', pinyin: 'Zhège duōshao qián?', vi: 'Cái này bao nhiêu tiền?', meaning: 'How much is this?' } },
  { id: 'starter-0044', zh: '怎么', pinyin: 'zěnme', meaning: 'how', vi: 'thế nào, làm sao', example: { sentence: '这个字怎么读？', pinyin: 'Zhège zì zěnme dú?', vi: 'Chữ này đọc thế nào?', meaning: 'How do you read this character?' } },

  // This / that
  { id: 'starter-0045', zh: '这', pinyin: 'zhè', meaning: 'this', vi: 'này, đây', example: { sentence: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', vi: 'Đây là sách của tôi.', meaning: 'This is my book.' } },
  { id: 'starter-0046', zh: '那', pinyin: 'nà', meaning: 'that', vi: 'kia, đó', example: { sentence: '那是我的家。', pinyin: 'Nà shì wǒ de jiā.', vi: 'Kia là nhà tôi.', meaning: 'That is my home.' } },
  { id: 'starter-0047', zh: '这里', pinyin: 'zhèlǐ', meaning: 'here', vi: 'ở đây', example: { sentence: '我在这里。', pinyin: 'Wǒ zài zhèlǐ.', vi: 'Tôi ở đây.', meaning: 'I am here.' } },
  { id: 'starter-0048', zh: '那里', pinyin: 'nàlǐ', meaning: 'there', vi: 'ở đó', example: { sentence: '他在那里。', pinyin: 'Tā zài nàlǐ.', vi: 'Anh ấy ở đằng kia.', meaning: 'He is over there.' } },

  // Small connecting words
  { id: 'starter-0049', zh: '的', pinyin: 'de', meaning: "possessive particle ('s)", vi: 'của', example: { sentence: '我的朋友。', pinyin: 'Wǒ de péngyou.', vi: 'Bạn của tôi.', meaning: 'My friend.' } },
  { id: 'starter-0050', zh: '很', pinyin: 'hěn', meaning: 'very', vi: 'rất', example: { sentence: '我很好。', pinyin: 'Wǒ hěn hǎo.', vi: 'Tôi rất khỏe.', meaning: "I'm very well." } },
  { id: 'starter-0051', zh: '也', pinyin: 'yě', meaning: 'also, too', vi: 'cũng', example: { sentence: '我也是学生。', pinyin: 'Wǒ yě shì xuésheng.', vi: 'Tôi cũng là học sinh.', meaning: 'I am also a student.' } },
  { id: 'starter-0052', zh: '都', pinyin: 'dōu', meaning: 'all, both', vi: 'đều', example: { sentence: '我们都是朋友。', pinyin: 'Wǒmen dōu shì péngyou.', vi: 'Chúng tôi đều là bạn.', meaning: 'We are all friends.' } },
  { id: 'starter-0053', zh: '和', pinyin: 'hé', meaning: 'and', vi: 'và', example: { sentence: '我和你。', pinyin: 'Wǒ hé nǐ.', vi: 'Tôi và bạn.', meaning: 'You and me.' } },
  { id: 'starter-0054', zh: '在', pinyin: 'zài', meaning: 'to be at; in', vi: 'ở, tại', example: { sentence: '我在家。', pinyin: 'Wǒ zài jiā.', vi: 'Tôi ở nhà.', meaning: 'I am at home.' } },
  { id: 'starter-0055', zh: '了', pinyin: 'le', meaning: 'completed-action particle', vi: 'rồi (trợ từ)', example: { sentence: '我吃了。', pinyin: 'Wǒ chī le.', vi: 'Tôi ăn rồi.', meaning: "I've eaten." } },

  // People & family
  { id: 'starter-0056', zh: '人', pinyin: 'rén', meaning: 'person', vi: 'người', example: { sentence: '他是中国人。', pinyin: 'Tā shì Zhōngguó rén.', vi: 'Anh ấy là người Trung Quốc.', meaning: 'He is Chinese.' } },
  { id: 'starter-0057', zh: '爸爸', pinyin: 'bàba', meaning: 'dad', vi: 'bố', example: { sentence: '这是我爸爸。', pinyin: 'Zhè shì wǒ bàba.', vi: 'Đây là bố tôi.', meaning: 'This is my dad.' } },
  { id: 'starter-0058', zh: '妈妈', pinyin: 'māma', meaning: 'mom', vi: 'mẹ', example: { sentence: '我爱妈妈。', pinyin: 'Wǒ ài māma.', vi: 'Tôi yêu mẹ.', meaning: 'I love my mom.' } },
  { id: 'starter-0059', zh: '哥哥', pinyin: 'gēge', meaning: 'older brother', vi: 'anh trai', example: { sentence: '我哥哥很高。', pinyin: 'Wǒ gēge hěn gāo.', vi: 'Anh trai tôi rất cao.', meaning: 'My older brother is very tall.' } },
  { id: 'starter-0060', zh: '姐姐', pinyin: 'jiějie', meaning: 'older sister', vi: 'chị gái', example: { sentence: '我姐姐是医生。', pinyin: 'Wǒ jiějie shì yīshēng.', vi: 'Chị gái tôi là bác sĩ.', meaning: 'My older sister is a doctor.' } },
  { id: 'starter-0061', zh: '弟弟', pinyin: 'dìdi', meaning: 'younger brother', vi: 'em trai', example: { sentence: '我弟弟五岁。', pinyin: 'Wǒ dìdi wǔ suì.', vi: 'Em trai tôi năm tuổi.', meaning: 'My younger brother is five.' } },
  { id: 'starter-0062', zh: '妹妹', pinyin: 'mèimei', meaning: 'younger sister', vi: 'em gái', example: { sentence: '她是我妹妹。', pinyin: 'Tā shì wǒ mèimei.', vi: 'Cô ấy là em gái tôi.', meaning: 'She is my younger sister.' } },
  { id: 'starter-0063', zh: '朋友', pinyin: 'péngyou', meaning: 'friend', vi: 'bạn bè', example: { sentence: '他是我的好朋友。', pinyin: 'Tā shì wǒ de hǎo péngyou.', vi: 'Anh ấy là bạn tốt của tôi.', meaning: 'He is my good friend.' } },
  { id: 'starter-0064', zh: '老师', pinyin: 'lǎoshī', meaning: 'teacher', vi: 'giáo viên', example: { sentence: '老师好！', pinyin: 'Lǎoshī hǎo!', vi: 'Chào thầy/cô!', meaning: 'Hello, teacher!' } },
  { id: 'starter-0065', zh: '学生', pinyin: 'xuésheng', meaning: 'student', vi: 'học sinh, sinh viên', example: { sentence: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', vi: 'Bạn là học sinh à?', meaning: 'Are you a student?' } },

  // Core verbs
  { id: 'starter-0066', zh: '叫', pinyin: 'jiào', meaning: 'to be called', vi: 'tên là, gọi', example: { sentence: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?', meaning: "What's your name?" } },
  { id: 'starter-0067', zh: '名字', pinyin: 'míngzi', meaning: 'name', vi: 'tên', example: { sentence: '我的名字是安。', pinyin: 'Wǒ de míngzi shì Ān.', vi: 'Tên tôi là An.', meaning: 'My name is An.' } },
  { id: 'starter-0068', zh: '吃', pinyin: 'chī', meaning: 'to eat', vi: 'ăn', example: { sentence: '我吃米饭。', pinyin: 'Wǒ chī mǐfàn.', vi: 'Tôi ăn cơm.', meaning: 'I eat rice.' } },
  { id: 'starter-0069', zh: '喝', pinyin: 'hē', meaning: 'to drink', vi: 'uống', example: { sentence: '你喝水吗？', pinyin: 'Nǐ hē shuǐ ma?', vi: 'Bạn uống nước không?', meaning: 'Do you want water?' } },
  { id: 'starter-0070', zh: '去', pinyin: 'qù', meaning: 'to go', vi: 'đi', example: { sentence: '我去学校。', pinyin: 'Wǒ qù xuéxiào.', vi: 'Tôi đi đến trường.', meaning: 'I go to school.' } },
  { id: 'starter-0071', zh: '来', pinyin: 'lái', meaning: 'to come', vi: 'đến, tới', example: { sentence: '你来我家吧。', pinyin: 'Nǐ lái wǒ jiā ba.', vi: 'Bạn đến nhà tôi đi.', meaning: 'Come to my place.' } },
  { id: 'starter-0072', zh: '看', pinyin: 'kàn', meaning: 'to look, to watch', vi: 'nhìn, xem', example: { sentence: '我看书。', pinyin: 'Wǒ kàn shū.', vi: 'Tôi đọc sách.', meaning: 'I read a book.' } },
  { id: 'starter-0073', zh: '听', pinyin: 'tīng', meaning: 'to listen', vi: 'nghe', example: { sentence: '我听音乐。', pinyin: 'Wǒ tīng yīnyuè.', vi: 'Tôi nghe nhạc.', meaning: 'I listen to music.' } },
  { id: 'starter-0074', zh: '说', pinyin: 'shuō', meaning: 'to speak, to say', vi: 'nói', example: { sentence: '我说汉语。', pinyin: 'Wǒ shuō Hànyǔ.', vi: 'Tôi nói tiếng Trung.', meaning: 'I speak Chinese.' } },
  { id: 'starter-0075', zh: '买', pinyin: 'mǎi', meaning: 'to buy', vi: 'mua', example: { sentence: '我想买这个。', pinyin: 'Wǒ xiǎng mǎi zhège.', vi: 'Tôi muốn mua cái này.', meaning: 'I want to buy this.' } },
  { id: 'starter-0076', zh: '要', pinyin: 'yào', meaning: 'to want (something); to need', vi: 'cần, muốn có (vật gì)', example: { sentence: '我要一杯茶。', pinyin: 'Wǒ yào yì bēi chá.', vi: 'Tôi muốn một cốc trà.', meaning: 'I want a cup of tea.' } },
  { id: 'starter-0077', zh: '想', pinyin: 'xiǎng', meaning: 'would like to (do); to think', vi: 'muốn (làm gì); nghĩ', example: { sentence: '我想去中国。', pinyin: 'Wǒ xiǎng qù Zhōngguó.', vi: 'Tôi muốn đi Trung Quốc.', meaning: 'I want to go to China.' } },
  { id: 'starter-0078', zh: '喜欢', pinyin: 'xǐhuan', meaning: 'to like', vi: 'thích', example: { sentence: '我喜欢你。', pinyin: 'Wǒ xǐhuan nǐ.', vi: 'Tôi thích bạn.', meaning: 'I like you.' } },
  { id: 'starter-0079', zh: '爱', pinyin: 'ài', meaning: 'to love', vi: 'yêu', example: { sentence: '我爱我的家。', pinyin: 'Wǒ ài wǒ de jiā.', vi: 'Tôi yêu gia đình tôi.', meaning: 'I love my family.' } },
  { id: 'starter-0080', zh: '学习', pinyin: 'xuéxí', meaning: 'to study', vi: 'học', example: { sentence: '我学习汉语。', pinyin: 'Wǒ xuéxí Hànyǔ.', vi: 'Tôi học tiếng Trung.', meaning: 'I study Chinese.' } },
  { id: 'starter-0081', zh: '睡觉', pinyin: 'shuìjiào', meaning: 'to sleep', vi: 'ngủ', example: { sentence: '我十点睡觉。', pinyin: 'Wǒ shí diǎn shuìjiào.', vi: 'Tôi đi ngủ lúc mười giờ.', meaning: "I go to bed at ten o'clock." } },
  { id: 'starter-0082', zh: '会', pinyin: 'huì', meaning: 'can (learned skill)', vi: 'biết (làm gì)', example: { sentence: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', vi: 'Tôi biết nói tiếng Trung.', meaning: 'I can speak Chinese.' } },

  // Describing words
  { id: 'starter-0083', zh: '大', pinyin: 'dà', meaning: 'big', vi: 'to, lớn', example: { sentence: '这个苹果很大。', pinyin: 'Zhège píngguǒ hěn dà.', vi: 'Quả táo này rất to.', meaning: 'This apple is very big.' } },
  { id: 'starter-0084', zh: '小', pinyin: 'xiǎo', meaning: 'small', vi: 'nhỏ, bé', example: { sentence: '我的家很小。', pinyin: 'Wǒ de jiā hěn xiǎo.', vi: 'Nhà tôi rất nhỏ.', meaning: 'My home is very small.' } },
  { id: 'starter-0085', zh: '多', pinyin: 'duō', meaning: 'many, much', vi: 'nhiều', example: { sentence: '这里人很多。', pinyin: 'Zhèlǐ rén hěn duō.', vi: 'Ở đây rất đông người.', meaning: 'There are a lot of people here.' } },
  { id: 'starter-0086', zh: '少', pinyin: 'shǎo', meaning: 'few, little', vi: 'ít', example: { sentence: '我的钱很少。', pinyin: 'Wǒ de qián hěn shǎo.', vi: 'Tiền của tôi rất ít.', meaning: 'I have very little money.' } },
  { id: 'starter-0087', zh: '热', pinyin: 'rè', meaning: 'hot', vi: 'nóng', example: { sentence: '今天很热。', pinyin: 'Jīntiān hěn rè.', vi: 'Hôm nay rất nóng.', meaning: 'It is very hot today.' } },
  { id: 'starter-0088', zh: '冷', pinyin: 'lěng', meaning: 'cold', vi: 'lạnh', example: { sentence: '我很冷。', pinyin: 'Wǒ hěn lěng.', vi: 'Tôi rất lạnh.', meaning: 'I am very cold.' } },
  { id: 'starter-0089', zh: '好吃', pinyin: 'hǎochī', meaning: 'delicious', vi: 'ngon', example: { sentence: '这个很好吃！', pinyin: 'Zhège hěn hǎochī!', vi: 'Cái này rất ngon!', meaning: 'This is delicious!' } },

  // Time
  { id: 'starter-0090', zh: '今天', pinyin: 'jīntiān', meaning: 'today', vi: 'hôm nay', example: { sentence: '今天星期一。', pinyin: 'Jīntiān xīngqīyī.', vi: 'Hôm nay là thứ Hai.', meaning: 'Today is Monday.' } },
  { id: 'starter-0091', zh: '明天', pinyin: 'míngtiān', meaning: 'tomorrow', vi: 'ngày mai', example: { sentence: '明天见！', pinyin: 'Míngtiān jiàn!', vi: 'Mai gặp lại!', meaning: 'See you tomorrow!' } },
  { id: 'starter-0092', zh: '昨天', pinyin: 'zuótiān', meaning: 'yesterday', vi: 'hôm qua', example: { sentence: '昨天我很忙。', pinyin: 'Zuótiān wǒ hěn máng.', vi: 'Hôm qua tôi rất bận.', meaning: 'I was very busy yesterday.' } },
  { id: 'starter-0093', zh: '现在', pinyin: 'xiànzài', meaning: 'now', vi: 'bây giờ', example: { sentence: '我现在在家。', pinyin: 'Wǒ xiànzài zài jiā.', vi: 'Bây giờ tôi đang ở nhà.', meaning: "I'm at home now." } },
  { id: 'starter-0094', zh: '点', pinyin: 'diǎn', meaning: "o'clock", vi: 'giờ', example: { sentence: '现在三点。', pinyin: 'Xiànzài sān diǎn.', vi: 'Bây giờ là ba giờ.', meaning: "It's three o'clock." } },

  // Everyday things
  { id: 'starter-0095', zh: '水', pinyin: 'shuǐ', meaning: 'water', vi: 'nước', example: { sentence: '我要喝水。', pinyin: 'Wǒ yào hē shuǐ.', vi: 'Tôi muốn uống nước.', meaning: 'I want to drink water.' } },
  { id: 'starter-0096', zh: '茶', pinyin: 'chá', meaning: 'tea', vi: 'trà', example: { sentence: '我喜欢喝茶。', pinyin: 'Wǒ xǐhuan hē chá.', vi: 'Tôi thích uống trà.', meaning: 'I like drinking tea.' } },
  { id: 'starter-0097', zh: '米饭', pinyin: 'mǐfàn', meaning: 'cooked rice', vi: 'cơm', example: { sentence: '我每天吃米饭。', pinyin: 'Wǒ měitiān chī mǐfàn.', vi: 'Ngày nào tôi cũng ăn cơm.', meaning: 'I eat rice every day.' } },
  { id: 'starter-0098', zh: '钱', pinyin: 'qián', meaning: 'money', vi: 'tiền', example: { sentence: '多少钱？', pinyin: 'Duōshao qián?', vi: 'Bao nhiêu tiền?', meaning: 'How much?' } },
  { id: 'starter-0099', zh: '家', pinyin: 'jiā', meaning: 'home, family', vi: 'nhà, gia đình', example: { sentence: '我回家了。', pinyin: 'Wǒ huí jiā le.', vi: 'Tôi về nhà rồi.', meaning: "I'm home." } },
  { id: 'starter-0100', zh: '书', pinyin: 'shū', meaning: 'book', vi: 'sách', example: { sentence: '这本书很好。', pinyin: 'Zhè běn shū hěn hǎo.', vi: 'Quyển sách này rất hay.', meaning: 'This book is very good.' } },
  { id: 'starter-0101', zh: '中国', pinyin: 'Zhōngguó', meaning: 'China', vi: 'Trung Quốc', example: { sentence: '我爱中国菜。', pinyin: 'Wǒ ài Zhōngguó cài.', vi: 'Tôi thích món ăn Trung Quốc.', meaning: 'I love Chinese food.' } },
  { id: 'starter-0102', zh: '汉语', pinyin: 'Hànyǔ', meaning: 'Chinese language', vi: 'tiếng Trung', example: { sentence: '汉语很有意思。', pinyin: 'Hànyǔ hěn yǒu yìsi.', vi: 'Tiếng Trung rất thú vị.', meaning: 'Chinese is very interesting.' } },
]
