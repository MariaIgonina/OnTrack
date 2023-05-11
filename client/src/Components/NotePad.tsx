import { useState, useEffect } from "react";

export default function NotePad(): JSX.Element {
  const [note, setNote] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  useEffect(() => {
    console.log('this goes to the DB => ', note)
  }, [isFocused])

  return (
    // <div id="note-container" className="flex flex-col w-full max-w-lg mx-auto p-4 space-y-4">
    <div className="flex space-x-2 h-12 max-h-12">
      <textarea
        id="notePad"
        name="notePad"
        rows={4}
        className="border border-gray-300 py-2 flex-1 bg-stone-100 rounded-lg shadow-md shadow-gray max-h-[32rem]"
        style={{ height: '400px' }}
        placeholder="Notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></textarea>
    </div>
    // </div >
  );
}
