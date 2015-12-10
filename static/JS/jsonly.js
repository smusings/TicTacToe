var XOX = angular.module('XOX', []);

XOX.config(['$interpolateProvider', function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
}]);	//Jinja uses {{}} so we will use {[]} for angularJS


XOX.controller('myController', function($scope, $http){

	$scope.board = [
		{value: '-'}, {value: '-'}, {value: '-'},
		{value: '-'}, {value: '-'}, {value: '-'},
		{value: '-'}, {value: '-'}, {value: '-'}]


	$scope.xCount = 0;
	$scope.oCount = 0;
	$scope.move = function(index, value)
	{
		$scope.board[index].value = 'X';
		$scope.xCount++;

		var range = $scope.board.length;
		$scope.checkGameOver(range);
		if(($scope.xCount + $scope.oCount) < 8)
		{
			$scope.aiMove(range);
		}
		else
		{
			alert("game over!");
		}
	}

	$scope.aiMove = function(range)
	{
		var move = Math.floor((Math.random() * range) + 1);

		if($scope.board[move] != null && $scope.board[move].value == '-')
		{
			$scope.board[move].value = '0'
			$scope.oCount++;
		}
		else
		{
			$scope.aiMove(range);
		}
	}

	$scope.checkGameOver = function(range)
	{
		console.log("check");
		console.log($scope.board[1] != '-');
		console.log($scope.board[1] != '-');
		console.log($scope.board[1] != '-');
		if($scope.board[1].value != '-' && $scope.board[0].value == $scope.board[1].value && $scope.board[1].value == $scope.board[2].value)
		{
			alert("Game Over")
		}
	}

	});
