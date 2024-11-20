import type { EditorView } from 'codemirror'
import { createComponentState, watch } from 'solid-uses'

const context = createComponentState({
  state: () => ({
    content: '',
    cm: null as EditorView | null,
  }),
})

export function Provider(props: { children: any, class?: string, content: string, setContent: (c: string) => void }) {
  const Context = context.initial()
  const [state, actions] = Context.value

  watch(() => props.content, (c) => {
    actions.setContent(c)
  })

  watch(() => state.content, (c) => {
    props.setContent(c)
  })

  return (
    <Context.Provider>
      <div class={props.class}>
        {props.children}
      </div>
    </Context.Provider>
  )
}

export { context }
