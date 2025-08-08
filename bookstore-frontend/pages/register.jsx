import Head from 'next/head';
import Layout from '../layouts/Layout';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Layout>
      <Head><title>Register</title></Head>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <p className="text-gray-600 mb-6">This is a placeholder register page.</p>
        <Link href="/login" className="text-purple-600 hover:text-purple-700 underline">
          Already have an account? Login
        </Link>
      </div>
    </Layout>
  );
}
