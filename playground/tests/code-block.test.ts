import { expect, test, type Page } from '@playwright/test'

import { getExamples, isApple, locateEditor } from './helper'

for (const example of getExamples('code-block')) {
  test.describe(example, () => {
    test('input rule', async ({ page }) => {
      await page.goto(example)
      const editor = locateEditor(page)
      const pre = editor.locator('pre')

      // Type triple backticks and press space to create a code block
      await clear(page)
      await editor.pressSequentially('```')
      await expect(editor).toHaveText('```')
      await expect(pre).not.toBeVisible()
      await editor.press('Space')
      await expectAnyPre(page)
      await expect(editor).not.toHaveText('```')

      // Type triple backticks followed by a language and press space to create a code block
      await clear(page)
      await editor.pressSequentially('```javascript')
      await expect(editor).toHaveText('```javascript')
      await expect(pre).not.toBeVisible()
      await editor.press('Space')
      await expectJavaScriptPre(page)
      await expect(editor).not.toHaveText('```')
    })

    test('enter rule', async ({ page }) => {
      await page.goto(example)
      const editor = locateEditor(page)
      const pre = editor.locator('pre')

      // Type triple backticks and press enter to create a code block
      await clear(page)
      await editor.pressSequentially('```')
      await expect(editor).toHaveText('```')
      await expect(pre).not.toBeVisible()
      await editor.press('Enter')
      await expectAnyPre(page)
      await expect(editor).not.toHaveText('```')

      // Type triple backticks followed by a language and press enter to create a code block
      await clear(page)
      await editor.pressSequentially('```javascript')
      await expect(editor).toHaveText('```javascript')
      await expect(pre).not.toBeVisible()
      await editor.press('Enter')
      await expectJavaScriptPre(page)
      await expect(editor).not.toHaveText('```')
    })
  })
}

async function expectNotPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre')
  await expect(pre).not.toBeVisible()
}

async function expectAnyPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre')
  await expect(pre.first()).toBeVisible()
}

async function expectJavaScriptPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre[data-language="javascript"]')
  await expect(pre.first()).toBeVisible()
}

async function clear(page: Page) {
  const editor = locateEditor(page)
  await editor.press(isApple ? 'Meta+a' : 'Control+a')
  await editor.press('Backspace')
  await expect(editor).toHaveText('')
  await expectNotPre(page)
}
