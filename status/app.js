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
	.controller('PostsController', function ($websocket, $location, NgMap) {

		var posts = this;
		posts.board = '';

		const endpoint = 'ws://' + $location.host() + ':' + $location.port();
		const postSocket = $websocket(endpoint + '/post');
		postSocket.onMessage(message => {
			const parsed = JSON.parse(message.data);
			posts.board += parsed.position + ': ' + parsed.text + '\n';
		});
		posts.send = (text, position) => {
			postSocket.send({
				position,
				text
			});
			posts.board += position + ': ' + text + '\n';
			posts.message = '';
		};

		NgMap.getMap().then(function (map) {
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
