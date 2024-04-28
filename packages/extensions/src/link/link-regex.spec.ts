import { test, expect, describe } from 'vitest'

import { LINK_MARK_RE } from './link-regex'

describe('LINK_MARK_RE', () => {
  const run = (str: string) => {
    LINK_MARK_RE.lastIndex = 0
    return LINK_MARK_RE.exec(str)?.[0] ?? null
  }

  expect(run('Not a link')).toEqual(null)

  expect(run('example.com')).toEqual('example.com')
  expect(run('https://example.com')).toEqual('https://example.com')
  expect(run('Foo https://example.com Bar')).toEqual('https://example.com')
  expect(run('https://example.com/')).toEqual('https://example.com/')
  expect(run('https://example.com/?query=1')).toEqual(
    'https://example.com/?query=1',
  )
  expect(run('https://example.com/#fragment')).toEqual(
    'https://example.com/#fragment',
  )
  expect(run('https://example.com/path?query=1#fragment')).toEqual(
    'https://example.com/path?query=1#fragment',
  )
  expect(run('https://example.com/path?query=1#fragment')).toEqual(
    'https://example.com/path?query=1#fragment',
  )
  expect(run('Foo https://example.com/path?query=1#fragment Bar')).toEqual(
    'https://example.com/path?query=1#fragment',
  )

  // Ignore the period at the end
  expect(run('https://example.com.')).toEqual('https://example.com')
  expect(run('https://example.com.uk')).toEqual('https://example.com.uk')

  // .goog is a TLD
  expect(run('Foo www.goog')).toEqual('www.goog')
  // .googl is not a TLD
  expect(run('Foo www.googl')).toEqual(null)
  // .google is a TLD
  expect(run('Foo www.google')).toEqual('www.google')

  // Don't match ? when there is nothing after it
  expect(run('www.example.com?')).toEqual('www.example.com')
  expect(run('www.example.com/?')).toEqual('www.example.com/')
  expect(run('www.example.com/?=')).toEqual('www.example.com/?=')

  // Don't match . when there is nothing after it
  expect(run('www.example.com.')).toEqual('www.example.com')
  expect(run('www.example.com/.')).toEqual('www.example.com/')
  expect(run('www.example.com/.gitignore')).toEqual(
    'www.example.com/.gitignore',
  )

  // with ( and )
  expect(run('https://en.wikipedia.org/wiki/Specials_(Unicode_block)')).toEqual(
    'https://en.wikipedia.org/wiki/Specials_(Unicode_block)',
  )

  // with '
  expect(
    run(
      `https://en.wikipedia.org/wiki/The_Power_of_the_Powerless#Havel's_greengrocer`,
    ),
  ).toEqual(
    `https://en.wikipedia.org/wiki/The_Power_of_the_Powerless#Havel's_greengrocer`,
  )
})
