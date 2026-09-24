import { Text } from 'react-email'
import type { SpamResult } from '@/domain/spam-check'

const percent = (value: number) => `${Math.round(value * 100)}%`

export function SpamCheckInfo({ spamCheck }: { spamCheck?: SpamResult }) {
  if (!spamCheck) return null

  return (
    <Text style={style}>
      <b>Spam-Check (Jev): </b>
      {spamCheck.scores
        ? `${spamCheck.spam ? 'Spam' : 'kein Spam'} (Zufallstext ${percent(spamCheck.scores.gibberish)}, Bot ${percent(spamCheck.scores.bot)})`
        : 'nicht durchgeführt'}
    </Text>
  )
}

const style = {
  margin: '30px 0 0',
  fontSize: '13px',
  lineHeight: '1.4',
  color: '#8a8f98',
}
