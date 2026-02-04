import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // Log to error tracking service (e.g., Sentry)
        if (import.meta.env.PROD) {
            // TODO: Send to error tracking service
            // trackError(error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
                    <div className="max-w-md w-full bg-card rounded-2xl border border-border p-8 text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="h-8 w-8 text-destructive" />
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold mb-3">Oops! Something went wrong</h1>

                        {/* Description */}
                        <p className="text-muted-foreground mb-6">
                            We're sorry for the inconvenience. An unexpected error has occurred.
                            {import.meta.env.DEV && this.state.error && (
                                <span className="block mt-2 text-sm font-mono text-left bg-secondary p-3 rounded-lg overflow-auto max-h-32">
                                    {this.state.error.toString()}
                                </span>
                            )}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={this.handleReset} className="btn-primary">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Button onClick={this.handleGoHome} variant="outline">
                                <Home className="h-4 w-4 mr-2" />
                                Go Home
                            </Button>
                        </div>

                        {/* Additional info in dev mode */}
                        {import.meta.env.DEV && this.state.errorInfo && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                    Error Details (Dev Only)
                                </summary>
                                <pre className="mt-2 text-xs bg-secondary p-3 rounded-lg overflow-auto max-h-48">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook-based error boundary for functional components
export function useErrorHandler() {
    const handleError = (error: Error) => {
        console.error('Error caught by useErrorHandler:', error);

        // Log to error tracking service
        if (import.meta.env.PROD) {
            // TODO: Send to error tracking service
        }
    };

    return handleError;
}
