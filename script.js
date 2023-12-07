const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const currentScreenTextElement = document.querySelector("[data-current-operand]")
const previousScreenTextElement = document.querySelector("[data-previous-operand]")

class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) {
        this.currentScreenTextElement = currentScreenTextElement
        this.previousScreenTextElement = previousScreenTextElement
        this.clear()
        this.registerEventListeners()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        this.updateDisplay()
    }

    flushOperator(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
        this.updateDisplay()
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = previous + current
                break

            case "-":
                computation = previous - current
                break

            case "*":
                computation = previous * current
                break

            case "÷":
                computation = previous / current
                break

            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
        this.updateDisplay()
    }

 
updateDisplay() {
    const formattedCurrentOperand = this.formatNumber(this.currentOperand)
    this.currentScreenTextElement.innerText = formattedCurrentOperand

    if (this.operation != null) {
        const formattedPreviousOperand = this.formatNumber(this.previousOperand)
        this.previousScreenTextElement.innerText = `${formattedPreviousOperand} ${this.operation}`
    } else {
        this.previousScreenTextElement.innerText = ""
    }
}

formatNumber(number) {
    const parts = number.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
}
    registerEventListeners() {
        numberButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.appendNumber(button.innerText)
            })
        })

        operationButtons.forEach(button => {
            button.addEventListener("click", () => {
                this.flushOperator(button.innerText)
            })
        })

        equalsButton.addEventListener("click", () => {
            this.compute()
        })

        deleteButton.addEventListener("click", () => {
            this.delete()
        })

        allClearButton.addEventListener("click", () => {
            this.clear()
            this.updateDisplay()
        })
    }
}

const calculator = new Calculator(currentScreenTextElement, previousScreenTextElement)
