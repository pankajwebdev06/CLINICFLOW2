import Link from 'next/link';

const FEATURES = [
  {
    icon: '🗂️',
    title: 'Smart Queue Management',
    desc: 'Color-coded real-time queue with token numbers. Never lose track of a patient\'s place in line.',
    detail: [['● Waiting', '10 mins'], ['● In Consultation', 'Room 2']],
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
  },
  {
    icon: '📋',
    title: 'Digital Patient Records',
    desc: 'Access full patient history instantly. Searchable by mobile number within your clinic\'s secure database.',
    detail: [['● Records', 'Instant access'], ['● History', 'All visits']],
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
  },
  {
    icon: '⚡',
    title: 'Fast Check-In & Tokens',
    desc: 'Auto-generate unique tokens (M-001) after registration. Receptionists check in patients in seconds.',
    detail: [['● Token', 'Auto-generated'], ['● Check-in', '< 30 seconds']],
    color: 'from-orange-500 to-rose-600',
    bg: 'bg-orange-50',
  },
  {
    icon: '📱',
    title: 'Works Offline',
    desc: 'Reception works even on poor internet. Data auto-syncs the moment connectivity is restored.',
    detail: [['● Sync', 'Auto on reconnect'], ['● Storage', 'Local IndexedDB']],
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
  },
];

const STEPS = [
  { n: '01', title: 'Doctor Signs Up', desc: 'Register your clinic in 3 quick steps — specialization, clinic details, and staff setup.' },
  { n: '02', title: 'Add Your Team', desc: 'Add receptionists by mobile number. They log in instantly on any device, no separate app needed.' },
  { n: '03', title: 'Start Seeing Patients', desc: 'Receptionist enters patient mobile number → auto-search → register or retrieve → print token. Done.' },
];

