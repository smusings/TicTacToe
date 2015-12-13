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

	$scope.xCount 		 = 0;
	$scope.oCount 		 = 0;
	$scope.suggestedMove = -1;

	$scope.move = function(index, value)
	{
		$scope.board[index].value = 'X';
		$scope.xCount++;

		var range = $scope.board.length;
		
		$scope.checkGameOver(range);

		if(($scope.xCount + $scope.oCount) < 8)
		{
			$scope.aiNoLose(range);
		}
	}

	$scope.aiNoLose = function(range)
	{
		$scope.evalMove(0,1,2);	// row 1
		$scope.evalMove(3,4,5);	// row 2
		$scope.evalMove(6,7,8); // row 3
		$scope.evalMove(0,3,6); // col 1
		$scope.evalMove(1,4,7); // col 2
		$scope.evalMove(2,5,8); // col 3
		$scope.evalMove(0,4,8); // diagonal left to right
		$scope.evalMove(2,4,6); // diagonal right to left
		

		if($scope.suggestedMove == -1)
		{
			$scope.aiMove(range);
		}
		else
		{
			$scope.board[$scope.suggestedMove].value = 'O';
			$scope.suggestedMove = -1;
			$scope.oCount++;
			if($scope.board[$scope.suggestedMove].value == 'O')
			{
				$scope.checkGameOver(range);
			}
		}
	}

	$scope.evalMove = function(a, b, c)
	{
		var item1 = $scope.board[a].value;
		var item2 = $scope.board[b].value;
		var item3 = $scope.board[c].value;
		var move  = -1;

		if(item1 == 'X')
		{
			if(item2=='X' && item3 == '-')
			{
				move = c;
			}
			else if(item3 == 'X' && item2 == '-')
			{
				move = b;
			}
		}
		else if(move == -1 && item2 == 'X')
		{
			if(item3 == 'X' && item1 == '-')
			{
				move = a;
			}
		}

		if(move != -1)
		{
			$scope.suggestedMove = move;
		}
	}

	$scope.aiMove = function(range)
	{
		var move = Math.floor((Math.random() * range) + 1);

		if($scope.board[move] != null && $scope.board[move].value == '-')
		{
			$scope.board[move].value = 'O';
			$scope.oCount++;
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
				alert("Game Over!!");
				$scope.gameOver();
			}
		}

		if($scope.board[4].value != '-' && (($scope.board[0].value == $scope.board[4].value && $scope.board[4].value == $scope.board[8].value) 
			|| ($scope.board[2].value == $scope.board[4].value && $scope.board[4].value == $scope.board[6].value)))
		{
			alert("Game Over!!!");
			$scope.gameOver(range);
		}
	}

	$scope.gameOver = function(range)
	{
		for(i = 0; i<range; i++)
		{
			if($scope.board[i].value == '-')
			{
				$scope.board[i].value = '_';
			}
		}
	}

});
