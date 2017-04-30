<p>
  <img src="./images/redaction-logo-big.png" height="70" />
</p>

### Redux reducers without constants and dispatching!

[![Npm Version](https://badge.fury.io/js/redaction.svg)](https://www.npmjs.com/package/redaction)
[![Month Downloads](https://img.shields.io/npm/dm/redaction.svg)](http://npm-stat.com/charts.html?package=redaction)
[![Npm Licence](https://img.shields.io/npm/l/redaction.svg)](https://www.npmjs.com/package/redaction)


## Install

```bash
npm install --save redaction
```


## Introduction

> The README reflects redaction v4.x, 
[v3.x documentation](https://github.com/pavelivanov/redaction/tree/v3), 
[v2.x documentation](https://github.com/pavelivanov/redaction/tree/v2).

Redaction is wrapper for reducers. The main purpose is to refuse from using constants and dispatch method in code.
There are Plain and Immutable versions.


## Documentation

- [Plain](https://github.com/pavelivanov/redaction/tree/master/docs/Plain.md)
- [Immutable](https://github.com/pavelivanov/redaction/tree/master/docs/Immutable.md)


## TODO

- [ ] Write tests
- [x] Add ImmutableJS
- [x] Add `connect` sugar with string paths
- [ ] Add actionWrapper to call dispatch `pending` and `error` requests in shadow
- [x] Test workflow with ReduxForm and ReduxSaga
