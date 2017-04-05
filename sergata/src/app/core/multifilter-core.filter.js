(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('multifilter', multifilter);

    function multifilter() {
        return function (dataArray, searchTerm, fields) {
            if (!dataArray) {
                return;
            } else if (!searchTerm) {
                return dataArray;
            } else {
                var term = searchTerm.toLowerCase();
                return dataArray.filter(function (item) {
                    for (var i = 0; i < fields.length; ++i) {
                        var fieldsHierarchy = fields[i].split('.');
                        var currentItem = item;
                        for (var j = 0; j < fieldsHierarchy.length; ++j) {
                            if (typeof currentItem[fieldsHierarchy[j]] !== "undefined" && currentItem[fieldsHierarchy[j]]) {
                                currentItem = currentItem[fieldsHierarchy[j]];
                            } else {
                                continue;
                            }
                        }
                        if (currentItem.toString().toLowerCase().indexOf(term) > -1) return true;
                    }
                    return false;
                });
            }
        }
    }
})();
