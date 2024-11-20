import { JigeProvider } from 'jige-ui'
import { createSignal } from 'solid-js'

import { render } from 'solid-js/web'
import { EditorMain, EditorProvider } from '.'

import 'virtual:uno.css'

// 暴露给原生js使用，这里其实也就是对MdEditor的原生化封装
export function Editor(config: { target: HTMLElement }) {
  if (!config.target)
    return {}

  const [content, setContent] = createSignal('hello world')

  render(
    () => (
      <JigeProvider>
        <div>{content()}</div>
        <EditorProvider
          content={content()}
          setContent={setContent}
        >
          <EditorMain
            class="test"
          />
        </EditorProvider>
      </JigeProvider>
    ),
    config.target,
  )
  return {}
}
