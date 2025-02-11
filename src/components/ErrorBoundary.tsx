import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Došlo je do greške</h1>
            <p className="text-gray-600 mb-4">Izvinjavamo se, nešto nije u redu. Molimo osvežite stranicu.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-stone-900 text-white px-6 py-2 rounded-md hover:bg-stone-800 transition-colors"
            >
              Osvežite stranicu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}