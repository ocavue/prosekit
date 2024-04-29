import type { Page } from '@playwright/test'
import { test } from '@playwright/test'

import { exampleMeta } from '../example.meta'

export function getExamples(story: string) {
  const examples = exampleMeta.examples
    .filter((example) => example.story === story)
    .map((example) => example.name)

  if (examples.length === 0) {
    throw new Error(`No examples found for story "${story}"`)
  }

  return examples
}

export function testStory(
  story: string,
  callback: (options: { example: string }) => void,
) {
  test.describe(story, () => {
    for (const example of getExamples(story)) {
      test.describe(example, () => {
        callback({ example })
      })
    }
  })
}

export function locateEditor(page: Page) {
  return page.locator('.ProseMirror')
}

export async function waitForEditor(page: Page) {
  const locator = locateEditor(page)
  await locator.waitFor({ state: 'visible' })
  return locator
}

export const isApple = process.platform === 'darwin'
