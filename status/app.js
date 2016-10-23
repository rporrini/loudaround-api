angular.module('status', ['angular-websocket'])
       .controller('PostsController', function($websocket, $interval, $location){
         var posts = this;
         posts.status = {pending:true};
         $interval(() => {
            var dataStream = $websocket('ws://' + $location.host() + ':' + $location.port() + '/alive');
            dataStream.onMessage(function(message) {
              posts.status = {alive:true};
            });
            dataStream.onError(function() {
              posts.status = {ko:true};
            });
         }, 5000);
       });
