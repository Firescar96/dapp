describe('submarket',function(){

var submarketAlias = 'drinksubmarket'+Math.floor(Math.random()*999999)

it('should bootstrap',function(){
    browser.get('http://127.0.0.1:8000');

    browser.wait(function() {
       return element(by.css('h1')).isDisplayed()
    }, 1000);
})

describe('submarket modal',function(){
    it('should open when the submarket modal button is clicked',function(){
        element(by.css('[ng-click="openSubmarketModal()"]')).click()
        var currentController = browser.executeScript("return angular.element(document.getElementById('app')).injector().get('modals').currentController")
        expect(currentController).toBe('SubmarketModalController')
    })

    it('should create The Drink Submarket',function(){
        element(by.css('.modal-content [ng-model="alias"]')).sendKeys(submarketAlias)
        element(by.css('[ng-model="name"]')).sendKeys('The Drink Submarket')
        element(by.css('[ng-model="info"]')).sendKeys('The best drinks on the interweb')
        element(by.css('[ng-click="submit()"]')).click()
        element(by.css('[ng-click="approve()"]')).click()
        browser.wait(function() {
          var deferred = protractor.promise.defer();
          element(by.css('[src="images/balls.gif"]')).isDisplayed()
          .then(function (isDisplayed) {
            deferred.fulfill(!isDisplayed);
          });
          return deferred.promise;
        })
        element(by.css('[ng-href*="#/submarkets/"]')).click()
        element(by.css('h1')).getText().then(function(text){
            expect(text.indexOf('The Drink Submarket')).toNotEqual(-1)
        })

    })

})

})