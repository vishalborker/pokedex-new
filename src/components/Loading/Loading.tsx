import './Loading.scss';

interface LoadingProps {
  message?: string;
}

function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="loading">
      <div className="loading__spinner" />

      <p>{message}</p>
    </div>
  );
}

export default Loading;
