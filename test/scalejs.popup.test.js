define([
    'scalejs!core', 'scalejs!application'
], function(
    core
) {
    var popup = core.popup;

    // For deeper testing, log to console
    console.log('core.popup: ', popup);

    describe('core.popup', function() {

        it('is defined', function() {
            expect(popup).toBeDefined();
        });

    });
});

