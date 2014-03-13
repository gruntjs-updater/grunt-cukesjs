wd = require('wd')
chai = require('chai')
chaiAsPromised = require("chai-as-promised")

remote = wd.promiseChainRemote(process.env.SELENIUM_HUB)
chai.use(chaiAsPromised)
chai.should()

chaiAsPromised.transferPromiseness = wd.transferPromiseness

World = (callback) ->
  @browser = remote

  # World Configuration
  #
  #
  @browser.on "status", (info) ->
    # console.log info.cyan

  @browser.on "command", (meth, path, data) ->
    # console.log " > " + meth.yellow, path.grey, data or ""

  @browser.init({browserName: 'firefox'})
    .nodeify(callback)


  # Helper Methods
  #
  #


exports.World = World
