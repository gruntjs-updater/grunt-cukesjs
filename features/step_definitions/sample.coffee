module.exports = ->
  @World = require('../support/world.coffee').World

  @Given "I load the wd demo", (callback) ->
    @browser
      .get("http://admc.io/wd/test-pages/guinea-pig.html")
      .nodeify(callback)


  @When "I interact with the demo", (callback) ->
    @browser
      .title()
        .should.become('WD Tests')
      .elementById('i am a link')
      .click()
      .eval("window.location.href")
        .should.eventually.include('guinea-pig2')
      .back()
      .nodeify(callback)

  @Then "I get the expected results", (callback) ->
    @browser
      .elementByCss('#comments').type('Bonjour!')
      .getValue().should.become('Bonjour!!')
      .fin =>
        @browser.quit()
      .done -> 
        callback()

