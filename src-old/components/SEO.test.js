import test from 'ava'
import { __test__ } from './SEO'

const { composeUrl } = __test__
const baseUrl = 'https://apptiva.ch'

test('Slug "foo"', t => {
  const actual = composeUrl(baseUrl, 'foo')
  t.is(actual, 'https://apptiva.ch/foo/')
})

test('Slug "/foo"', t => {
  const actual = composeUrl(baseUrl, '/foo')
  t.is(actual, 'https://apptiva.ch/foo/')
})

test('Slug "foo/"', t => {
  const actual = composeUrl(baseUrl, 'foo/')
  t.is(actual, 'https://apptiva.ch/foo/')
})

test('Slug "/foo/"', t => {
  const actual = composeUrl(baseUrl, '/foo/')
  t.is(actual, 'https://apptiva.ch/foo/')
})

test('Slug "/"', t => {
  const actual = composeUrl(baseUrl, '/')
  t.is(actual, 'https://apptiva.ch/')
})

test('Empty slug', t => {
  const actual = composeUrl(baseUrl, '')
  t.is(actual, 'https://apptiva.ch/')
})

test('Undefined slug', t => {
  const actual = composeUrl(baseUrl, undefined)
  t.is(actual, 'https://apptiva.ch/')
})

test('null slug', t => {
  const actual = composeUrl(baseUrl, null)
  t.is(actual, 'https://apptiva.ch/')
})
