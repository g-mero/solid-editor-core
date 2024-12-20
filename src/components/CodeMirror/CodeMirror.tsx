import type { LanguageSupport } from '@codemirror/language'
import type { Extension } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { Compartment } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { EditorView, minimalSetup } from 'codemirror'
import { createEffect, onMount } from 'solid-js'
import { watch } from 'solid-uses'
import { basicLight } from '../../themes'

export function CodeMirror(props: {
  setcm: (cm: EditorView) => void
  content: string
  setContent: (content: string) => void
  language?: LanguageSupport
  theme?: Extension
  height?: string
  width?: string
  class?: string
}) {
  let ref!: HTMLDivElement

  const themeConfig = new Compartment()

  onMount(() => {
    // The Markdown parser will dynamically load parsers
    // for code blocks, using @codemirror/language-data to
    // look up the appropriate dynamic import.
    const view = new EditorView({
      doc: '',
      extensions: [
        minimalSetup,
        EditorView.lineWrapping,
        keymap.of([]),
        markdown({ codeLanguages: languages }),
        // eslint-disable-next-line solid/reactivity
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            props.setContent(update.state.doc.toString())
          }
        }),
        themeConfig.of(basicLight),
      ],
      parent: ref,
    })

    createEffect(() => {
      view.dom.style.height = props.height || '100%'
      view.dom.style.width = props.width || '100%'
    })

    watch([() => props.setcm], () => {
      props.setcm(view)
    })

    watch([() => props.theme], () => {
      view.dispatch({
        effects: themeConfig.reconfigure(props.theme || basicLight),
      })
    })

    createEffect(() => {
      if (props.content === view.state.doc.toString())
        return

      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: props.content },
      })
    })
  })

  return (
    <div
      class={props.class}
      ref={ref}
    />
  )
}
