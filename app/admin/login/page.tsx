'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [pw, setPw]     = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Wrong password. Try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: '380px', padding: '48px 40px',
        background: '#111', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Image src="/images/logo.png" alt="PL" width={72} height={72}
            style={{ borderRadius: '50%', filter: 'drop-shadow(0 0 12px rgba(201,169,110,0.4))' }} />
        </div>

        <h1 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#f5f0eb', textAlign: 'center', marginBottom: '6px' }}>
          Portfolio Admin
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,235,0.45)', textAlign: 'center', marginBottom: '36px', letterSpacing: '0.04em' }}>
          Enter your password to continue
        </p>

        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            style={{
              width: '100%', padding: '14px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px', color: '#f5f0eb',
              fontSize: '0.95rem', outline: 'none',
              marginBottom: '12px', boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '12px' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: '#c9a96e', color: '#080808',
              border: 'none', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
