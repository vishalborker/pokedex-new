import './ErrorMessage.scss';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorMessage({
  message = 'Something went wrong.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-message__icon">⚠️</div>

      <h2>Oops!</h2>

      <p>{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
