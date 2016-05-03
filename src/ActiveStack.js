angular.module('ActiveStack', ['ActiveStack.Config','ActiveStack.Api','ActiveStack.Domain','ActiveStack.Domain.Ext','ActiveStack.Model','ActiveStack.ProcessHelper'], function($provide) {
    $provide.factory('ActiveStack', function($log, ActiveStackConfig, ActiveStackApi, ActiveStackDomain, ActiveStackDomainExt, ActiveStackModel, ActiveStackProcessHelper) {
        function ActiveStack(){
            this.config = ActiveStackConfig;
            this.decorate = Decorate;
            this.utils = Utils;
            this.api = ActiveStackApi;
            this.model = ActiveStackModel;
            this.domain = ActiveStackDomain;
            this.domainExt = ActiveStackDomainExt;
            this.processHelper = ActiveStackProcessHelper;
        };

        return new ActiveStack();
    });
});
