/**
 * @author allen(https://github.com/Chryseis)
 * Page Info
 * host
 * hostname
 * href
 * protocol
 * origin
 * port
 * pathname
 * search
 * hash
 * */
import { IMetrics, IPageInformation, IReportHandler } from '../types'
import { metricsName } from '../constants'
import metricsStore from '../lib/store'

const getPageInfo = (): IPageInformation => {
  if (!location) {
    console.error('browser do not support location')
    return
  }

  const { host, hostname, href, protocol, origin, port, pathname, search, hash } = location

  return {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    userAgent: 'userAgent' in navigator ? navigator.userAgent : ''
  }
}

/**
 * @param {metricsStore} store
 * @param {Function} report
 * @param {boolean} immediately, if immediately is true,data will report immediately
 * */
export const initPageInfo = (store: metricsStore, report: IReportHandler, immediately = true): void => {
  const pageInfo: IPageInformation = getPageInfo()

  const metrics = { name: metricsName.PI, value: pageInfo } as IMetrics

  if (immediately) {
    report(metrics)
  }

  store.set(metricsName.PI, metrics)
}
