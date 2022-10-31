import { useState, useEffect } from "react";

const useSessionStorage = (name) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (window) { 
        setValue(sessionStorage.getItem(name))
    }
}, []);

  return value
}

export default useSessionStorage