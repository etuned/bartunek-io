import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeValue {
  _type: 'code'
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ value }: { value: CodeValue }) {
  if (!value?.code) {
    return null
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-800">
      {value.language && (
        <div className="flex space-between bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono">
          <span>{value.language}</span>
          <span>"hello"</span>
        </div>
      )}
      <SyntaxHighlighter
        language={value?.language || 'text'}
        style={docco}
        customStyle={{
          borderRadius: 0,
        }}
        showLineNumbers
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}