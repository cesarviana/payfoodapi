var backendService = function ($http, $q, $rootScope, $httpParamSerializer) {

        var backendBaseUri = 'https://payfood-api-dev-cesarviana.c9users.io/';

        function unpackPromiseAndHandleErrorCodes(promise) {
            return promise.then(function (response) {
                return response.data;
            }, function (response) {
                if (!response.data) {
                    response.data = {};
                }
                $rootScope.messages.push({
                    'content' :  (response.data.message ? response.data.message : 'Ocorreu um erro ao tentar processar a sua requisição.'),
                    'class' : 'danger'
                });
                var errorCode = response.status;
                return $q.reject(errorCode);
            });
        };

        function query(table, params) {
           return $http({
                method: 'POST',
                url: backendBaseUri+table,
                data: params
                // data: $httpParamSerializer(params) // ,
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // }
           });  
        };


        function get(table, id) {
            return $http({
                url: backendBaseUri + table + "/"+id,
                method: 'GET'
            });
        };

        function list(table) {
            return unpackPromiseAndHandleErrorCodes($http({
                url: backendBaseUri + table,
                method: 'GET'
            }));
        };

        function insert(table, newData) {
            return $http({
                method: 'POST',
                url: backendBaseUri+table,
                data: newData,
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
//                }
            }); 
        };

        function remove(table, id) {
           return $http({
                method: 'DELETE',
                url: backendBaseUri+table+"/"+id
           });        
        };

        function update(table, data) {
           return $http({
                method: 'PUT',
                url: backendBaseUri+table+"/"+data._id,
                data: data
           }); 
        }
        ;

        return {
            get: get,
            list: list,
            update: update,
            insert: insert,
            remove: remove,
            query : query
        };
};