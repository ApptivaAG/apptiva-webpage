import { PortableText } from '@portabletext/react'
import { SettingsData } from '../hero/types'

export default async function SettingsText(props: {
  text: SettingsData['text'] | undefined
}) {
  return (
    <div className="content">
      <div className="space-y-20">
        <div className={'flex flex-col flex-wrap gap-x-32 gap-y-8'}>
          {props.text && (
            <div className="flex-1">
              <PortableText value={props.text} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
