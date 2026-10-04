import { useMemo, useState, type ReactNode } from 'react'
import { Button, Empty, Input, Modal, Progress, Segmented } from 'antd'
import {
  ArrowRightOutlined,
  ReloadOutlined,
  SearchOutlined,
  SoundOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import PageHeader from '../PageHeader'
import { COLORS } from '../../theme'

const BATCH_SIZE_OPTIONS = [3, 6, 10]
const PAGE = 60

export interface OverviewWord {
  key: string
  primary: ReactNode
  reading?: ReactNode
  meaning: ReactNode
  lang?: string
}

interface LevelOverviewProps<T> {
  level: { title: string; subtitle: string }
  pool: T[]
  learnedKeys: string[]
  getKey: (word: T) => string
  matches: (word: T, query: string) => boolean
  describe: (word: T) => OverviewWord
  onSpeak: (word: T) => void
  // Prefix for the track's translation keys: '' (English), 'japanese.', 'chinese.'.
  i18nPrefix: string
  batchSize: number
  onChangeBatchSize: (size: number) => void
  onContinue: () => void
  onReview: () => void
  onBack: () => void
}

export default function LevelOverview<T>({
  level,
  pool,
  learnedKeys,
  getKey,
  matches,
  describe,
  onSpeak,
  i18nPrefix,
  batchSize,
  onChangeBatchSize,
  onContinue,
  onReview,
  onBack,
}: LevelOverviewProps<T>) {
  const { t, i18n } = useTranslation()
  const k = (key: string, opts?: Record<string, unknown>) => t(`${i18nPrefix}levelDetail.${key}`, opts)
  const nf = new Intl.NumberFormat(i18n.language)
  const [showLearned, setShowLearned] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(PAGE)

  const learnedEntries = useMemo(() => {
    const set = new Set(learnedKeys)
    return pool.filter((w) => set.has(getKey(w)))
  }, [pool, learnedKeys, getKey])
  const hasProgress = learnedEntries.length > 0
  const isComplete = pool.length > 0 && learnedEntries.length >= pool.length
  const percent = pool.length ? Math.round((learnedEntries.length / pool.length) * 100) : 0

  const filtered = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    return query ? learnedEntries.filter((w) => matches(w, query)) : learnedEntries
  }, [learnedEntries, searchText, matches])

  return (
    <div className="page">
      <PageHeader
        title={level.title}
        eyebrow={level.subtitle}
        backLabel={k('allLevels')}
        onBack={onBack}
      />

      <section className="level-hero">
        <Progress
          type="circle"
          percent={percent}
          size={96}
          strokeWidth={8}
          strokeColor={isComplete ? COLORS.success : COLORS.ink}
          railColor={COLORS.line}
          format={(p) => <span style={{ fontSize: 20, fontWeight: 600, color: COLORS.ink }}>{p}%</span>}
        />
        <div className="level-hero-stats">
          <div className="stat-big">
            {nf.format(learnedEntries.length)}
            <small> / {nf.format(pool.length)}</small>
          </div>
          <div className="stat-caption">{t('common.wordsLearnedCaption')}</div>
        </div>
      </section>

      {isComplete ? (
        <div className="complete-note">{k('completeMessage')}</div>
      ) : (
        <section className="panel">
          <span className="section-label">{k('wordsPerRound')}</span>
          <Segmented
            block
            value={batchSize}
            onChange={(value) => onChangeBatchSize(value as number)}
            options={BATCH_SIZE_OPTIONS}
          />
        </section>
      )}

      <div className="level-actions">
        <Button type="primary" size="large" block disabled={isComplete} onClick={onContinue}>
          {hasProgress ? k('continueLearning') : k('startLearning')} <ArrowRightOutlined />
        </Button>
        <div className="level-actions-row">
          <Button size="large" icon={<ReloadOutlined />} disabled={!hasProgress} onClick={onReview}>
            {k('reviewLearned')}
          </Button>
          <Button
            size="large"
            icon={<UnorderedListOutlined />}
            disabled={!hasProgress}
            onClick={() => setShowLearned(true)}
          >
            {k('viewLearnedWords', { count: learnedEntries.length })}
          </Button>
        </div>
      </div>

      <Modal
        title={k('modalTitle', { title: level.title })}
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
          size="large"
          prefix={<SearchOutlined style={{ color: COLORS.subtle }} />}
          placeholder={k('searchPlaceholder')}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
            setVisible(PAGE)
          }}
          style={{ margin: '8px 0 12px' }}
        />
        {filtered.length === 0 ? (
          <Empty description={k('noSearchResults')} />
        ) : (
          <div className="list" style={{ boxShadow: 'none' }}>
            {filtered.slice(0, visible).map((word) => {
              const d = describe(word)
              return (
                <div key={d.key} className="missed-row" style={{ alignItems: 'center', padding: '10px 12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <Button
                      type="text"
                      size="small"
                      shape="circle"
                      icon={<SoundOutlined />}
                      onClick={() => onSpeak(word)}
                      aria-label="Play"
                    />
                    <span style={{ minWidth: 0 }}>
                      <strong lang={d.lang}>{d.primary}</strong>
                      {d.reading && (
                        <span style={{ marginLeft: 8, color: 'var(--muted)' }}>{d.reading}</span>
                      )}
                    </span>
                  </span>
                  <span style={{ color: 'var(--muted)', textAlign: 'right' }}>{d.meaning}</span>
                </div>
              )
            })}
          </div>
        )}
        {filtered.length > visible && (
          <Button block type="text" onClick={() => setVisible((v) => v + PAGE)} style={{ marginTop: 8 }}>
            {t('common.showMore', { count: filtered.length - visible })}
          </Button>
        )}
      </Modal>
    </div>
  )
}
