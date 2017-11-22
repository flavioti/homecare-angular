angular
    .module('app1', ['ngMaterial', 'ngRoute'])
    .config(config)
    .controller('mainController', mainController)
    .controller('homeController', homeController);

function config($routeProvider, $mdThemingProvider) {
    $routeProvider
        .when("/    ", {
            templateUrl: "home.html",
            controller: homeController
        })
        .when("/fisioterapeutas", {
            templateUrl: "fisioterapeutas.html",
            controller: homeController
        })
        .otherwise({
            template: "<h5>Pagina padrão</h5>"
        });

    $mdThemingProvider.definePalette('minhaPaleta', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
        'contrastLightColors': undefined
    });

    $mdThemingProvider.theme('default')
        .dark()
        .primaryPalette('minhaPaleta');
}

function mainController($scope, $route, $routeParams, $location) {

    $scope.activeMenu = document.location.href.split("/").pop();

    $scope.initialize = function () {};

    $scope.goto = function (activeMenu) {
        $scope.activeMenu = activeMenu;
        document.location.href = activeMenu;
    };
}

function homeController($scope) {

}