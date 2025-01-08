interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          isUser
            ? 'bg-shell-primary text-white'
            : 'bg-white/90 text-gray-800'
        }`}
      >
        <p className="font-fredoka">{message}</p>
      </div>
    </div>
  );
};