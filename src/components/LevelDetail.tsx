import { useState } from 'react'
import { Button, List, Modal, Progress, Segmented, Space, Typography } from 'antd'
import { LeftOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { VocabularyWord } from '../data/vocabulary'
import type { LevelInfo } from '../data/vocabulary/topics'

const { Title, Text } = Typography

const BATCH_SIZE_OPTIONS = [3, 6, 10]

interface LevelDetailProps {
  level: LevelInfo
  pool: VocabularyWord[]
  learnedWords: string[]
  batchSize: number
  onChangeBatchSize: (size: number) => void
  onContinue: () => void
  onBack: () => void
}

export default function LevelDetail({
  level,
  pool,
  learnedWords,
  batchSize,
  onChangeBatchSize,
  onContinue,
  onBack,
}: LevelDetailProps) {
  const [showLearned, setShowLearned] = useState(false)
  const learnedSet = new Set(learnedWords)
  const learnedEntries = pool.filter((w) => learnedSet.has(w.en))
  const hasProgress = learnedEntries.length > 0
  const isComplete = pool.length > 0 && learnedEntries.length >= pool.length

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

      {isComplete ? (
        <Text style={{ display: 'block', textAlign: 'center', color: level.accent, marginBottom: 16 }}>
          🎉 You've learned every word in this level!
        </Text>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <Text style={{ display: 'block', color: '#8a97a3', marginBottom: 8 }}>
            Words per round
          </Text>
          <Segmented
            block
            value={batchSize}
            onChange={(value) => onChangeBatchSize(value as number)}
            options={BATCH_SIZE_OPTIONS}
          />
        </div>
      )}

      <Button
        type="primary"
        shape="round"
        block
        disabled={isComplete}
        onClick={onContinue}
        style={{ background: level.accent, borderColor: level.accent, marginBottom: 12 }}
      >
        {hasProgress ? 'Continue learning' : 'Start learning'}
      </Button>

      <Button
        shape="round"
        block
        icon={<UnorderedListOutlined />}
        disabled={!hasProgress}
        onClick={() => setShowLearned(true)}
      >
        View learned words ({learnedEntries.length})
      </Button>

      <Modal
        title={`Words you've learned — ${level.title}`}
        open={showLearned}
        onCancel={() => setShowLearned(false)}
        footer={null}
      >
        <List
          size="small"
          dataSource={learnedEntries}
          pagination={{ pageSize: 10, size: 'small', align: 'center' }}
          renderItem={(word) => (
            <List.Item>
              <Space style={{ justifyContent: 'space-between', width: '100%' }} wrap>
                <Text strong>{word.en}</Text>
                <Text style={{ color: '#8a97a3' }}>{word.vi}</Text>
              </Space>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}
