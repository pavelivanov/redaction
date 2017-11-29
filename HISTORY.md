# UNRELEASED

# 4.1.0 (2017-11-29)

  * add functionality to convert all immutable data in plain connect
  * remove second param from connect method, so there is just two params in connect method:
    ```
    connect(storeProps, options)
    ```

# 4.0.7 (2017-11-29)

  * Add condition to plain connect method to convert immutable result to plain js 

# 4.0.6 (2017-08-29)

  * Replace ES6 exports in root immutable.js with ES5

# 4.0.5 (2017-08-29)

  * Update export format to work with webpack imports resolving

# 4.0.4 (2017-08-19)

  * Update export format to work with webpack imports resolving

# 4.0.3 (2017-04-30)

  * Rework module - split to plain and immutable versions
  * Update examples for plain and immutable
  * Update Readme

# 3.3.4 (2017-04-06)

  * Move Immutable PropTypes to separate key `immutable`

# 3.3.3 (2017-04-06)

  * Improve `connect` method. Add option to call it as `react-redux` does. Add info about options of call to README.md

# 3.3.2 (2017-04-01)

  * Add `type` property to reducer wrappers. For example it can be used in redux-saga

# 3.3.1 (2017-04-01)

  * Add returning dispatch in connect method
  * Add redux-auth-wrapper example

# 3.3.0 (2017-03-30)

  * Fix combining reducers, change logic of usage in createStore. Beware
  * Update todos example
  * Add redux-form example

# 3.2.0 (2017-03-29)

  * Add connect method to link state to components
  * Add immutable react PropTypes

# 3.1.0 (2017-03-29)

  * Add Immutable.js

# 3.0.0 (2016-12-20)

  * Completely rework redaction library - remove action creators, create reducer wrappers with closure dispatching.
  * Update Readme.md

# 2.2.0 (2016-12-19)

  * Code clean up. Last commit in 2.* version.

# 2.1.1, 2.1.2 (2016-12-18)

  * Fix errors

# 2.1.0 (2016-12-18)

  * Remove `modifyState` method. Remove `strategy` option from request params. Add functionality to configure requests.
