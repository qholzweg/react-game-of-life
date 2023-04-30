import { useState } from "react";

export function useForm<T,>(inputValues:T, onChange:Function|null = null) {
  const [form, setValue] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValue({...form, [name]: value});
    if (typeof onChange === 'function') onChange();
  };
  return {form, handleChange, setValue};
}