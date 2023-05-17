import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface EditorProps {
  onChange?: Function,
  language?: string,
  code?: string,
  theme?: string
}

const EditorProps = ({ onChange, language, code }: EditorProps) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange!("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-y-auto w-full h-[300px]  shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={'vs-dark'} 
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default EditorProps;