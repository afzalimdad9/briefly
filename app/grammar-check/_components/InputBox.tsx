"use client";

import { useEffect } from 'react';
import { Textarea } from '../../../components/ui/textarea';
import { useInputText, useIsLoading, useTransInputWordCount } from '../../../store';

const InputBox = () => {

    const { inputText, setInputText } = useInputText();

    const { loading } = useIsLoading();

    const { setWordCount } = useTransInputWordCount();

    useEffect(() => {
        const words = inputText.split(/\s+/).filter((word) => word.length > 0);
        setWordCount(words.length);
    }, [inputText, setWordCount]);

    return (
        <div className="relative h-full max-h-full overflow-y-scroll">
            <Textarea
                value={inputText ?? ""}
                onChange={(e) => setInputText(e.target.value)}
                disabled={loading}
                placeholder="Enter or Paste your text here..."
                className="w-full h-full text-base bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-transparent disabled:opacity-70 focus-visible:outline-none focus-visible:ring-transparent"
            />
        </div>
    )
}

export default InputBox
