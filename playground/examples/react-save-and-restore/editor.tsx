import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'

import EventHandlers from './event-handlers'

export default function Editor() {
  const [key, setKey] = useState(1)
  const [defaultDoc, setDefaultDoc] = useState<string | undefined>()
  const [records, setRecords] = useState<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)

  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({
      extension,
      defaultDoc: defaultDoc && JSON.parse(defaultDoc),
    })
  }, [key, defaultDoc])

  const onDocChange = useCallback(() => {
    setHasUnsavedChange(true)
  }, [])

  const onSave = useCallback(() => {
    const doc = JSON.stringify(jsonFromNode(editor.view.state.doc))
    setRecords((records) => [...records, doc])
    setHasUnsavedChange(false)
  }, [editor])

  const onLoad = useCallback(
    (record: string) => {
      setDefaultDoc(record)
      setKey((key) => key + 1)
      setHasUnsavedChange(false)
    },
    [records],
  )

  return (
    <ProseKit editor={editor}>
      <div>
        <button
          onClick={onSave}
          disabled={!hasUnsavedChange}
          className="my-2 border border-solid bg-white p-2 text-black disabled:cursor-not-allowed disabled:text-gray-500"
        >
          Save{hasUnsavedChange ? '' : ' - No Changes'}
        </button>
        <ul>
          {records.map((record, index) => (
            <li key={index} className="my-2 flex gap-2">
              <button
                className="border border-solid bg-white p-2 text-black disabled:text-gray-500"
                onClick={() => onLoad(record)}
              >
                Load
              </button>
              <span className="flex-1 overflow-x-scroll p-2">
                <pre>{record}</pre>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="EDITOR_VIEWPORT">
        <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        <EventHandlers onUpdate={onDocChange} />
      </div>
    </ProseKit>
  )
}
