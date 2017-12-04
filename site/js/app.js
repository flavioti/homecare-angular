/* eslint-disable max-params */

angular
    .module('app1', ['ngMaterial', 'ngRoute'])
    .config(config)
    .controller('mainController', mainController)
    .controller('homeController', homeController)
    .controller('fisioDetalheController', fisioDetalheController)
    .factory('storageService', storageService);

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

function fisioDetalheController($scope, $timeout, $mdSidenav, $log, storageService, $mdToast) {

    $scope.dataset = {};

    $scope.initialize = function () {
        fetchFisioList();
    };

    function fetchFisioList() {
        $scope.dataset.fisioList = storageService.getFisioList();
    }

    function prepararEdicao(fisio) {
        return {
            id: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Código',
                name: 'id',
                value: fisio.id
            }),
            nome: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Nome',
                name: 'nome',
                value: fisio.nome
            }),
            idade: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Idade',
                name: 'idade',
                value: fisio.idade
            }),
            especialidade: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Especialidade',
                name: 'especialidade',
                value: fisio.especialidade
            }),
            foto: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'URL da Foto',
                name: 'foto',
                value: fisio.foto
            }),
        };
    };

    $scope.toggleSidebarDetail = function () {
        $mdSidenav('right').toggle();
    };

    $scope.newAction = function () {
        $scope.dataset.fisio = prepararEdicao({
            id: Math.floor(Math.random() * 99999999) + 1,
            idade: 18,
            nome: '',
            especialidade: '',
            foto: 'https://maxcdn.icons8.com/Share/icon/dotty/Users/person_male1600.png',
        });
        $mdSidenav('right').open();
    };

    $scope.saveAction = function () {
        try {
            if (!validateObject($scope.dataset.fisio)) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Existem erros no formulário')
                    .hideDelay(3000)
                );

                return;
            }
            storageService.saveFisio($scope.dataset.fisio);
            fetchFisioList();
            $mdSidenav('right').close();
        } catch (err) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(err)
                .hideDelay(3000)
            );
        }
    };

    $scope.editFisioAction = function (fisio) {
        $scope.dataset.fisio = prepararEdicao({
            id: fisio.id.value,
            nome: fisio.nome.value,
            idade: fisio.idade.value,
            especialidade: fisio.especialidade.value,
            foto: fisio.foto.value
        });
        $mdSidenav('right').open();
    };

    $scope.deleteFisioAction = function (fisio) {
        storageService.deleteFisio(fisio);
        fetchFisioList();
        $mdToast.show(
            $mdToast.simple()
            .textContent('Apagado')
            .hideDelay(3000)
        );
    };



};

function storageService() {
    return {
        getFisioList: function () {
            try {
                var tmp = JSON.parse(window.localStorage.getItem('fisioList'));
                if (tmp == null) {
                    tmp = [];
                    window.localStorage.setItem('fisioList', []);
                }

                return tmp;
            } catch (err) {
                console.error(err);

                return [];
            }
        },
        // getFisioById: function (idFisio) {
        //     var fisioList = JSON.parse(window.localStorage.getItem('fisioList'));
        //     fisioList.filter((element) => {
        //         if (element.idFisio = idFisio) {
        //             return element;
        //         }
        //     });
        // },
        saveFisio: function (fisio) {
            // Apaga a versão antiga se existir
            this.deleteFisio(fisio);
            var fisioList = JSON.parse(window.localStorage.getItem('fisioList'));
            // Grava a versão nova
            fisioList.push(fisio);
            window.localStorage.setItem('fisioList', JSON.stringify(fisioList));
        },
        deleteFisio: function (fisio) {
            var tmp = window.localStorage.getItem('fisioList');
            if ((tmp == null) || (tmp == '')) {
                tmp = '[]';
            }
            var fisioList = JSON.parse(tmp);
            fisioList = fisioList.filter((element) => {
                if (element.id.value != fisio.id.value) {
                    return element;
                } else {
                    console.warn('Eliminando item e gravando');
                }
            });
            window.localStorage.setItem('fisioList', JSON.stringify(fisioList));
        },
    };
};

// Framework
function
validateObject(object) {
    object.isValid = true;
    object.errorList = [];
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            var field = object[prop];
            if (typeof field.validate == 'function') {
                field.validate();
                if (field.error)
                    object.errorList.push((field.title || field.name) + ': ' + field.errorMessage);
            }
        }
    }

    return object.isValid = (object.errorList.length === 0);
}

var campoEstruturaPadrao = {
    value: '',
    error: false,
    success: false,
    errorMessage: '',
    maxCaracter: null
};

var campoVazio = {
    validate: function () {
        this.error = false;
        this.success = true;
    }
};

var campoNaoVazio = {
    validate: function () {
        if (typeof this.beforeValidate == 'function')
            this.beforeValidate();

        if ((this.value == '') || (typeof this.value == 'undefined') || (this.value == 'undefined')) {
            this.error = true;
            this.success = false;
            this.errorMessage = 'Preenchimento obrigatório';
        } else if ((this.maxCaracter) && (this.value.length > this.maxCaracter)) {
            this.error = true;
            this.success = false;
            this.errorMessage = 'Esse campo deve ter no máximo ' + this.maxCaracter + ' caracteres';
        } else {
            this.error = false;
            this.success = true;
        }

        if (typeof this.afterValidate == 'function')
            this.afterValidate();
    }
};