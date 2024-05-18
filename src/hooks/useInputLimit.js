import { ref, computed } from 'vue'

const useInputLimit = (maxLimit) => {
  const inputValue = ref('')
  const valueLimit = maxLimit

  const changeValue = (event) => {
    if (event.inputType === 'deleteContentBackward') {
      inputValue.value = event.target.value
      return
    }
    if (event.inputType === 'insertFromPaste') {
      if (event.target.value.length >= valueLimit) {
        alert(`${valueLimit}자까지 입력할 수 있습니다.`)
        event.target.value = inputValue.value
        return
      }
    }
    if (valueLength.value >= valueLimit) {
      alert(`${valueLimit}자까지 입력할 수 있습니다.`)
      event.target.value = inputValue.value
      return
    }
    inputValue.value = event.target.value
  }

  const valueLength = computed(() => {
    return inputValue.value.length
  })
  return { inputValue, valueLimit, valueLength, changeValue }
}

export default useInputLimit
