import React, { useState, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { DebounceInput } from 'react-debounce-input'
import CopyIcon from './copy-regular.svg'
import RedoIcon from './redo-solid.svg'
import GithubIcon from './github-brands.svg'
import { signInAnonymously } from 'services'

interface Props {}

const App: React.FunctionComponent<Props> = () => {
  const localValue = localStorage.getItem('anythink')
  const [anythink, setAnythink] = useState<string>(localValue || '')
  useEffect(() => {
    signInAnonymously()
  }, [])
  return (
    <>
      <DebounceInput
        element="textarea"
        placeholder="아무 생각..."
        autoFocus
        debounceTimeout={2000}
        value={anythink}
        spellCheck={false}
        forceNotifyByEnter={false}
        onChange={(e) => localStorage.setItem('anythink', e.target.value)}
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
