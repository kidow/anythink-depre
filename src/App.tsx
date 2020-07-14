import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { DebounceInput } from 'react-debounce-input'
import { signInAnonymously } from 'services'
import * as Sentry from '@sentry/browser'
import { BrowserOptions } from '@sentry/browser'
import { captureException } from 'services'
import { FaGithub, FaRedo, FaCopy } from 'react-icons/fa'

let options: BrowserOptions = {
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  maxBreadcrumbs: 50,
  attachStacktrace: true
}

if (process.env.NODE_ENV !== 'production') {
  options.beforeSend = () => null
  options.integrations = (int) =>
    int.filter(({ name }) => name !== 'Breadcrumbs')
}

Sentry.init(options)

interface State {
  hasError: boolean
  errorEventId: string
  anythink: string
}
interface Props {}

class App extends Component<Props, State> {
  state = {
    hasError: false,
    errorEventId: '',
    anythink: localStorage.getItem('anythink') || ''
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      hasError: state.hasError || false,
      errorEventId: state.errorEventId || undefined
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err: Error, { componentStack }: React.ErrorInfo) {
    captureException({
      err,
      type: 'componentDidCatch',
      message: componentStack
    })
    if (err) this.setState({ hasError: true })
  }

  componentDidMount() {
    signInAnonymously()
  }

  render() {
    const { anythink } = this.state
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
        <FaGithub
          className="github"
          onClick={() => window.open('https://github.com/kidow/anythink')}
        />
        <CopyToClipboard text={anythink}>
          <FaCopy className="clipboard" />
        </CopyToClipboard>
        <FaRedo
          className="redo"
          onClick={() => this.setState({ anythink: '' })}
        />
      </>
    )
  }
}

export default App
