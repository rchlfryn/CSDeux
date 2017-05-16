angular.module('starter.controllers', [])
    .controller('AppCtrl', ['getDataSvc', '$scope', '$ionicModal', '$timeout', '$http', function(getDataSvc, $scope, $ionicModal, $timeout, $http) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:

      // Camp date data
      var campLiveUrl = 'http://rachelfryan.com/CampShutout/camps.json';
      var campLocalUrl = "js/json/camps.json";
      $scope.data = [];
      $scope.$on('$ionicView.enter', function(e) {
        getDataSvc.GetData(campLocalUrl, campLocalUrl).then(function(jsonData) {
          $scope.data = jsonData;
        });
      });

      $scope.openPage = function(site) {
        window.open(site, '_system', 'location=yes');
      }
      $scope.doRefresh = function() {
        getDataSvc.GetData(campLocalUrl, campLocalUrl).then(function(jsonData) {
          $scope.data = jsonData;
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

    }])

    .controller('DashboardCtrl', function (ScoresModel, $rootScope) {
        var vm = this;

        function getAll() {
            ScoresModel.all()
                .then(function (result) {
                    vm.data = result.data.data;
                });
        }

        function clearData(){
            vm.data = null;
        }

        function create(object) {
            ScoresModel.create(object)
                .then(function (result) {
                    cancelCreate();
                    getAll();
                });
        }

        function update(object) {
            ScoresModel.update(object.id, object)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function deleteObject(id) {
            ScoresModel.delete(id)
                .then(function (result) {
                    cancelEditing();
                    getAll();
                });
        }

        function initCreateForm() {
            vm.newObject = {name: '', description: ''};
        }

        function setEdited(object) {
            vm.edited = angular.copy(object);
            vm.isEditing = true;
        }

        function isCurrent(id) {
            return vm.edited !== null && vm.edited.id === id;
        }

        function cancelEditing() {
            vm.edited = null;
            vm.isEditing = false;
        }

        function cancelCreate() {
            initCreateForm();
            vm.isCreating = false;
        }

        vm.objects = [];
        vm.edited = null;
        vm.isEditing = false;
        vm.isCreating = false;
        vm.getAll = getAll;
        vm.create = create;
        vm.update = update;
        vm.delete = deleteObject;
        vm.setEdited = setEdited;
        vm.isCurrent = isCurrent;
        vm.cancelEditing = cancelEditing;
        vm.cancelCreate = cancelCreate;
        vm.isAuthorized = false;

        $rootScope.$on('authorized', function () {
            vm.isAuthorized = true;
            getAll();
        });

        $rootScope.$on('logout', function () {
            clearData();
        });

        if(!vm.isAuthorized){
            $rootScope.$broadcast('logout');
        }

        initCreateForm();
        getAll();

    });

