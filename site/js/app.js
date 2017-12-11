/* eslint-disable max-params */

angular
    .module('app1', ['ngMaterial', 'ngRoute'])
    .config(config)
    .controller('mainController', mainController)
    .controller('homeController', homeController)
    .controller('fisioDetalheController', fisioDetalheController)
    .controller('pacienteDetalheController', pacienteDetalheController)
    .factory('storageService', storageService)
    .factory('utilService', utilService);

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
        .when("/pacientes", {
            templateUrl: "pacientes.html",
            controller: homeController
        })
        .otherwise({
            templateUrl: "home.html",
            controller: homeController
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

function fisioDetalheController($scope, $timeout, $mdSidenav, $log, storageService, utilService) {

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
            foto: 'http://blogdocruz.com.br/wp-content/plugins/social-media-builder/img/no-image.png',
        });
        $mdSidenav('right').open();
    };

    $scope.saveAction = function () {
        try {
            if (!validateObject($scope.dataset.fisio)) {
                utilService.exibirMensagem('Existem erros no formulário');

                return;
            }
            storageService.saveFisio($scope.dataset.fisio);
            fetchFisioList();
            $mdSidenav('right').close();
        } catch (err) {
            utilService.exibirMensagem(err);
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

    function deleteFisio(fisio) {
        storageService.deleteFisio(fisio);
        fetchFisioList();
    };

    $scope.deleteFisioAction = function (fisio) {
        utilService.exibirConfirmacao().then(function () {
            deleteFisio(fisio);
            utilService.exibirMensagem('Fisioterapeuta apagado');
        }, function () {
            utilService.exibirMensagem('Não foi apagado');
        });
    };

};

function pacienteDetalheController($scope, $timeout, $mdSidenav, $log, storageService, utilService) {

    $scope.dataset = {};

    $scope.initialize = function () {
        fetchPacienteList();
    };

    function fetchPacienteList() {
        $scope.dataset.pacienteList = storageService.getPacienteList();
    }

    function prepararEdicao(paciente) {
        return {
            id: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Código',
                name: 'id',
                value: paciente.id
            }),
            nome: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Nome',
                name: 'nome',
                value: paciente.nome
            }),
            idade: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Idade',
                name: 'idade',
                value: paciente.idade
            }),
            enfermidade: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Enfermidade',
                name: 'enfermidade',
                value: paciente.enfermidade
            }),
            relatorio: Object.assign({}, campoEstruturaPadrao, campoNaoVazio, {
                title: 'Relatório',
                name: 'relatorio',
                value: paciente.relatorio
            }),
        };
    };

    $scope.toggleSidebarDetail = function () {
        $mdSidenav('right').toggle();
    };

    $scope.newAction = function () {
        $scope.dataset.paciente = prepararEdicao({
            id: Math.floor(Math.random() * 99999999) + 1,
            nome: '',
            idade: 60,
            enfermidade: '',
            relatorio: '',
        });
        $mdSidenav('right').open();
    };

    $scope.saveAction = function () {
        try {
            if (!validateObject($scope.dataset.paciente)) {
                utilService.exibirMensagem('Existem erros no formulário');

                return;
            }
            storageService.savePaciente($scope.dataset.paciente);
            fetchPacienteList();
            $mdSidenav('right').close();
        } catch (err) {
            utilService.exibirMensagem(err);
        }
    };

    $scope.editPacienteAction = function (paciente) {
        $scope.dataset.paciente = prepararEdicao({
            id: paciente.id.value,
            nome: paciente.nome.value,
            idade: paciente.idade.value,
            enfermidade: paciente.enfermidade.value,
            relatorio: paciente.relatorio.value
        });
        $mdSidenav('right').open();
    };

    function deletePacienteAction(paciente) {
        storageService.deletePaciente(paciente);
        fetchPacienteList();
    };

    $scope.deletePacienteAction = function (paciente) {
        utilService.exibirConfirmacao().then(function () {
            deletePacienteAction(paciente);
            utilService.exibirMensagem('Paciente apagado');
        }, function () {
            utilService.exibirMensagem('Pensou melhor né? :P');
        });
    };
};

function utilService($mdToast, $mdDialog) {
    return {
        exibirMensagem: function (msg) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
            );
        },
        exibirConfirmacao: function () {
            return new Promise(function (resolve, reject) {
                var confirm = $mdDialog.confirm()
                    .title('Confimar exclusão')
                    .textContent('Essa operação não pode ser desfeita')
                    .ok('Sim')
                    .cancel('Não');

                $mdDialog.show(confirm).then(resolve, reject);
            });
        }
    };
};

function storageService() {
    return {
        // Fisioterapeuta
        getFisioList: function () {
            try {
                var raw = window.localStorage.getItem('fisioList');
                if (raw === '') {
                    raw = null;
                };
                raw = JSON.parse(raw);
                if (raw == null) {
                    raw = [];
                    window.localStorage.setItem('fisioList', '[]');
                }

                return raw;
            } catch (err) {
                console.error(err);

                return [];
            }
        },
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
        // Paciente
        getPacienteList: function () {
            try {
                var raw = window.localStorage.getItem('pacienteList');
                if (raw === '') {
                    raw = null;
                };
                raw = JSON.parse(raw);
                if (raw == null) {
                    raw = [];
                    window.localStorage.setItem('pacienteList', '[]');
                }

                return raw;
            } catch (err) {
                console.error(err);

                return [];
            }
        },
        savePaciente: function (paciente) {
            // Apaga a versão antiga se existir
            this.deletePaciente(paciente);
            var pacienteList = JSON.parse(window.localStorage.getItem('pacienteList'));
            // Grava a versão nova
            pacienteList.push(paciente);
            window.localStorage.setItem('pacienteList', JSON.stringify(pacienteList));
        },
        deletePaciente: function (paciente) {
            var tmp = window.localStorage.getItem('pacienteList');
            if ((tmp == null) || (tmp == '')) {
                tmp = '[]';
            }
            var pacienteList = JSON.parse(tmp);
            pacienteList = pacienteList.filter((element) => {
                if (element.id.value != paciente.id.value) {
                    return element;
                } else {
                    console.warn('Eliminando item e gravando');
                }
            });
            window.localStorage.setItem('pacienteList', JSON.stringify(pacienteList));
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