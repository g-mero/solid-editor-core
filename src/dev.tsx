
import { createSignal } from 'solid-js'

import { render } from 'solid-js/web'
import { EditorMain, EditorProvider } from '.'

// 暴露给原生js使用，这里其实也就是对MdEditor的原生化封装
export function Editor(config: { target: HTMLElement }) {
  if (!config.target)
    return {}

  const [content, setContent] = createSignal('hello world')

  render(
    () => (
      <>
        <div>{content()}</div>
        <EditorProvider
          content={content()}
          setContent={setContent}
        >
          <EditorMain
            class="test"
          />
        </EditorProvider>
      </>
    ),
    config.target,
  )
  return {}
}
