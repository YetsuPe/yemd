
angular.module('yemd')
        .directive('grid', grid);

function grid ($rootScope) {
    return {
        scope: {
          row: '@',
          type: '@' // 'square', 'screen'
        },
        controller: function($scope, $element) {
            $element.addClass('grid');
            var grid= this;

            grid.row = parseInt($scope.row) || 2 ;
            grid.type = $scope.type || 'square' ;

            grid.exe = exe;

            function exe () {
                angular.forEach($element.find('.grid__item'), function(item, index){
                    $(item).css({
                        width: ($element.width()/grid.row ) - ( (8*(grid.row-1))/3 ) ,
                        height:($element.width()/grid.row ) - ( (8*(grid.row-1))/3 ) ,
                        backgroundImage: "url('"+ $(item).find('.card__cover__image').attr('src')+"')"
                    });
                });
            }

        },
        link: function (scope, element, attrs, gridCtrl) {

            gridCtrl.exe();

            $rootScope.$on('resizeWindow', function(e) {
                gridCtrl.exe();
            });

        }
    }
}
