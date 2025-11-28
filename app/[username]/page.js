
// server component (no 'use client' at top)
import PaymentPage from '@/components/PaymentPage'

export default async function UsernamePage({ params }) {
  // params is a Promise — unwrap it
  const { username } = await params

  // now pass to client component
  return <PaymentPage username={username} />
}
