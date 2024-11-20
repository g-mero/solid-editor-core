import type { Extension } from '@codemirror/state'
import { CodeMirror } from '@/components/CodeMirror'
import { context } from '@/context'

export function EditorMain(props: {
  width?: string
  height?: string
  theme?: Extension
  class?: string
}) {
  const [state, actions] = context.useContext()

  return (
    <CodeMirror
      theme={props.theme}
      height={props.height}
      width={props.width}
      setcm={actions.setCm}
      content={state.content}
      class={props.class}
      setContent={(c) => {
        actions.setContent(c)
      }}
    />
  )
}
