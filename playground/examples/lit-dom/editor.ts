import 'prosekit/basic/style.css'

import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { createEditor, type Editor, type NodeJSON } from 'prosekit/core'

import { defineRootExtension, type RootExtension } from './extension'

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  @state()
  editor?: Editor<RootExtension>

  @property({ type: Object, attribute: false })
  defaultDoc?: NodeJSON

  private editorRef: Ref<HTMLDivElement> = createRef()

  protected firstUpdated(): void {
    if (!this.editor) {
      const extension = defineRootExtension()
      this.editor = createEditor({
        extension,
        defaultDoc: this.defaultDoc || defaultDoc,
      })
    }

    this.editor.mount(this.editorRef.value)
  }

  render() {
    return html`
      <div class="EDITOR_VIEWPORT">
        <div class="EDITOR_DOCUMENT">
          <div class="EDITOR_CONTENT" ${ref(this.editorRef)}></div>
        </div>
      </div>
    `
  }
}

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Image',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x80',
      },
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Code Block',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'python',
      },
      content: [
        {
          type: 'text',
          text: 'if __name__ == "__main__":\n    print("hello world!")\n\n'.repeat(
            20,
          ),
        },
      ],
    },
  ],
}
