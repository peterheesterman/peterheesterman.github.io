var app = {
    show: function (inputs) {

        if(!document.getElementById('mainChessBoard')) {
            return;
        }

        // Clear the old board.
        document.getElementById('mainChessBoard').innerHTML = "";

        // If not inputs are give place queens on the diagonal.
        if(!inputs) {
            inputs = [1,2,3,4,5,6,7,8,9];
        }

        var gridSize = 8;

        for (var i=0; i< gridSize; i++){
            for (var j=0; j< gridSize; j++){

                // Construct Grid
                var color =  parseInt(j + i) % 2 == 0 ? '#ababab' : 'white';

                // Place a queen
                if(inputs[j]-1===i){
                    color = 'black';
                }

                document.getElementById('mainChessBoard').appendChild(
                    document.createElement('div')
                ).style.backgroundColor = color;
            }
        }
    },
    placeQueens: function () {
        var constants = {
            boardSize : 8,
            maxSteps: 100000
        };

        var variables = {
            solution : [1,2,3,4,5,6,7,8],
            solutionScore : 100,
            steps : 0
        };

        var checkDiagonals = function(solution,boardSize) {
            var conflicts = 0;
            var dx = [-1, 1, -1, 1], dy = [-1, 1, 1, -1];
            var currentQueenX, currentQueenY;
            var otherQueenX, otherQueenY;
            var tempX, tempY;

            for(var i=0; i < boardSize;i++){
                currentQueenX = i;
                currentQueenY = solution[i]-1;

                for(var dir = 0; dir < 4; dir++){
                    tempX = currentQueenX;
                    tempY = currentQueenY;

                    while(1){
                        tempX+=dx[dir];
                        tempY+=dy[dir];

                        if(tempX < 0 || tempX >= boardSize || tempY < 0 || tempY >= boardSize ) {
                            break;
                        }

                        for(var j=0; j < boardSize;j++){
                            otherQueenX = j;
                            otherQueenY = solution[j]-1;
                            if(tempX==otherQueenX && tempY==otherQueenY) {
                                conflicts++;
                            }
                        }
                    }
                }
            }
            return conflicts/2;
        };

        var makeSolution = function (boardSize) {
            var set = [], solution = [];

            // Add all the positions
            for(var i = 0; i < boardSize; i++){
                set.push(i+1);
            }

            // Pick Places
            for(var i = 0; i < boardSize; i++){
                var selectedSpot = Math.floor(Math.random()*set.length);
                var selectedElement = set.splice(selectedSpot,1);
                solution.push(selectedElement[0]);
            }

            return solution;
        };


        do {
            var tempSolution = makeSolution(constants.boardSize);
            var tempScore = checkDiagonals(tempSolution,constants.boardSize);
            if(tempScore==0){
                variables.solution = tempSolution;
                break;
            }

            if(variables.solutionScore > tempScore){
                variables.solutionScore = tempScore;
                variables.solution = tempSolution;
            }

            variables.steps++;
            if(variables.steps > constants.maxSteps){
                break;
            }

        } while (1);

        this.show(variables.solution);
        //console.log('The solution : ',variables.solution);
        //console.log('It took ' + variables.steps +' steps');

    },
    kick: function () {
        this.placeQueens();
        var self = this;
        window.setInterval(function(){
                self.placeQueens();
        }, 400);
    },
    test: function () {
        console.log('Yay you ran the test!');
    }
};
