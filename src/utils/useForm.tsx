import {useState} from "react";

// @ts-ignore
export function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);
    // @ts-ignore
    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}