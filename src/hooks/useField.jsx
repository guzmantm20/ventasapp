import { useState } from "react"
export const useField = ({keyboardType='default', label}) => {
    const [value, setValue] = useState()
    const onChange = e => {
        setValue(e.nativeEvent.text)
    }
    const clearValue = () => setValue('')

    return {keyboardType, value, onChange, label, clearValue}
}