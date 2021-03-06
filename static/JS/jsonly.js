var XOX = angular.module('XOX', []);

XOX.config(['$interpolateProvider', function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
}]);	//Jinja uses {{}} so we will use {[]} for angularJS


XOX.controller('myController', function($scope, $http) {

	$scope.suggestedMove = -1;
	$scope.board 		 = [
		{value: '-'}, {value: '-'}, {value: '-'},
		{value: '-'}, {value: '-'}, {value: '-'},
		{value: '-'}, {value: '-'}, {value: '-'}];
	$scope.range 		 = $scope.board.length;
	$scope.isGameOver    = false;     


	$scope.move = function(index, value)
	{
		$scope.board[index].value = 'X';

		$scope.checkGameOver($scope.range);
		if(!$scope.isGameOver)
		{
			$scope.aiNoLose('O');
		}
	}

	$scope.aiNoLose = function(param)
	{
		$scope.suggestedMove = -1;

		$scope.evalMove(0,1,2,param); // row 1
		$scope.evalMove(3,4,5,param); // row 2
		$scope.evalMove(6,7,8,param); // row 3
		$scope.evalMove(0,3,6,param); // col 1
		$scope.evalMove(1,4,7,param); // col 2
		$scope.evalMove(2,5,8,param); // col 3
		$scope.evalMove(0,4,8,param); // diagonal left to right
		$scope.evalMove(2,4,6,param); // diagonal right to left
		
		if($scope.suggestedMove == -1)
		{
			if(param == 'O')
			{
				$scope.aiNoLose('X')
			}
			else
			{
				$scope.aiRandomMove($scope.range);
			}
		}
		else if($scope.suggedtMove != -1)
		{
			$scope.board[$scope.suggestedMove].value = 'O';
			$scope.checkGameOver($scope.range);
		}
	}

	$scope.aiRandomMove = function()
	{
		var move = Math.floor((Math.random() * $scope.range) + 1);

		if($scope.board[move] != null && $scope.board[move].value == '-')
		{
			$scope.board[move].value = 'O';
		}
		else
		{
			$scope.aiRandomMove($scope.range);
		}
	}

	$scope.evalMove = function(a, b, c, param)
	{
		var item1 = $scope.board[a].value;
		var item2 = $scope.board[b].value;
		var item3 = $scope.board[c].value;
		var move  = -1;
		
		if($scope.suggestedMove == -1)	//about to win check
		{				
			if(item1 == param)
			{
				if(item2==param && item3 == '-')
				{
					move = c;
				}
				else if(item3 == param && item2 == '-')
				{
					move = b;
				}
			}
			else if(move == -1 && item2 == param)
			{
				if(item3 == param && item1 == '-')
				{
					move = a;
				}
			}
		}

		if(move != -1)
		{
			$scope.suggestedMove = move;
		}
	}

	$scope.checkGameOver = function()
	{
		for(i=0; i<7; i+=3)	//row
		{
			if($scope.board[i+1].value != '-' && $scope.board[i].value == $scope.board[i+1].value && $scope.board[i+1].value == $scope.board[i+2].value)
			{
				alert("Game Over!");
				$scope.gameOver();
				break;
			}
		}

		for(i=0; i<3; i++)	//column
		{
			if($scope.board[i+3].value != '-' && $scope.board[i].value == $scope.board[i+3].value && $scope.board[i+3].value == $scope.board[i+6].value)
			{
				alert("Game Over!");
				$scope.gameOver();
				break;
			}
		}

		if($scope.board[4].value != '-' && (($scope.board[0].value == $scope.board[4].value && $scope.board[4].value == $scope.board[8].value) 
			|| ($scope.board[2].value == $scope.board[4].value && $scope.board[4].value == $scope.board[6].value)))
		{
			alert("Game Over!");
			$scope.gameOver($scope.range);
		}
	}

	$scope.gameOver = function()
	{
		for(i = 0; i<$scope.range; i++)
		{
			if($scope.board[i].value == '-')
			{
				$scope.board[i].value = '_';
			}
		}
		$scope.isGameOver = true
	}

});
