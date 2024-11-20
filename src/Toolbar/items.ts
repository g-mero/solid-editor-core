import type { EditorView } from 'codemirror'
import { redo, undo } from '@codemirror/commands'

export type Action = (cm: EditorView) => void

export const emptyAction: Action = (cm) => {
  cm.dispatch({ changes: { from: 0, to: cm.state.doc.length, insert: '' } })
}
export const undoAction: Action = undo
export const redoAction: Action = redo
