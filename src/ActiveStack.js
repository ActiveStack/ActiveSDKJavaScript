angular.module('ActiveStack', ['ActiveStack.Config','ActiveStack.Api','ActiveStack.Domain','ActiveStack.Model'], function($provide) {
    $provide.factory('ActiveStack', function($log, ActiveStackConfig, ActiveStackApi, ActiveStackDomain, ActiveStackModel) {
        function ActiveStack(){
            this.config = ActiveStackConfig;
            this.decorate = Decorate;
            this.utils = Utils;
            this.api = ActiveStackApi;
            this.model = ActiveStackModel;
            this.domain = ActiveStackDomain;
        };

        return new ActiveStack();
    });
});
