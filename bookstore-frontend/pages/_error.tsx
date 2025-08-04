import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../layouts/Layout';
import { Home, RefreshCw, AlertTriangle, Server } from 'lucide-react';
// import React = require('react');
import * as React from 'react';


interface ErrorPageProps {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const getErrorMessage = (statusCode: number) => {
    switch (statusCode) {
      case 500:
        return {
          title: 'Internal Server Error',
          description: 'Something went wrong on our end. Our team has been notified and is working to fix the issue.',
          icon: <Server className="h-12 w-12 text-red-500" />
        };
      case 503:
        return {
          title: 'Service Unavailable',
          description: 'Our servers are temporarily unavailable. Please try again in a few minutes.',
          icon: <Server className="h-12 w-12 text-red-500" />
        };
      case 403:
        return {
          title: 'Forbidden',
          description: 'You don\'t have permission to access this resource.',
          icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />
        };
      case 400:
        return {
          title: 'Bad Request',
          description: 'The request was invalid. Please check your input and try again.',
          icon: <AlertTriangle className="h-12 w-12 text-orange-500" />
        };
      default:
        return {
          title: 'An Error Occurred',
          description: 'Something unexpected happened. Please try again later.',
          icon: <AlertTriangle className="h-12 w-12 text-red-500" />
        };
    }
  };

  const errorInfo = getErrorMessage(statusCode);

  return (
    <Layout>
      <Head>
        <title>{statusCode} - {errorInfo.title} | Books</title>
        <meta name="description" content={errorInfo.description} />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              {errorInfo.icon}
            </div>
          </div>

          {/* Status Code */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text leading-none">
              {statusCode}
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {errorInfo.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {errorInfo.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Primary Action - Retry/Home based on error type */}
            {statusCode >= 500 ? (
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            )}

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/books/all"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Browse Books
              </Link>
              
              {statusCode >= 500 && (
                <Link
                  href="/"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              )}
            </div>
          </div>

          {/* Support Info for Server Errors */}
          {statusCode >= 500 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If this problem continues, please{' '}
                <a 
                  href="mailto:support@books.com" 
                  className="text-purple-600 hover:text-purple-800 hover:underline"
                >
                  contact our support team
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-red-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
    </Layout>
  );
}

// Add getInitialProps as a static property
ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default ErrorPage;