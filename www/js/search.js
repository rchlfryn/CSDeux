'use strict';

angular.module('search', [])

.directive('ionSearch', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      attrs.minLength = attrs.minLength || 0;
      scope.placeholder = attrs.placeholder || '';
      scope.search = {
        value: ''
      };

      if (attrs.class)
        element.addClass(attrs.class);

      if (attrs.source) {
        scope.$watch('search.value', function(newValue, oldValue) {
          if (newValue.length > attrs.minLength) {
            scope.getData({
              str: newValue
            }).then(function(results) {
              scope.model = results;
            });
          } else {
            scope.model = [];
          }
        });
      }

      scope.clearSearch = function() {
        scope.search.value = '';
      };
    }
  };
})

.filter('groups', function() {
  return function(groups, searchCriteria) {

    if (searchCriteria == null || searchCriteria.length == 0)
      return groups;

    var filtered = [];

    angular.forEach(groups, function(group) {
      var foundInGroup = false;

      for (var i = 0; i < group.items.length; i++) {
        var groupName = group.items[i].toLowerCase();
        if (foundInGroup == false &&
          groupName.indexOf(searchCriteria.toLowerCase()) > -1) {
          filtered.push(group);
          foundInGroup = true;
        }
      }
    });

    return filtered;
  };
})
