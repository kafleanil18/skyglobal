import React from 'react';
import { 
  Plane, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function Services({ onOpenHireModal }) {
  const serviceItems = [
    {
      icon: <Plane className="w-6 h-6 text-sky-500" />,
      title: 'Cross-Border Relocation & Visa Legal',
      description: 'End-to-end international immigration management. From EU Blue Cards and UK Global Talent visas to Singapore COMPASS and Japanese HSP status.',
      points: ['In-house immigration legal counsels', 'Family visa & schooling assistance', 'Relocation allowance & flights coordination']
    },
    {
      icon: <Code2 className="w-6 h-6 text-indigo-500" />,
      title: 'Software, Cloud & Distributed Systems',
      description: 'Placing Staff, Principal, and Lead engineers proficient in Go, Rust, C++, Kubernetes, and distributed architectures powering massive-scale backends.',
      points: ['Technical evaluation by former staff engineers', 'Production-tested microservices mastery', 'High-throughput system specialists']
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-500" />,
      title: 'AI, LLMs & Deep Learning Architecture',
      description: 'Connecting groundbreaking AI research labs and enterprise innovators with machine learning architects, LLM fine-tuning leads, and MLOps veterans.',
      points: ['Distributed GPU training (Deepspeed/PyTorch)', 'Inference optimization (vLLM, TensorRT)', 'Ph.D. & post-doctoral research placement']
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      title: 'Robotics & Embedded Hardware Engineering',
      description: 'Sourcing embedded firmware experts, ROS2 specialists, autonomous perception developers, and Mechatronics engineers for robotics and EV labs.',
      points: ['Safety-critical RTOS & CAN bus protocols', 'Hardware-in-the-loop (HIL) testing', 'Autonomous perception & sensor fusion']
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      title: 'Executive Search & Technical Leadership',
      description: 'Confidential executive search for VP of Engineering, Chief Technology Officers, Heads of Infrastructure, and Chief Information Security Officers.',
      points: ['Confidential board-level retained searches', '90-day retention and performance guarantee', 'Proven high-scaling engineering leadership']
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: 'Global Compliant Payroll & EOR',
      description: 'Hire internationally without setting up local foreign entities. SkyGlobal provides compliant Employer of Record (EOR) services in 50+ nations.',
      points: ['Local labor law & benefits compliance', 'Multi-currency payroll settlement', 'IP assignment & airtight NDA enforcement']
    }
  ];

  return (
    <section id="services" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-sky-100">
            Specialized Practice Areas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Engineered for High-Stakes Tech & Cross-Border Mobility
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We don’t just match resumes to keywords. We understand compiled languages, distributed consensus, and complex international immigration frameworks.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item, idx) => (
            <div 
              key={item.title}
              className="rounded-2xl p-7 bg-slate-50/80 border border-slate-200/80 hover:border-sky-500/50 hover:bg-white hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-200/60 mb-6">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onOpenHireModal}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Request Specialists</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-sky-900/50">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-sky-400 font-bold text-xs uppercase tracking-widest">Enterprise Relocation Advisory</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-2 mb-3">
              Need to relocate an entire engineering squad to a new hub?
            </h3>
            <p className="text-slate-300 text-sm">
              From collective visa sponsorship to regional entity setup and office onboarding, our specialized turnkey migration team handles everything in record time.
            </p>
          </div>
          <button
            onClick={onOpenHireModal}
            className="shrink-0 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all transform hover:scale-105"
          >
            Consult Our Expansion Team
          </button>
        </div>
      </div>
    </section>
  );
}
