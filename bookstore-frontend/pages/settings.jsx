import Head from 'next/head';
import Layout from '../layouts/Layout';

export default function SettingsPage() {
  return (
    <Layout>
      <Head><title>Settings</title></Head>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <p className="text-gray-600">Placeholder settings page.</p>
      </div>
    </Layout>
  );
}
