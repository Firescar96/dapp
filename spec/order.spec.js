describe('order',function(){

  it('should bootstrap',function(){
    browser.get('http://127.0.0.1:8000');

    browser.wait(function() {
      return element(by.css('h1')).isDisplayed()
    }, 1000);
  })

  describe('creation', function() {

    //searches for a store made by a pervious test using the store's alias
    it('should find a store', function() {
      browser.waitForAngular()
      browser.executeScript('return angular.element(document.getElementById("app")).injector().get("user").data.storeAddrs[0]').then(function(storeAddr) {
        element(by.css('a[ng-href="#/stores/'+storeAddr+'/about"]')).getText().then(function(alias){
          alias = alias.replace('@','')
          element(by.css('input[ng-model=alias]')).sendKeys(alias)
          element(by.css('input[ng-model=alias]')).sendKeys(protractor.Key.ENTER)
        })
      })
    });

    it('should create an order', function(){
      element(by.css('[heading="Products"]')).click(0)
      element(by.css('input[ng-model="product.quantity"]')).sendKeys(protractor.Key.ARROW_UP)
      element(by.css('[ng-click="createOrder(store,submarket)"]')).click(0)
      element(by.css('[ng-click="approve()"]')).click(0)
      browser.wait(function() {
        var deferred = protractor.promise.defer();
        element(by.css('[src="images/balls.gif"]')).isDisplayed()
        .then(function (isDisplayed) {
          console.log(isDisplayed);
          deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
      })
    })

    it('should make the item payment', function(){
      element(by.css('[value="order.total"] >div:first-child')).getText().then(function(cost){
        element(by.css('[ng-click="makePayment()"]')).click(0)
        element(by.css('[ng-model="amountInUserCurrency"]')).clear()
        element(by.css('[ng-model="amountInUserCurrency"]')).sendKeys(cost.replace(/[^\.0-9]/g, ''))
        element(by.css('[ng-click="submit()"]')).click(0)
      })

      browser.wait(function() {
        var deferred = protractor.promise.defer();

        element.all(by.css('div[ng-show="isSyncing"]')).then(function(items) {
          deferred.fulfill(items.length === 0);
        });

        return deferred.promise;
      })
    })

    it('should change the state to shipped', function(){
      element(by.css('[ng-click="markAsShipped()"]')).click(0)

      element(by.css('[ng-click="approve()"]')).click()
      browser.wait(function() {
        var deferred = protractor.promise.defer();
        element(by.css('[src="images/balls.gif"]')).isDisplayed()
        .then(function (isDisplayed) {
          deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
      })
    })

    it('should finalize the order', function(){
      element(by.css('[ng-click="finalize()"]')).click(0)

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