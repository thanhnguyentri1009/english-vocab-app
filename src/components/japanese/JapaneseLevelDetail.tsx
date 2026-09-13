import { useMemo, useState } from 'react'
import { Button, Empty, Input, List, Modal, Progress, Segmented, Space, Typography } from 'antd'
import { LeftOutlined, ReloadOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { JapaneseWord } from '../../data/japanese/types'
import type { LevelInfo } from '../../data/english/vocabulary/topics'

const { Title, Text } = Typography

const BATCH_SIZE_OPTIONS = [3, 6, 10]

interface JapaneseLevelDetailProps {
  level: LevelInfo
  pool: JapaneseWord[]
  learnedWords: string[]
  batchSize: number
  onChangeBatchSize: (size: number) => void
  onContinue: () => void
  onReview: () => void
  onBack: () => void
}

export default function JapaneseLevelDetail({
  level,
  pool,
  learnedWords,
  batchSize,
  onChangeBatchSize,
  onContinue,
  onReview,
  onBack,
}: JapaneseLevelDetailProps) {
  const { t } = useTranslation()
  const [showLearned, setShowLearned] = useState(false)
  const [searchText, setSearchText] = useState('')
  const learnedSet = new Set(learnedWords)
  const learnedEntries = pool.filter((w) => learnedSet.has(w.id))
  const hasProgress = learnedEntries.length > 0
  const isComplete = pool.length > 0 && learnedEntries.length >= pool.length

  const filteredLearnedEntries = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    if (!query) return learnedEntries
    return learnedEntries.filter(
      (w) =>
        w.jp.toLowerCase().includes(query) ||
        w.reading.toLowerCase().includes(query) ||
        w.romaji.toLowerCase().includes(query) ||
        w.meaning.toLowerCase().includes(query),
    )
  }, [learnedEntries, searchText])

  return (
    <div style={{ padding: '24px 16px', maxWidth: 640, margin: '0 auto' }}>
      <Button
        type="text"
        onClick={onBack}
        style={{ paddingLeft: 4, paddingRight: 4, marginBottom: 16 }}
      >
        <LeftOutlined /> {t('japanese.levelDetail.allLevels')}
      </Button>

      <Title
        level={2}
        style={{ margin: 0, color: level.accent, fontSize: 'clamp(24px, 7vw, 32px)' }}
      >
        {level.title} · {level.subtitle}
      </Title>
      <Text style={{ color: '#8a97a3' }}>
        {t('japanese.levelDetail.wordsLearned', { learned: learnedEntries.length, total: pool.length })}
      </Text>
      <Progress
        percent={pool.length ? (learnedEntries.length / pool.length) * 100 : 0}
        showInfo={false}
        strokeColor={level.accent}
        style={{ margin: '12px 0 24px' }}
      />

      {isComplete ? (
        <Text style={{ display: 'block', textAlign: 'center', color: level.accent, marginBottom: 16 }}>
          {t('japanese.levelDetail.completeMessage')}
        </Text>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <Text style={{ display: 'block', color: '#8a97a3', marginBottom: 8 }}>
            {t('japanese.levelDetail.wordsPerRound')}
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
        {hasProgress ? t('japanese.levelDetail.continueLearning') : t('japanese.levelDetail.startLearning')}
      </Button>

      <Button
        shape="round"
        block
        icon={<ReloadOutlined />}
        disabled={!hasProgress}
        onClick={onReview}
        style={{ marginBottom: 12 }}
      >
        {t('japanese.levelDetail.reviewLearned')}
      </Button>

      <Button
        shape="round"
        block
        icon={<UnorderedListOutlined />}
        disabled={!hasProgress}
        onClick={() => setShowLearned(true)}
      >
        {t('japanese.levelDetail.viewLearnedWords', { count: learnedEntries.length })}
      </Button>

      <Modal
        title={t('japanese.levelDetail.modalTitle', { title: level.title })}
        open={showLearned}
        onCancel={() => {
          setShowLearned(false)
          setSearchText('')
        }}
        footer={null}
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
      >
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: '#8a97a3' }} />}
          placeholder={t('japanese.levelDetail.searchPlaceholder')}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        {filteredLearnedEntries.length === 0 ? (
          <Empty description={t('japanese.levelDetail.noSearchResults')} />
        ) : (
          <List
            size="small"
            dataSource={filteredLearnedEntries}
            pagination={{ defaultPageSize: 10, size: 'small', align: 'center' }}
            renderItem={(word) => (
              <List.Item>
                <Space style={{ justifyContent: 'space-between', width: '100%' }} wrap>
                  <Text strong>
                    {word.jp} <Text type="secondary">{word.reading}</Text>
                  </Text>
                  <Text style={{ color: '#8a97a3' }}>{word.meaning}</Text>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  )
}
