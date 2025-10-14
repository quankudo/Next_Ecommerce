import { Editor, EditorContent, useEditorState } from '@tiptap/react'
import React, { useCallback } from 'react'

interface LinkTipTapProps {
  editor: Editor
  btnStyle: (active: boolean) => string
}

const TipTapLink: React.FC<LinkTipTapProps> = ({ editor, btnStyle }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch {
      alert('error')
    }
  }, [editor])

  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isLink: ctx.editor.isActive('link'),
    }),
  })

  if (!editor) return null

  return (
    <>
      <div className="control-group">
        <div className="button-group flex gap-2">
          <button
            onClick={setLink}
            className={`px-2 py-1 rounded ${btnStyle(editorState.isLink)}`}
          >
            Set link
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editorState.isLink}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Unset link
          </button>
        </div>
      </div>
    </>
  )
}

export default TipTapLink