const TRUST = [
  { icon: '🔒', title: 'Highly Secure', desc: 'Bank-grade encryption' },
  { icon: '📶', title: 'Offline-Ready', desc: 'Works without internet' },
  { icon: '⚡', title: 'Fast & Reliable', desc: '99.9% Uptime SLA' },
  { icon: '🌐', title: 'Multi-Language', desc: 'Hindi, Tamil & more' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              CF
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">ClinicFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">Login</Link>
            <Link href="/doctor/setup" className="text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-36">
        {/* Gradient BG */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Designed for Indian Clinics
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Empower Your Clinic.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Effortless Flow
            </span>{' '}
            for Doctors.
          </h1>

          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
            Modern queue management, digital records, and seamless patient check-in — designed for high-paced clinical environments across the Indian subcontinent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/doctor/setup" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/25 transition-all active:scale-[0.98] hover:-translate-y-0.5">
              Register My Clinic →
            </Link>
            <Link href="/" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl font-bold text-lg border-2 border-slate-200 transition-all active:scale-[0.98] hover:-translate-y-0.5">
              Login to Dashboard
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-1 shadow-2xl shadow-slate-900/30 max-w-3xl mx-auto">
              <div className="bg-slate-900 rounded-2xl overflow-hidden">
                {/* Mock Browser Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <div className="flex-1 ml-3 bg-slate-700/50 rounded-md h-5 flex items-center px-3">
                    <span className="text-slate-400 text-xs font-mono">app.clinicflow.in/reception</span>
                  </div>
                </div>
                {/* Mock Dashboard UI */}
                <div className="flex min-h-[260px] md:min-h-[320px]">
                  {/* Sidebar */}
                  <div className="w-14 md:w-48 bg-slate-800 border-r border-slate-700/50 p-3 flex flex-col gap-2">
                    <div className="p-2 rounded-xl bg-blue-600 flex items-center gap-2">
                      <span className="text-base">🗂️</span>
                      <span className="hidden md:block text-white text-xs font-semibold">Patient Entry</span>
                    </div>
                    {['📋 Queue Mgmt', '⚙️ Settings'].map(s => (
                      <div key={s} className="p-2 rounded-xl flex items-center gap-2 text-slate-400">
                        <span className="text-base">{s.split(' ')[0]}</span>
                        <span className="hidden md:block text-xs font-medium">{s.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 p-4 md:p-6 space-y-4">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Patient Check-in</p>
                    <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600/40">
                      <p className="text-slate-400 text-xs mb-2">Mobile Number</p>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm font-medium">+91</span>
                        <span className="text-white font-bold tracking-widest text-sm md:text-base">9876543210</span>
                        <div className="ml-auto w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 animate-in fade-in duration-700">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-emerald-400 text-xs font-bold uppercase">● Patient Found</p>
                        <span className="bg-slate-900 text-white text-xs font-black px-2 py-1 rounded-lg">M-007</span>
                      </div>
                      <p className="text-white font-bold text-sm md:text-base">Rahul Sharma</p>
                      <p className="text-slate-400 text-xs mt-0.5">34 yrs • Male • 3 prev visits</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-600 rounded-xl py-2.5 text-center text-white text-xs font-bold">Generate Token</div>
                      <div className="flex-1 bg-slate-700 rounded-xl py-2.5 text-center text-slate-300 text-xs font-bold">Print Slip</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-500/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map(t => (
              <div key={t.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                  {t.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.title}</p>
                  <p className="text-slate-400 text-xs">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Built for Operational Efficiency</h2>
            <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">Everything you need to run a modern clinic. Nothing you don&apos;t.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className={`${f.bg} rounded-3xl p-8 border border-white shadow-sm hover:shadow-lg transition-shadow group`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl bg-gradient-to-br ${f.color} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-5">{f.desc}</p>
                <div className="bg-white/80 rounded-2xl p-4 space-y-2 border border-white">
                  {f.detail.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">{k}</span>
                      <span className="text-slate-900 font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Up and Running in Minutes</h2>
            <p className="text-slate-400 text-lg font-medium">No training required. No IT team needed.</p>
          </div>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-blue-400">
                  {s.n}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[27px] mt-14 w-0.5 h-6 bg-white/10 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-lg mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Simple Monthly Plans</h2>
          <p className="text-slate-500 text-lg font-medium mb-12">No hidden fees. Scale as your clinic grows.</p>

          <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-2xl shadow-blue-100 p-10 relative overflow-hidden">
            <div className="absolute top-5 right-5 px-3 py-1 bg-blue-600 text-white text-xs font-black rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div className="text-6xl font-black text-slate-900 mb-1">
              <span className="text-2xl font-bold text-slate-500 align-top mt-3 inline-block">₹</span>
              2,499
            </div>
            <p className="text-slate-500 font-semibold mb-8">/month • Billed monthly</p>
            <ul className="space-y-4 text-left mb-10">
              {[
                '✅ Unlimited patients per day',
                '✅ Up to 5 staff accounts',
                '✅ Offline mode with auto-sync',
                '✅ Multi-language support',
                '✅ Token & prescription printing',
                '✅ Daily summary reports',
                '✅ Priority support',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">{item}</li>
              ))}
            </ul>
            <Link href="/doctor/setup" className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] hover:-translate-y-0.5">
              Start Free 14-Day Trial →
            </Link>
            <p className="text-slate-400 text-sm mt-4 font-medium">No credit card required.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            Ready to modernize your clinic?
          </h2>
          <p className="text-blue-100 text-lg font-medium mb-10 max-w-xl mx-auto">
            Join hundreds of doctors across India already using ClinicFlow to run smoother, faster, and smarter clinics.
          </p>
          <Link href="/doctor/setup" className="inline-block px-10 py-5 bg-white text-blue-700 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98]">
            Register My Clinic — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-black text-xs">CF</div>
            <span className="font-extrabold text-slate-900">ClinicFlow</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 ClinicFlow. Built for the Indian Subcontinent.</p>
          <div className="flex gap-5 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
