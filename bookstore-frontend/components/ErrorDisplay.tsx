import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
// import React = require('react');
import * as React from 'react';


interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ErrorDisplay = ({
  title = 'Something went wrong',
  message = 'Please try again later.',
  showRetry = true,
  showHome = false,
  onRetry,
  size = 'md',
  className = ''
}: ErrorDisplayProps) => {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'h-8 w-8',
      title: 'text-lg',
      message: 'text-sm',
      button: 'px-3 py-2 text-sm'
    },
    md: {
      container: 'p-6',
      icon: 'h-12 w-12',
      title: 'text-xl',
      message: 'text-base',
      button: 'px-4 py-2'
    },
    lg: {
      container: 'p-8',
      icon: 'h-16 w-16',
      title: 'text-2xl',
      message: 'text-lg',
      button: 'px-6 py-3'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`text-center ${classes.container} ${className}`}>
      {/* Error Icon */}
      <div className="mb-4">
        <div className="mx-auto w-fit p-3 bg-red-100 rounded-full">
          <AlertTriangle className={`${classes.icon} text-red-500`} />
        </div>
      </div>

      {/* Error Message */}
      <div className="mb-6">
        <h3 className={`font-semibold text-gray-900 mb-2 ${classes.title}`}>
          {title}
        </h3>
        <p className={`text-gray-600 ${classes.message}`}>
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      {(showRetry || showHome) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className={`inline-flex items-center justify-center ${classes.button} bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200`}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          )}
          
          {showHome && (
            <Link
              href="/"
              className={`inline-flex items-center justify-center ${classes.button} border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;