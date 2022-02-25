import { isRecord } from './isRecord.js'

declare let self: ServiceWorkerGlobalScope

const styles = [
  `background: orange`,
  `border-radius: 0.5em`,
  `color: white`,
  `font-weight: bold`,
  `padding: 2px 0.5em`,
]

let VERSION = ''
let LOG_PREFIX = [`%cPWA-Toolkit`, styles.join(';')]

export type GroupMessage = {
  label: string
  messages: Array<GroupMessage | string>
}

export function setVersion(version: string): void {
  VERSION = version
  LOG_PREFIX = [`%cPWA-Toolkit sw version ${VERSION}`, styles.join(';')]
}

export function log(...data: any[]): void {
  if (!('__ENABLE_PWA_TOOLKIT_LOGGING' in self)) {
    self.__ENABLE_PWA_TOOLKIT_LOGGING = false
  }
  if (!self.__ENABLE_PWA_TOOLKIT_LOGGING) return

  if (isGroupMessage(data[0])) {
    _logGroup(true, data[0])
  } else {
    console.log(...LOG_PREFIX, ...data)
  }
}

function _logGroup(usePrefix: boolean, groupMessage: GroupMessage): void {
  const prefix = usePrefix ? LOG_PREFIX : []
  console.groupCollapsed(...prefix, groupMessage.label)
  for (const message of groupMessage.messages) {
    if (isGroupMessage(message)) {
      _logGroup(false, message)
    } else {
      console.log(message)
    }
  }
  console.groupEnd()
}

function isGroupMessage(message: unknown): message is GroupMessage {
  return (
    isRecord(message) &&
    typeof message.label === 'string' &&
    Array.isArray(message.messages)
  )
}
