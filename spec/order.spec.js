describe('order',function(){

  it('should bootstrap',function(){
    browser.get('http://127.0.0.1:8000');

    browser.wait(function() {
      return element(by.css('h1')).isDisplayed()
    }, 1000);
  })

  describe('create order', function() {

    it('should find a store', function() {
      browser.waitForAngular()
      var storeAddr = browser.executeScript('return angular.element(document.getElementById("app")).injector().get("user").data.storeAddrs[0]')
      var alias=element(by.css('a[ng-href="#stores/'+storeAddr+'/about"]')).getText()
      alias = alias.replace('@','')
      element(by.css('input[ng-model=alias]')).sendKeys(alias)
      element(by.css('input[ng-model=alias]')).sendKeys(protractor.Key.ENTER)
    });

    it('should create an order', function(){
      element(by.css('[heading="Products"]')).click(0)
      element(by.css('[ng-model="product.quantity"]'))
      element(by.css('[ng-click="createOrder(store,submarket)"]')).click(0)

      element(by.css('[ng-click="approve()"]')).click()
      browser.wait(function() {
        var deferred = protractor.promise.defer();
        element(by.css('[src="images/balls.gif"]')).isDisplayed()
        .then(function (isDisplayed) {
          deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
      });
    })
  });

})