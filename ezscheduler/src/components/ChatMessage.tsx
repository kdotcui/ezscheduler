import type { Message } from '@/types/message';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : isError
            ? 'bg-red-100 text-red-800 border border-red-300'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : isError ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-gray-600 mb-2">Generated Calendar Event:</p>
            <pre className="text-xs overflow-x-auto bg-white p-3 rounded border border-gray-300">
              <code>{JSON.stringify(message.event, null, 2)}</code>
            </pre>
          </div>
        )}
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : isError ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}

