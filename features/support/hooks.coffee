myHooks = ->
  @Before (scenario, callback) ->
    callback()

module.exports = myHooks
