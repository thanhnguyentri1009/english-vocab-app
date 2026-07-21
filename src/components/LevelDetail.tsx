import { Button, List, Progress, Space, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import type { LevelInfo, VocabularyWord } from '../data/vocabulary'

const { Title, Text } = Typography

interface LevelDetailProps {
  level: LevelInfo
  pool: VocabularyWord[]
  learnedWords: string[]
  onContinue: () => void
  onBack: () => void
}

export default function LevelDetail({
  level,
  pool,
  learnedWords,
  onContinue,
  onBack,
}: LevelDetailProps) {
  const learnedSet = new Set(learnedWords)
  const learnedEntries = pool.filter((w) => learnedSet.has(w.en))
  const hasProgress = learnedEntries.length > 0

  return (
    <div style={{ padding: '24px 16px', maxWidth: 640, margin: '0 auto' }}>
      <Button
        type="text"
        onClick={onBack}
        style={{ paddingLeft: 4, paddingRight: 4, marginBottom: 16 }}
      >
        <LeftOutlined /> All levels
      </Button>

      <Title
        level={2}
        style={{ margin: 0, color: level.accent, fontSize: 'clamp(24px, 7vw, 32px)' }}
      >
        {level.title} · {level.subtitle}
      </Title>
      <Text style={{ color: '#8a97a3' }}>
        {learnedEntries.length} / {pool.length} words learned
      </Text>
      <Progress
        percent={pool.length ? (learnedEntries.length / pool.length) * 100 : 0}
        showInfo={false}
        strokeColor={level.accent}
        style={{ margin: '12px 0 24px' }}
      />

      <Button
        type="primary"
        shape="round"
        block
        onClick={onContinue}
        style={{ background: level.accent, borderColor: level.accent, marginBottom: 24 }}
      >
        {hasProgress ? 'Continue learning' : 'Start learning'}
      </Button>

      <Title level={4} style={{ color: '#5b6b7a', marginBottom: 12 }}>
        Words you've learned
      </Title>
      {hasProgress ? (
        <List
          size="small"
          dataSource={learnedEntries}
          style={{
            maxHeight: 340,
            overflowY: 'auto',
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e9ed',
            padding: '4px 16px',
          }}
          renderItem={(word) => (
            <List.Item>
              <Space style={{ justifyContent: 'space-between', width: '100%' }} wrap>
                <Text strong>{word.en}</Text>
                <Text style={{ color: '#8a97a3' }}>{word.vi}</Text>
              </Space>
            </List.Item>
          )}
        />
      ) : (
        <Text style={{ color: '#a3adb6' }}>
          You haven't learned any words at this level yet — start now!
        </Text>
      )}
    </div>
  )
}
