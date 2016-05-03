angular.module('ActiveStack.Model', [], function($provide) {
    $provide.factory('ActiveStackModel', function($log, ActiveStackDomain) {
        ActiveStackModel = function() {
            Decorate.withEventDispatcher(this);
            var self = this;
            var cache = {};
            var timeoutID = null;
            var emitContext = [];

            /**
             * Found that we needed to queue up the refreshes
             * since they were happening so often.  This way
             * the data will only refresh every 200 millis
             */
            this.notifyChanged = function(context) {
                if(!timeoutID){
                    emitContext.push(context)
                    var that = this;
                    timeoutID = setTimeout(function(){
                        emitContext = [];
                        timeoutID = null;
                        that.emit('changed');
                    },200);
                }
                else{
                    emitContext.push(context);
                }
            }

            this.filterIncoming = function(o) {
                var ret = walkAndReplace(o);
                self.notifyChanged(o);
                return ret;
            }

            this.removeObject = function(o) {
                var cacheKey = getCacheKey(o);
                if (cacheKey) {
                    // Find the object in the ALL array to remove
                    var className = getClassName(o);
                    for(var i in ActiveStackDomain[className].prototype._all){
                        var ob = ActiveStackDomain[className].prototype._all[i];
                        if(o.ID && o.ID == ob.ID)
                            delete ActiveStackDomain[className].prototype._all[i];
                    }

                    o.removeReferences();
                    removeFromCache(cacheKey);
                }
            }

            this.findObjectByClassIdPair = function(cip){
                return findObject(getCacheKey(cip));
            }

            this.findObject = function(cn, id) {
                return findObject(cn + id);
            }

            function walkAndReplace(o) {
                if (o == null) {
                    return null;
                } else if (Array.isArray(o)) {
                    var list = [];
                    for (var i = 0; i < o.length; i++) {
                        var object = o[i];
                        var typed = walkAndReplace(object);
                        list.push(typed);
                    }
                    return list;
                } else if (typeof o == "object") {
                    var newO = {};
                    var cacheKey = getCacheKey(o);
                    if (cacheKey != null) {
                        newO = findObject(cacheKey);
                        if (newO == null) {
                            var className = getClassName(o);
                            if (className) {
                                newO = new ActiveStackDomain[className]();
                            }
                        }
                        newO.isProxy = false;
                    }
                    for (var key in o) {
                        var value = o[key];
                        newO[key] = walkAndReplace(value);
                    }

                    addOrReplaceCache(newO);
                    return newO;
                }
                return o;
            }

            function findObject(cacheKey) {
                return cache[cacheKey];
            }

            var numCached = 0;
            var cacheCounts = {};
            function addOrReplaceCache(o) {
                var cacheKey = getCacheKey(o);
                if (cacheKey != null) {
                    var isAdd = findObject(cacheKey) == null;
                    if(isAdd){
                        var className = getClassName(o);
//                console.log(className+" Added to model");
                        if(ActiveStackDomain[className])
                            ActiveStackDomain[className].prototype._all.push(o);
                    }
                    if(!cacheCounts[cacheKey]) cacheCounts[cacheKey] = 0;
                    cacheCounts[cacheKey]++;
                    cache[cacheKey] = o;
//			self.notifyChanged();

                    if(numCached %100==0){
                        console.log("Num Cached: "+(++numCached));
                    }
                }
            }

            function removeFromCache(cacheKey) {
                delete cache[cacheKey];
                self.notifyChanged(cacheKey);
            }

            function getCacheKey(o) {
                var ID = o.ID;
                var cn = getClassName(o);
                if (ID && cn) {
                    if (ActiveStackDomain[cn] != undefined) {
                        return cn + ID;
                    }
                }
                return null;
            }

            function getClassName(o) {
                var cn = o.cn || o.className;
                if (cn) {
                    var parts = cn.split(".");
                    return parts[parts.length-1];
                }
                return null;
            }

        };

        return new ActiveStackModel();
    });
});
