import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import CopyIcon from './copy-regular.svg'
import RedoIcon from './redo-solid.svg'
import GithubIcon from './github-brands.svg'

interface Props {}

const App: React.FunctionComponent<Props> = () => {
  const localValue = localStorage.getItem('anythink')
  const [anythink, setAnythink] = useState<string>(localValue || '')
  return (
    <>
      <textarea
        placeholder="아무 생각..."
        autoFocus
        value={anythink}
        onChange={(e) => setAnythink(e.target.value)}
        autoCapitalize="off"
        autoComplete="off"
      />
      <img
        src={GithubIcon}
        alt="github"
        className="github"
        onClick={() => window.open('https://github.com/kidow/anythink')}
      />
      <CopyToClipboard text={anythink}>
        <img src={CopyIcon} alt="clipboard" className="clipboard" />
      </CopyToClipboard>
      <img
        src={RedoIcon}
        alt="redo"
        className="redo"
        onClick={() => setAnythink('')}
      />
    </>
  )
}

export default App
