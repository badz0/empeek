( function() {
	'use strict';
	angular.module('app.core')
		.factory('JWPlayerService', JWPlayerService);
    
    JWPlayerService.$inject = ['jwplayerkey'];
	
	function JWPlayerService(jwplayerkey) {

		var renderPreviewJWP = function(targetBoxID, fileLink) {
			if (jwplayer && targetBoxID) {
				if (fileLink) {
					jwplayer.key = jwplayerkey;
					jwplayer(targetBoxID).setup({
						file: fileLink,
						primary: 'flash',
						autostart: false,
						repeat: true,
						listbar: false
					});
					jwplayer(targetBoxID).on('error', function(event){
						jwplayer(targetBoxID).load({file: fileLink, title: event.message});
					});
				}
				else {
					jwplayer.key = jwplayerkey;
					jwplayer(targetBoxID).remove();
				}
			}
			else {
				console.log('Missing data for player', fileLink);
			}
		};

		return {
			renderPreviewJWP: renderPreviewJWP
		};

	};
})();
