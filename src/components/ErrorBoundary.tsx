import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Euclid Smart Clipper Popup Error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 m-3 bg-[#12161f] border border-red-500/50 rounded-2xl text-center space-y-3 my-auto shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[13px] text-white">
              Something went wrong
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {this.props.fallbackMessage ||
                'Euclid Smart Clipper could not load this section. Reload the extension and try again.'}
            </p>
          </div>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 mx-auto transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Extension</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
