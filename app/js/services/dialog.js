angular.module('yemd')
    .directive('dialog', yemdDialogDirective)
    .provider('$yemdDialog', yemdDialogProvider);

function yemdDialogDirective ($yemd, $compile, $rootScope) {
    return {
        link: function(scope, element) {

            var overlay = angular.element("<div data-overlay></div>");
            element.addClass('dialog');
            element.after(overlay);
            $compile(overlay)(scope);
            $rootScope.$emit('toggleOverlay', true);

            element.css({
                width: $yemd.viewportW() * 0.8,
                top: $yemd.viewportH()/4,
                left: $yemd.viewportW() * 0.1
            });

            $rootScope.$on('clickOverlay', function(e){ element.remove() });

        }
    }
}

function yemdDialogProvider () {

    this.$get = function($compile){
        return {
            show: function(dialog){
                var dialogT = angular.element( "<div data-dialog></div>" ) ;
                dialogT.html(angular.element(dialog.template));

                angular.element('body').prepend(dialogT);
                $compile( dialogT )(dialog.scope);
            },
            hide: function() {

            }
        }
    };

}
