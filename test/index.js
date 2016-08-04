import test from 'ava'


test('should export the right stuff', (t) => {
  const a = /foo/;
  const b = 'bar';
  const c = 'baz';
  t.true(a.test(b) || b === c);
})
