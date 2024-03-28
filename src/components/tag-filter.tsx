'use client'
import { Tag } from '@/utils/types'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useTransition } from 'react'

interface Props {
  tags: Tag[]
  searchParams: { [key: string]: string | string[] | undefined }
}

export const TagFilter = ({ tags, searchParams }: Props) => {
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

  const createQueryString = (name: string, value: string, checked: boolean) => {
    const url = new URL(window.location.href)
    checked
      ? url.searchParams.append(name, value)
      : url.searchParams.delete(name, value)

    return url.toString()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target

    startTransition(() =>
      replace(createQueryString(name, value, checked), {
        scroll: false,
      })
    )
  }

  return (
    <ul id="filters" className="flex gap-2">
      {tags.map((tag) => (
        <li key={tag.name}>
          <input
            type="checkbox"
            name="tag"
            value={tag.name}
            defaultChecked={searchParams['tag']?.includes(tag.name)}
            id={tag.name}
            onChange={handleInputChange}
          />
          <label htmlFor={tag.name}>{tag.name}</label>
        </li>
      ))}
    </ul>
  )
}
