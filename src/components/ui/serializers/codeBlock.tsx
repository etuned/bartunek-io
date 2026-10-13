import { IconCopy, IconCopyCheckFilled } from '@tabler/icons-react';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeValue {
	_type: 'code';
	code: string;
	language?: string;
	filename?: string;
}

export function CodeBlock({ value }: { value: CodeValue }) {
	const [copied, setCopied] = useState<boolean>(false);

	if (!value?.code) {
		return null;
	}

	return (
		<div className="my-4 rounded-lg overflow-hidden border border-gray-800">
			{value.language && (
				<p className="grid grid-cols-[1fr_auto_auto] gap-4 bg-gray-900 text-gray-300 text-xs px-4 py-2 font-mono">
					<span>{value.filename}</span>
					<span className="text-gray-500">{value.language}</span>
					<button
						type="button"
            aria-description='Click to copy the code below'
						onClick={() =>
							navigator?.clipboard
								?.writeText(value?.code)
								.finally(() => setCopied(true))
						}
					>
						{copied ? <IconCopyCheckFilled /> : <IconCopy />}
					</button>
				</p>
			)}
			<SyntaxHighlighter
				language={value?.language || 'text'}
				style={dracula}
				customStyle={{
					borderRadius: 0,
				}}
				showLineNumbers
			>
				{value.code}
			</SyntaxHighlighter>
		</div>
	);
}
