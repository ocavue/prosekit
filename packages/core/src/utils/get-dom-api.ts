import { DOMDocumentNotFoundError } from '../error'

function findGlobalBrowserDocument() {
  if (typeof document !== 'undefined') {
    return document
  }

  if (typeof globalThis !== 'undefined' && globalThis.document) {
    return globalThis.document
  }
}

function findGlobalBrowserWindow() {
  if (typeof window !== 'undefined') {
    return window
  }

  if (typeof globalThis !== 'undefined' && globalThis.window) {
    return globalThis.window
  }
}

export function findBrowserDocument(options?: { document?: Document }) {
  return (
    options?.document ??
    findGlobalBrowserDocument() ??
    findGlobalBrowserWindow()?.document
  )
}

export function findBrowserWindow(options?: { document?: Document }) {
  return (
    options?.document?.defaultView ??
    findGlobalBrowserWindow() ??
    findBrowserDocument(options)?.defaultView
  )
}

export function getBrowserDocument(options?: { document?: Document }) {
  const doc = findBrowserDocument(options)
  if (doc) return doc
  throw new DOMDocumentNotFoundError()
}

export function getBrowserWindow(options?: { document?: Document }) {
  const win = findBrowserWindow(options)
  if (win) return win
  throw new DOMDocumentNotFoundError()
}
