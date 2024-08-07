const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)
const getText = $$(".text1, .text2")
const inputs = $$(".textLowerCase, .noSpaces")
const equal = $(".equal")
const notEqual = $$(".notEqual_1, .notEqual_2")
const checkButton = $(".compareBtn")
const clearData = $(".clearBtn")
const colors = ["#333", "#4e905d"]
const placeholder = [
  "Paste one version of a text here.",
  "Paste another version of the text here."
]

let a = ""
let b = ""
let result = []
let flag
let noSpace

function setCursorToEnd(element) {
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(element)
  range.collapse(false)
  sel.removeAllRanges()
  sel.addRange(range)
}

function handleInput(event, placeholderIndex, variable, equal, notEqual, getText) {
  const currentPlaceholder = placeholder[placeholderIndex]

  if (event.target.textContent.includes(placeholder[placeholderIndex])) {
    event.target.textContent = event.target.textContent.replace(currentPlaceholder, "")
  }

  if (variable === 'a') {
    a = event.target.textContent
  } else if (variable === 'b') {
    b = event.target.textContent
  }

  equal.style.visibility = "hidden"
  notEqual.forEach(el => el.style.visibility = "hidden")

  if (event.target.textContent === "") {
    event.target.textContent = currentPlaceholder
  }

  setCursorToEnd(getText[placeholderIndex])
}

const showEqual = (op) => {
  if (op) {
    notEqual.forEach(el => el.style.visibility = "hidden")
    equal.style.visibility = "visible"
  } else {
    equal.style.visibility = "hidden"
    notEqual.forEach(el => el.style.visibility = "visible")
  }
}

const textCompare = () => {
  // reset
  result = []
  notEqual[0].textContent = ""
  notEqual[1].textContent = ""
  a = getText[0].textContent
  b = getText[1].textContent

  if (flag) {
    a = a.toLowerCase()
    b = b.toLowerCase()
  }

  if (noSpace) {
    a = a.trim()
    b = b.trim()
  }

  if (a === b && a !== "" && b !== "") {
    equal.style.visibility = "hidden"
    checkButton.setAttribute("disabled", "")
    checkButton.style.backgroundColor = colors[0]
    setTimeout(() => {
      showEqual(true)
      checkButton.style.backgroundColor = colors[1]
      checkButton.removeAttribute("disabled")
    }, 2000)
  } else if (a !== b && a !== "" && b !== "") {
    showEqual(false)
    let A = a.split("").filter((current, index) => current !== b[index])
    let B = b.split("").filter((current, index) => current !== a[index])

    notEqual[0].value = A
    notEqual[1].value = B
  }
}

checkButton.addEventListener("click", textCompare)

clearData.addEventListener(("click"), () => {
  result = []
  a = ""
  b = ""
  getText.forEach(el => el.innerHTML = "")
  notEqual.forEach(el => el.style.visibility = "hidden")
  equal.style.visibility = "hidden"
})

inputs[0].addEventListener("change", (event) => {
  event.target.checked === true ? flag = true : flag = false
})

inputs[1].addEventListener("change", (event) => {
  event.target.checked === true ? noSpace = true : noSpace = false
})

getText[0].addEventListener("input", (event) => handleInput(event, 0, 'a', equal, notEqual, getText))
getText[1].addEventListener("input", (event) => handleInput(event, 1, 'b', equal, notEqual, getText))