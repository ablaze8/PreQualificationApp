﻿(function () {
	'use strict';

	angular
		.module('app')
		.directive('viewCr', viewCr);

	viewCr.$inject = ['$timeout'];

	function viewCr($timeout) {
		// Usage:
		//     <view-cr></view-cr>
		// Creates:
		// 
		var directive = {
			scope: {
				cr: '='
			},
			link: link,
			templateUrl: rootUrl + 'Scripts/App/templates/Support/ViewCrTemplate.html',
			restrict: 'A'
		};
		return directive;

		function link($scope, element, attrs) {
			$scope.showDetail = function (id) {
				if (id != null || id != undefined) {
					$('#crDetailModal').modal('show');
				}
			};

			$('#crDetailModal').on('hidden.bs.modal', function () {
				// remedy $scope.$apply() along with the code above :
				$timeout(function () {
					// anything you want can go here and will safely be run on the next digest.
					$scope.cr = {};
				});
			});

			$scope.$watch('cr', function () {
				if ($scope.cr == undefined || $scope.cr == null) {
					return;
				}
				$scope.showDetail($scope.cr.Id)
			});
		}
	}
})();