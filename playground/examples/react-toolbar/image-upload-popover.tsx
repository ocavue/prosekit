import { useEditor } from 'prosekit/react'
import { Popover } from 'prosekit/react/popover'
import { useState, type FC, type ReactNode } from 'react'

import type { EditorExtension } from './extension'

export const ImageUploadPopover: FC<{
  open: boolean
  onClose: VoidFunction
  children: ReactNode
}> = ({ open, onClose, children }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl

  const editor = useEditor<EditorExtension>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      setObjectUrl(URL.createObjectURL(file))
      setWebUrl('')
    } else {
      setObjectUrl('')
    }
  }

  const handleWebUrlChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const url = event.target.value

    if (url) {
      setWebUrl(url)
      setObjectUrl('')
    } else {
      setWebUrl('')
    }
  }

  const handleClose = () => {
    setWebUrl('')
    setObjectUrl('')
    onClose()
  }

  const handleSubmit = () => {
    editor.commands.insertImage({ src: url })
    setTimeout(handleClose, 100)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  return (
    <>
      <div ref={setAnchorElement}>{children}</div>

      <Popover
        reference={anchorElement ?? undefined}
        open={open}
        onOpenChange={handleOpenChange}
        className="IMAGE_UPLOAD_CARD"
      >
        {objectUrl ? null : (
          <>
            <label>Embed Link</label>
            <input
              className="IMAGE_UPLOAD_INPUT"
              placeholder="Paste the image link..."
              type="url"
              onChange={handleWebUrlChange}
            />
          </>
        )}

        {webUrl ? null : (
          <>
            <label>Upload</label>
            <input
              className="IMAGE_UPLOAD_INPUT"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}

        {url ? (
          <button className="IMAGE_UPLOAD_BUTTON" onClick={handleSubmit}>
            Insert Image
          </button>
        ) : null}
      </Popover>
    </>
  )
}
