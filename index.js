const numberBtns = document.querySelectorAll('[data-numbers]')

const operationBtns = document.querySelectorAll('[data-operation]')

const hidden = document.querySelector('.hidden').textContent

const allClearBtn = document.querySelector('[data-all-clear]')

const deleteBtn = document.querySelector('[data-delete]')

const equalBtn = document.querySelector('[data-equals]')

const previousInputBtn = document.querySelector('[data-previous-input]')

const currentInputBtn = document.querySelector('[data-current-input]')


class Calculator {
    constructor(previousInputBtn, currentInputBtn){
        this.previousInputBtn = previousInputBtn,
        this.currentInputBtn = currentInputBtn,
        this.clear()
    }

    clear(){
        this.previousInput = ''
        this.currentInput = ''
        this.currentOperation = undefined
    }

    appendNumber(number){
        if(number === '.' & this.currentInput.includes('.')) return;
        this.currentInput = this.currentInput.toString() + number.toString()
    }

    operations(operation){
        if(this.currentInput === '') return
        if(this.previousInput !== ''){
            this.calculate()
        }
        
        this.currentOperation = operation
        this.previousInput = `${this.currentInput} ${this.currentOperation}`
        this.currentInput = ''
    }

    calculate(){
        let result
        this.prev = parseFloat(this.previousInput)
        this.current = parseFloat(this.currentInput)
        if(isNaN(this.currentInput) || isNaN(this.prev)) return

        switch(this.currentOperation){
            case '+':
                result = this.prev + this.current
                break
            
            case '-':
                result = this.prev - this.current
                break

            case '÷':
                result = this.prev / this.current
                break

            case '×':
                result = this.prev * this.current
                break

            default:
                break
        }

        this.currentInput = result
        this.previousInput = ''
        this.currentOperation = undefined
    }

    delete(){
        this.currentInput = this.currentInput.slice(0, -1)
    }

    update(){
        this.previousInputBtn.innerText = this.previousInput;
        this.currentInputBtn.innerText = this.currentInput;
    }
}

const calculator = new Calculator(previousInputBtn, currentInputBtn)

numberBtns.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.textContent);
        calculator.update()
    })
})

allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
})

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener('click', () => {
        calculator.operations(operationBtn.childNodes[0].textContent)
        calculator.update()
    })
})

equalBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.update()
})
