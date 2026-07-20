'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Project, SkillCategory, ExperienceItem, Profile } from '@/lib/data';

// ── tiny helpers ─────────────────────────────────────────────────────────────
const api = (path: string, opts?: RequestInit) =>
  fetch(`/api/admin/${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts });

const label = (s: string) => (
  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px' }}>
    {s}
  </label>
);

const input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} style={{
    width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
    color: '#f5f0eb', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
    marginBottom: '14px', ...props.style,
  }} />
);

const textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} style={{
    width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
    color: '#f5f0eb', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
    marginBottom: '14px', resize: 'vertical', ...props.style,
  }} />
);

type Tab = 'profile' | 'projects' | 'skills' | 'experience';

export default function AdminDashboard() {
  const router   = useRouter();
  const [tab, setTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState('');

  const [profile,    setProfile]    = useState<Profile | null>(null);
  const [projects,   setProjects]   = useState<Project[]>([]);
  const [skills,     setSkills]     = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);

  // Load all data on mount
  useEffect(() => {
    api('profile').then(r => r.json()).then(setProfile);
    api('projects').then(r => r.json()).then(setProjects);
    api('skills').then(r => r.json()).then(setSkills);
    api('experience').then(r => r.json()).then(setExperience);
  }, []);

  const notify = (msg = 'Saved ✓') => {
    setSaved(msg);
    setTimeout(() => setSaved(''), 2500);
  };

  const logout = async () => {
    await api('auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  // ── SAVE HANDLERS ──────────────────────────────────────────────────────────
  const saveProfile = async () => {
    await api('profile', { method: 'PUT', body: JSON.stringify(profile) });
    notify();
  };

  const saveProject = async (p: Project) => {
    await api('projects', { method: 'PUT', body: JSON.stringify(p) });
    notify();
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    await api('projects', { method: 'DELETE', body: JSON.stringify({ id }) });
    setProjects(prev => prev.filter(p => p.id !== id));
    notify('Deleted ✓');
  };

  const addProject = async () => {
    const blank: Omit<Project,'id'> = {
      number: String(projects.length + 1).padStart(2,'0'),
      featured: false, title: 'New Project', subtitle: 'Type',
      description: '', techs: [], highlights: [],
      bgImage: '/images/bus.png', fgImage: '/images/me.png', link: '#',
    };
    const res = await api('projects', { method: 'POST', body: JSON.stringify(blank) });
    const created = await res.json();
    setProjects(prev => [...prev, created]);
  };

  const saveSkills = async () => {
    await api('skills', { method: 'PUT', body: JSON.stringify(skills) });
    notify();
  };

  const saveExperience = async () => {
    await api('experience', { method: 'PUT', body: JSON.stringify(experience) });
    notify();
  };

  if (!profile) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex',
      alignItems: 'center', justifyContent: 'center', color: '#c9a96e', fontFamily: 'system-ui' }}>
      Loading…
    </div>
  );

  // ── STYLES ─────────────────────────────────────────────────────────────────
  const S = {
    page: { minHeight: '100vh', background: '#080808', color: '#f5f0eb',
      fontFamily: 'system-ui, -apple-system, sans-serif' } as React.CSSProperties,
    topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)',
      background: '#0d0d0d', position: 'sticky' as const, top: 0, zIndex: 100 },
    tabs: { display: 'flex', gap: '4px', padding: '20px 32px 0' },
    tabBtn: (active: boolean): React.CSSProperties => ({
      padding: '10px 22px', borderRadius: '10px 10px 0 0',
      border: '1px solid rgba(255,255,255,0.08)',
      borderBottom: active ? '2px solid #c9a96e' : '1px solid rgba(255,255,255,0.08)',
      background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
      color: active ? '#c9a96e' : 'rgba(245,240,235,0.5)',
      fontSize: '0.82rem', fontWeight: active ? 600 : 400,
      cursor: 'pointer', letterSpacing: '0.04em',
    }),
    panel: { padding: '32px', maxWidth: '900px' } as React.CSSProperties,
    card: { background: '#111', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '28px', marginBottom: '20px' } as React.CSSProperties,
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' } as React.CSSProperties,
    btn: (variant: 'gold'|'ghost'|'red' = 'gold'): React.CSSProperties => ({
      padding: '10px 24px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: 600,
      cursor: 'pointer', border: 'none', letterSpacing: '0.04em',
      background: variant === 'gold' ? '#c9a96e' : variant === 'red' ? '#ef4444' : 'rgba(255,255,255,0.06)',
      color: variant === 'gold' ? '#080808' : '#f5f0eb',
    }),
  };

  return (
    <div style={S.page}>
      {/* Topbar */}
      <div style={S.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image src="/images/logo.png" alt="PL" width={36} height={36}
            style={{ borderRadius: '50%' }} />
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Portfolio Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {saved && <span style={{ color: '#6ee7b7', fontSize: '0.8rem' }}>{saved}</span>}
          <a href="/" target="_blank" style={{ color: 'rgba(245,240,235,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>
            View site ↗
          </a>
          <button onClick={logout} style={S.btn('ghost')}>Log out</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {(['profile','projects','skills','experience'] as Tab[]).map(t => (
          <button key={t} style={S.tabBtn(tab === t)} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={S.panel}>

        {/* ── PROFILE TAB ────────────────────────────────────────────── */}
        {tab === 'profile' && (
          <div>
            <h2 style={{ marginBottom: '24px', fontWeight: 600 }}>Profile & Contact</h2>
            <div style={S.card}>
              <div style={S.row}>
                <div>{label('Name')}{input({ value: profile.name, onChange: e => setProfile({...profile, name: e.target.value}) })}</div>
                <div>{label('Email')}{input({ value: profile.email, onChange: e => setProfile({...profile, email: e.target.value}) })}</div>
                <div>{label('School')}{input({ value: profile.school, onChange: e => setProfile({...profile, school: e.target.value}) })}</div>
                <div>{label('Location')}{input({ value: profile.location, onChange: e => setProfile({...profile, location: e.target.value}) })}</div>
                <div>{label('GitHub URL')}{input({ value: profile.github, onChange: e => setProfile({...profile, github: e.target.value}) })}</div>
                <div>{label('LinkedIn URL')}{input({ value: profile.linkedin, onChange: e => setProfile({...profile, linkedin: e.target.value}) })}</div>
              </div>
              {label('Availability text')}
              {input({ value: profile.available, onChange: e => setProfile({...profile, available: e.target.value}) })}
              {label('Hero tagline')}
              {textarea({ value: profile.tagline, rows: 3, onChange: e => setProfile({...profile, tagline: e.target.value}) })}
              {label('Cycling words (comma-separated)')}
              {input({ value: profile.heroWords.join(', '), onChange: e => setProfile({...profile, heroWords: e.target.value.split(',').map(s => s.trim())}) })}
              {label('Float chips (comma-separated)')}
              {input({ value: profile.floatChips.join(', '), onChange: e => setProfile({...profile, floatChips: e.target.value.split(',').map(s => s.trim())}) })}
              <button style={S.btn()} onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        )}

        {/* ── PROJECTS TAB ───────────────────────────────────────────── */}
        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 600 }}>Projects</h2>
              <button style={S.btn()} onClick={addProject}>+ Add Project</button>
            </div>
            {projects.map((p, pi) => (
              <div key={p.id} style={S.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                  <span style={{ color: '#c9a96e', fontWeight: 700 }}>#{p.number} — {p.title}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#c9a96e', cursor: 'pointer' }}>
                      <input type="checkbox" checked={p.featured}
                        onChange={e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],featured:e.target.checked}; return n; })} />
                      Featured
                    </label>
                    <button style={S.btn('red')} onClick={() => deleteProject(p.id)}>Delete</button>
                  </div>
                </div>
                <div style={S.row}>
                  <div>{label('Title')}{input({ value: p.title, onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],title:e.target.value}; return n; }) })}</div>
                  <div>{label('Subtitle')}{input({ value: p.subtitle, onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],subtitle:e.target.value}; return n; }) })}</div>
                  <div>{label('Link / URL')}{input({ value: p.link, onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],link:e.target.value}; return n; }) })}</div>
                  <div>{label('Number (01, 02…)')}{input({ value: p.number, onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],number:e.target.value}; return n; }) })}</div>
                </div>
                {label('Description')}
                {textarea({ value: p.description, rows: 3, onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],description:e.target.value}; return n; }) })}
                {label('Technologies (comma-separated)')}
                {input({ value: p.techs.join(', '), onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],techs:e.target.value.split(',').map(s=>s.trim())}; return n; }) })}
                {label('Highlights (comma-separated)')}
                {input({ value: p.highlights.join(', '), onChange: e => setProjects(prev => { const n=[...prev]; n[pi]={...n[pi],highlights:e.target.value.split(',').map(s=>s.trim())}; return n; }) })}
                <button style={S.btn()} onClick={() => saveProject(p)}>Save Project</button>
              </div>
            ))}
          </div>
        )}

        {/* ── SKILLS TAB ─────────────────────────────────────────────── */}
        {tab === 'skills' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 600 }}>Skills</h2>
              <button style={S.btn()} onClick={saveSkills}>Save All Skills</button>
            </div>
            {skills.map((cat, ci) => (
              <div key={cat.id} style={S.card}>
                <div style={S.row}>
                  <div>{label('Category name')}{input({ value: cat.label, onChange: e => setSkills(prev => { const n=[...prev]; n[ci]={...n[ci],label:e.target.value}; return n; }) })}</div>
                  <div>{label('Icon')}{input({ value: cat.icon, onChange: e => setSkills(prev => { const n=[...prev]; n[ci]={...n[ci],icon:e.target.value}; return n; }) })}</div>
                </div>
                {cat.skills.map((sk, si) => (
                  <div key={si} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0 12px' }}>
                    <div>{label('Skill name')}{input({ value: sk.name, onChange: e => setSkills(prev => { const n=JSON.parse(JSON.stringify(prev)); n[ci].skills[si].name=e.target.value; return n; }) })}</div>
                    <div>{label('% (0–100)')}{input({ type:'number', min:0, max:100, value: sk.percent, onChange: e => setSkills(prev => { const n=JSON.parse(JSON.stringify(prev)); n[ci].skills[si].percent=Number(e.target.value); return n; }) })}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── EXPERIENCE TAB ─────────────────────────────────────────── */}
        {tab === 'experience' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontWeight: 600 }}>Education & Experience</h2>
              <button style={S.btn()} onClick={saveExperience}>Save All</button>
            </div>
            {experience.map((exp, ei) => (
              <div key={exp.id} style={S.card}>
                <div style={S.row}>
                  <div>{label('Organisation')}{input({ value: exp.company, onChange: e => setExperience(prev => { const n=[...prev]; n[ei]={...n[ei],company:e.target.value}; return n; }) })}</div>
                  <div>{label('Role')}{input({ value: exp.role, onChange: e => setExperience(prev => { const n=[...prev]; n[ei]={...n[ei],role:e.target.value}; return n; }) })}</div>
                  <div>{label('Period')}{input({ value: exp.period, onChange: e => setExperience(prev => { const n=[...prev]; n[ei]={...n[ei],period:e.target.value}; return n; }) })}</div>
                  <div>{label('Type (Education / Project / Personal)')}{input({ value: exp.type, onChange: e => setExperience(prev => { const n=[...prev]; n[ei]={...n[ei],type:e.target.value}; return n; }) })}</div>
                </div>
                {label('Description')}
                {textarea({ value: exp.description, rows: 3, onChange: e => setExperience(prev => { const n=[...prev]; n[ei]={...n[ei],description:e.target.value}; return n; }) })}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
