"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Card className="w-full max-w-lg text-center shadow-xl">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" aria-hidden="true" />
              </div>
              <CardTitle className="mt-4 text-2xl font-semibold text-gray-900">Oops! Something went wrong.</CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                We're sorry for the inconvenience. Please try refreshing the page. If the problem persists, contact
                support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-left text-sm">
                  <summary className="font-medium text-red-700 cursor-pointer">
                    Error Details (Development Mode)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-all">
                    {this.state.error.toString()}
                    {this.state.errorInfo && `\nComponent Stack:\n${this.state.errorInfo.componentStack}`}
                  </pre>
                </details>
              )}
              <Button onClick={() => window.location.reload()} className="mt-6 w-full sm:w-auto">
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
