import "./styles.css";
import React, { useEffect, useState } from 'react';
import { cleanDocx } from '@prezly/docx-cleaner';

// https://www.npmjs.com/package/@prezly/docx-cleaner 
const MyComponent = ({value, setValue}) => {    
    function handlePaste(event) {        
        const html = event.clipboardData.getData('text/html');
        const rtf = event.clipboardData.getData('text/rtf');
        try {
            const cleanHtml = cleanDocx(html, rtf);
            setValue(cleanHtml);
        } catch (error) {
            setValue(error.message);
            console.error(error);
        }
    };
    return <textarea rows="10" cols="80" value={value} onPaste={handlePaste} />;
};

export default function App() {
  const [value, setValue] = useState('');
  useEffect(() => {
      if (value) console.log(value)
  }, [value])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <MyComponent value={value} setValue={setValue} />      
      <div dangerouslySetInnerHTML={{__html: value}} />
    </div>
  );
}
