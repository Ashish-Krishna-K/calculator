# calculator

[Live Demo](https://ashish-krishna-k.github.io/calculator/)

A basic Calculator app completed as The Odin Project Foundations section final project. Utilizes HTML, CSS and JavaScript.

*This project was initially completed during my first run of the oding project curriculum when I was still learning. During my second run I have reworked all the projects, this time with more knowledge/skills of advanced concepts. I chose to use TypeScript on all the revisited projects as a learning experience.*

The script.ts file starts off by declaring all the variables connecting to corresponding DOM elements, then we declare the gloabal variables which acts as pseudo-state and finally we declare two arrays that holds numbers and operators we use this while handling keyboard input.

Next we create the functions that handle addition, subtraction, multiplication and division. The division function also handles an edge case where the user would try to divide a number by 0 by returning an error message instead.

Next we have the operate helper function, the sole purpose of this function is to determine which of the four calculation functions to call based on the passed operator argument.

Our UI has a display which is split into two sections the lower display to display the current typed inputs and calculation results, the upper display to display a track of the current calculation methods. We use the updateLowerDisplay and updateUpperDisplay functions, to update these two displays as needed.

The doCalculation helper function will take in the left and right operands and the opertaor and does the corresponding calculation by calling the operate function, it then updates the global pseudo-state variables and the corresponding display.

The handleNumberKeyPress function is an event handler that updates the displayNumber pseudo-state and updates the lowerDisplay with the typed values.

The handleOperatorKeyPress handles the most complicated part of the project i.e., the logic of calculating only 2 numbers at time.(Admittedly I should be extracting that logic to it's own function to make sure the handleOperatorKeyPress is handling the only responsibility of operator key press, any feedback on better organization of this function is highly appreciated). This function fill first check if the prevNumber pseudo state is null, if it is null it will update the pseudoState with value present in the displayNumber variable, if this is a string like the error message displayed when trying to divide a number by 0, it will instead update prevNumber with 0. Next it will reset the displayNumber pseudo state, update the operator pseudo state and updates the upper Display and returns. If the prevNumber already has a value it will call the doCalculation function with prevNumber as leftOperand and current value of displayNumber as rightOperand, then updates resets the displayNumber variable, updates the operator pseudo state(in the case the operator key is pressed a second time) and also the upperdisplay.

The handleEqualKeyPress will first check if the prevNumber, operator and displayNumber pseudo states are null, which would mean the user has clicked the equal key before inputing any number/operator and will simply return. If these pseudoStates have a value then it will call the doCalulation function and updates the uperDisplay and reset the prevNumber and operator pseudo states.

The handleClearBtn function is supposed to reset all the variables to their default state i just chose to refresh the page instead for simplicity.

The handleDeleteBtn will remove the last element from the displayNumber string.

The handleKeyboardInput is a helper function, it will first determine if the key pressed is a number, operator, decimal, enter or backspace and call the appropriate functions.

Finally we tie up the event handlers to the respective event listeners, here I chose to put the keydown event listener to the document object so we can listen to a key press without first focusing on any element.