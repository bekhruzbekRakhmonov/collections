import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by error boundary:", error, errorInfo);
		this.setState({ hasError: true });
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <div>Something went wrong!</div>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
