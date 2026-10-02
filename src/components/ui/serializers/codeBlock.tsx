import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
      {value.filename && (
        <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 font-mono">
          {value.filename}
        </div>
      )}
      <SyntaxHighlighter
        language={value.language || 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.9rem',
          borderRadius: 0,
        }}
        showLineNumbers
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}