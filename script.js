let display = document.getElementById('display');
let historyList = document.getElementById('history');
let memoryValue = 0;


window.onload = loadHistory;


document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => appendToDisplay(button.dataset.number));
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => appendToDisplay(` ${button.dataset.operator} `));
});

document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', calculateResult);


document.getElementById('mPlus').addEventListener('click', () => memoryValue += parseFloat(display.value || 0));
document.getElementById('mMinus').addEventListener('click', () => memoryValue -= parseFloat(display.value || 0));
document.getElementById('mr').addEventListener('click', () => (display.value = memoryValue));
document.getElementById('mc').addEventListener('click', () => (memoryValue = 0));


document.getElementById('clearHistory').addEventListener('click', clearHistory);
historyList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    display.value = e.target.textContent;
  }
});


function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculateResult() {
  try {
    const result = eval(display.value.replace('÷', '/').replace('×', '*'));
    display.value = result;
    saveToHistory(`${display.value}`);
  } catch (e) {
    display.value = 'Error';
  }
}

function saveToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
  saveHistory();
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function saveHistory() {
  const entries = Array.from(historyList.querySelectorAll('li')).map(li => li.textContent);
  localStorage.setItem('calculatorHistory', JSON.stringify(entries));
}

function clearHistory() {
  historyList.innerHTML = '';
  localStorage.removeItem('calculatorHistory');
}


window.addEventListener('keydown', (e) => {
  if (!isNaN(e.key) || ['+', '-', '*', '/'].includes(e.key)) {
    appendToDisplay(e.key);
  } else if (e.key === 'Enter') {
    calculateResult();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
