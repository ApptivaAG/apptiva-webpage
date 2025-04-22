import { Switch } from '@sanity/ui'
import { BooleanInputProps, set } from 'sanity'

const StatusSwitch = ({ value, onChange }: BooleanInputProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <span
      style={{
        display: 'block',
        fontSize: '0.8125rem',
        paddingBlock: '0.5rem',
      }}
    >
      Status
    </span>
    <label style={{ display: 'flex', gap: '1rem', paddingLeft: '0.5rem' }}>
      <Switch
        checked={value}
        color="primary"
        name="active"
        onChange={() => onChange(set(!value))}
      />
      <span style={{ fontSize: '0.8125rem' }}>
        {value ? 'aktiv' : 'inaktiv'}
      </span>
    </label>
  </div>
)

export default StatusSwitch
