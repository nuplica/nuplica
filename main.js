/*------------------------------------------------------------------------------
------------------------------------------------------------------------------*/

let MQ = MathQuill.getInterface(2);

let inputElement = document.querySelector('.user-input');

let inputMQObject = MQ.MathField(inputElement, {restrictMismatchedBrackets: true});

let outputField = document.querySelector('.output-field');


inputElement.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    
    let cardBox = document.createElement('li');
    cardBox.setAttribute('class', 'card-box');
    let mathContainer = document.createElement('div');
    cardBox.appendChild(mathContainer);
    mathContainer.setAttribute('class', 'math-container');
    let latexInput = inputMQObject.latex();
    console.log(latexInput);
    let newMathExpression = MQ.MathField(mathContainer);
    newMathExpression.latex(latexInput);

    
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete-btn');
    cardBox.appendChild(deleteBtn);
    deleteBtn.innerHTML = 'x';
    outputField.appendChild(cardBox);
    outputField.scrollTop = outputField.scrollHeight;
    inputMQObject.latex('');
    anime({
      targets: [mathContainer],
      translateY: [-10, 0],
      scale: [0.1, 1],
      duration: 350,
      easing: 'easeOutExpo',
    });
    anime({
      targets: [deleteBtn],
      translateY: [-10, 0],
      translateX: [-200,0],
      scale: [0.1, 1],
      duration: 350,
      easing: 'easeOutExpo',
    });
    newMathExpression.reflow();
  }
});

outputField.addEventListener('click', e => {
  if(e.target.classList.contains('delete-btn')) {
    anime({
      targets: [e.target.previousSibling],
      translateY: [0, -10],
      scale: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
    });

    anime({
      targets: [e.target],
      translateY: [0, -10],
      translateX: [0,-220],
      scale: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
    });

    anime({
      targets: e.target.parentElement,
      height: ['100%', '0%'],
      opacity: [1, 0],
      duration: 250,
      easing: 'easeOutQuart',
      complete: () => {
        e.target.previousSibling.remove();
        e.target.parentElement.remove();
      }
    });
  }
});