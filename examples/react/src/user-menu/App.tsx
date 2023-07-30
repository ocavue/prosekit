import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import TagMenu from './TagMenu'
import UserMenu from './UserMenu'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    const extension = addExampleExtension()
    return createEditor({ extension })
  }, [])

  return (
    <>
      <ProseKit editor={editor}>
        <div ref={editor.mount} className="example-editor"></div>
        <UserMenu />
        <TagMenu />
      </ProseKit>
    </>
  )
}
