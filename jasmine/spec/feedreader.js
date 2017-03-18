/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */

         it('have a url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeFalsy();
            });
         });

        /* Test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
         it('have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeFalsy();
            });
         });
    });


    describe('The Menu', function() {
        /* Test ensures the menu element is hidden by default. */

        var hiddenMenu = $('body').hasClass('menu-hidden'),
            menuIcon = $('.menu-icon-link');

        it('is hidden by default', function() {
            expect(hiddenMenu).toBe(true);
        });

         /* Test ensures the menu changes visibility when the menu
          * icon is clicked.
          */

        it('toggles when icon is clicked', function() {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    describe('Initial Entries', function() {

        /* Test ensures that when the loadFeed function is called
        * and completes its work, there is at least
        * a single .entry element within the .feed container.
        */

        var initialEntry = 0,
            feedContainer = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have entries', function(done) {
            expect($('.feed').find('.entry')).toBeTruthy();
            done();
        });

    });


        /* Test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes.
         */

    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should be new content - feed title', function(done) {
            var origTitle = $('.header-title').text();
            loadFeed(1, function() {
                var newTitle = $('.header-title').text();
                expect(newTitle).not.toBe(origTitle);
                done();
            });
        });

        it('should be new content - entry titles', function(done) {
            // set origContent to array of all entry titles
            var origContent = $('.entry > h2').toArray()
                .map(function(header) {
                    return header.innerHTML;
                });
            loadFeed(1, function() {
                var newContent = $('.entry > h2').toArray()
                    .map(function(header) {
                        return header.innerHTML;
                    });
                expect(newContent).not.toBe(origContent);
                done();
            });
        });
    });


}());
