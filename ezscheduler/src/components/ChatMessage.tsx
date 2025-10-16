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
        className={`max-w-[80%] rounded-xl px-4 py-2 ${
          isUser
            ? 'bg-emerald-600 text-zinc-200'
            : isError
            ? 'bg-red-900/40 text-red-200 border border-red-800'
            : 'bg-gray-800 text-zinc-200'
        }`}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : isError ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-zinc-400 mb-2">Generated Calendar Event:</p>
            <pre className="text-xs overflow-x-auto bg-zinc-700 p-3 rounded-lg border border-zinc-600">
              <code>{JSON.stringify(message.event, null, 2)}</code>
            </pre>
          </div>
        )}
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-emerald-200' : isError ? 'text-red-400' : 'text-zinc-400'
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

