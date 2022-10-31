import { useEffect, useState } from "react";

export const useAddToHome = () => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
      console.log('run add home ');
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("beforeinstallprompt is runed");
      event.preventDefault();
      setPrompt(event);
    });

    // return () => {
    //   window.removeEventListener("beforeinstallprompt", (event) => {
    //     console.log("beforeinstallprompt is runed");
    //     event.preventDefault();
    //     setPrompt(event);
    //   });
    // };
  }, []);

  return[prompt]
};

export default useAddToHome