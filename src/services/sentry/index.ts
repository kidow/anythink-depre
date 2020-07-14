import * as Sentry from '@sentry/browser'
import moment from 'moment'

interface ISentry {
  type: string
  status?: number
  message?: string
  data?: any
  params?: any
  err?: any
}

export default async (payload: ISentry) => {
  const { type, status, message, data, params, err } = payload
  try {
    Sentry.configureScope((scope) => {
      scope.setExtra('type', type)
      if (data) scope.setExtra('req.body', data)
      if (params) scope.setExtra('req.query', params)
      if (message) scope.setFingerprint([err.message])
      if (status) scope.setExtra('status', status)
      scope.setExtra('url', window.location.pathname)
      scope.setExtra('date', moment().format('YYYY년 MM월 DD일 HH:mm:ss'))
    })
    Sentry.captureException(err)
  } catch (error) {
    console.log('Sentry err: ', error)
  }
}
