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


	$scope.xCount = [];
	$scope.oCount = [];

	$scope.move = function(index, value)
	{
		$scope.board[index].value = 'X';
		$scope.xCount.push(Number(index));

		var range = $scope.board.length;
		
		$scope.checkGameOver(range);

		if(($scope.xCount.length + $scope.oCount.length) < 8)
		{
			$scope.aiNoLose(range);
		}
		else
		{
			alert("game over!");
		}
	}

	$scope.aiNoLose = function(range)
	{
		var moved = false;
		
		$scope.xCount.forEach(function(item, index, array) {
			if($scope.xCount.indexOf(item+1)>0 && $scope.oCount.indexOf(item+2)<0)
			{
				$scope.board[item+2].value = 'O';
				$scope.oCount.push(item+2)
				moved = true;
			}
		})

		console.log(moved);
		if(!moved)
		{
			$scope.aiMove(range);
		}
	}

	$scope.aiMove = function(range)
	{
		var move = Math.floor((Math.random() * range) + 1);

		if($scope.board[move] != null && $scope.board[move].value == '-')
		{
			$scope.board[move].value = 'O';
			$scope.oCount.push(move)
		}
		else
		{
			$scope.aiMove(range);
		}
	}

	$scope.checkGameOver = function(range)
	{
		for(i=0; i<7; i+=3)	//row
		{
			if($scope.board[i+1].value != '-' && $scope.board[i].value == $scope.board[i+1].value && $scope.board[i+1].value == $scope.board[i+2].value)
			{
				alert("Game Over!");
				$scope.gameOver();
			}
		}

		for(i=0; i<3; i++)	//column
		{
			if($scope.board[i+3].value != '-' && $scope.board[i].value == $scope.board[i+3].value && $scope.board[i+3].value == $scope.board[i+6].value)
			{
				alert("Game Over!");
				$scope.gameOver();
			}
		}

		if($scope.board[4].value != '-' && (($scope.board[0].value == $scope.board[4].value && $scope.board[4].value == $scope.board[8].value) 
			|| ($scope.board[2].value == $scope.board[4].value && $scope.board[4].value == $scope.board[6].value)))
		{
			alert("Game Over!");
			$scope.gameOver();
		}
	}

	$scope.gameOver = function()
	{

		var range = $scope.board.length;
		for(i = 0; i<range; i++)
		{
			if($scope.board[i].value == '-')
			{
				$scope.board[i].value = '_';
			}
		}
	}

	});
