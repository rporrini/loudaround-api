angular.module('status', ['angular-websocket'])
       .controller('PostsController', function($websocket, $interval, $location){
         var posts = this;
         posts.status = {pending:true};
         const endpoint = 'ws://' + $location.host() + ':' + $location.port();
         $interval(() => {
            var dataStream = $websocket(endpoint + '/alive');
            dataStream.onMessage(function(message) {
              posts.status = {alive:true};
            });
            dataStream.onError(function() {
              posts.status = {ko:true};
            });
         }, 5000);

         posts.board = '';
         const postSocket = $websocket(endpoint + '/post')
         postSocket.onMessage(function(message){
           posts.board += message.data + '\n';
         });
         posts.send = message => {
           postSocket.send(message);
           posts.board += message + '\n';
           posts.message = '';
         };
       });
