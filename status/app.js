angular.module('status', ['angular-websocket', 'ngMap'])
	.component('alive', {
		templateUrl: 'alive.html',
		controller: 'AliveController'
	})
	.controller('AliveController', function ($websocket, $interval, $location) {
		var alive = this;
		alive.status = {
			pending: true
		};
		const endpoint = 'ws://' + $location.host() + ':' + $location.port();
		$interval(() => {
			var dataStream = $websocket(endpoint + '/alive');
			dataStream.onMessage(message => {
				alive.status = {
					alive: true
				};
			});
			dataStream.onError(function () {
				alive.status = {
					ko: true
				};
			});
		}, 5000);
	})
	.component('chat', {
		templateUrl: 'chat.html',
		controller: 'ChatController',
		bindings: {
			map: '@'
		}
	})
	.controller('ChatController', function ($websocket, $location, NgMap) {

		var posts = this;
		posts.board = '';
		const endpoint = 'ws://' + $location.host() + ':' + $location.port();
		const postSocket = $websocket(endpoint + '/post');
		postSocket.onMessage(message => {
			const parsed = JSON.parse(message.data);
			posts.board += `(${parsed.position.lat}, ${parsed.position.long}): ${parsed.text} \n`;
		});
		posts.send = (text, pos) => {
			postSocket.send({
				position: {
					lat: pos.lat(),
					long: pos.lng()
				},
				text
			});
			posts.board += pos + ': ' + text + '\n';
			posts.message = '';
		};

		NgMap.getMap(posts.map).then(function (map) {
			let marker = new google.maps.Marker();
			map.addListener('click', function (e) {
				marker.setMap(null);
				marker = new google.maps.Marker({
					position: e.latLng,
					map: map
				});
				var info = new google.maps.InfoWindow({
					content: `<h5>${e.latLng}</h5>`
				});
				info.open(map, marker);
				posts.position = e.latLng;
			});
		});
	});
