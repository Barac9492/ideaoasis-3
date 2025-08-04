import { redirect } from 'next/navigation';

export default function RootPage() {
  // In serverless mode, middleware will handle the redirect
  // This is a fallback for direct access
  redirect('/ko');
} 