import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Lightbulb, 
  HeartHandshake, 
  Trophy, 
  Globe2, 
  Briefcase
} from 'lucide-react';

export default function AboutSection({ onOpenHireModal, onOpenResumeModal }) {
  const values = [
    {
      letter: 'D',
      title: 'Diversity',
      icon: Users,
      color: 'from-amber-400 to-amber-500',
      description: 'We embrace a diverse workforce and believe in the power of diverse perspectives to foster innovation, creativity, and a more inclusive work environment. Diversity is not just a goal, but a key factor in building strong, successful teams.'
    },
    {
      letter: 'I',
      title: 'Integrity',
      icon: ShieldCheck,
      color: 'from-blue-500 to-blue-600',
      description: 'We hold ourselves to the highest standards of honesty and ethical behavior. Our clients and candidates can trust that we operate with transparency, fairness, and accountability in every interaction.'
    },
    {
      letter: 'V',
      title: 'Value-Driven',
      icon: Award,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Our commitment is to create value for both clients and candidates. We focus on understanding their unique needs and delivering solutions that align with their long-term goals and objectives.'
    },
    {
      letter: 'I',
      title: 'Innovation',
      icon: Lightbulb,
      color: 'from-purple-500 to-purple-600',
      description: 'We continuously adapt and innovate to stay ahead in a fast-changing recruitment landscape. By utilizing progressive strategies and modern screening, we ensure the best outcomes for all stakeholders.'
    },
    {
      letter: 'N',
      title: 'Nurturing Relationships',
      icon: HeartHandshake,
      color: 'from-rose-500 to-rose-600',
      description: 'We believe in building long-term, meaningful relationships based on trust, respect, and collaboration. Whether with clients or candidates, we aim to foster partnerships that endure.'
    },
    {
      letter: 'E',
      title: 'Excellence',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'We are committed to excellence in everything we do. From the quality of service to the candidates we place, we consistently strive to exceed expectations and deliver exceptional results.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white text-slate-900 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fff8d6] text-[#713f12] border border-[#a99410]/50 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#a99410]" />
            About SkyGlobal HR Consultancy
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#101a6d] mb-4">
            Your Global Talent Partner
          </h2>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            Your trusted partner in global recruitment, workforce solutions, and international career development.
          </p>
        </div>

        {/* Company Overview & Founder Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Main Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
            <h3 className="text-2xl font-bold font-display text-[#101a6d]">
              Licensed Overseas Placements & Strategic Workforce Solutions
            </h3>
            
            <p className="text-justify text-slate-700">
              <strong className="text-[#101a6d]">SkyGlobal HR Consultancy</strong>, established in <strong>2024</strong>, is a premier recruitment and job placement firm located on the <strong>2nd floor of the Toronto Building, Room 202, in Bur Dubai, UAE</strong>. We excel in connecting employers with top-tier talent across a diverse array of industries, including MEP, electrical trades, healthcare, hospitality, retail, service companies, manufacturing, agriculture, finance, administration, transportation, and construction.
            </p>

            <p className="text-justify text-slate-700">
              Our placement reach currently extends to high-demand regions such as <strong>Malta, Croatia, and the UAE</strong>, with active expansion programs into additional <strong>EU countries, Australia, Bulgaria, and Romania</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-[#e5f2f9]/70 border border-[#b6eafb]">
              <p className="text-[#101a6d] font-bold mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#a99410] shrink-0" />
                Founder & Executive Leadership
              </p>
              <p className="text-sm text-slate-700 text-justify">
                Our founder and director, <strong className="text-[#101a6d]">Mr. Bhim Lal Gaire</strong>, brings over a decade of extensive experience in the HR and recruitment sector. Throughout his distinguished career, he has significantly contributed to enhancing the reputation of several renowned HR consultancies, delivering exceptional results and forging strong, lasting relationships across the Gulf and European markets.
              </p>
            </div>

            <p className="italic text-[#101a6d] font-semibold">
              "Experience the SkyGlobal difference—where talent meets opportunity, and excellence is our standard."
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenHireModal}
                className="px-6 py-3 rounded-xl bg-[#101a6d] hover:bg-[#182a98] text-[#a99410] border border-[#a99410]/40 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#a99410]" />
                Partner With Us (Hire Talent)
              </button>
              <button
                onClick={onOpenResumeModal}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a99410] via-[#bfa715] to-[#8e7c0c] hover:from-[#cbb218] hover:to-[#a99410] text-[#020024] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Globe2 className="w-4 h-4 text-[#020024]" />
                Explore International Jobs
              </button>
            </div>
          </div>

          {/* Key Quick Facts & Reach Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#101a6d] via-[#09113e] to-[#020024] text-white p-8 rounded-3xl shadow-xl border border-[#182a98] space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#a99410]/20 border border-[#a99410]/40 flex items-center justify-center text-[#a99410]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">SkyGlobal Headquarters</h4>
                <p className="text-xs text-[#b6eafb]/80">Bur Dubai, United Arab Emirates</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#182a98]/80">
              <div className="p-3 bg-[#101a6d]/60 rounded-xl border border-[#25c0f3]/30">
                <span className="text-2xl font-black text-[#a99410] block">2024</span>
                <span className="text-xs text-[#b6eafb]/80">Year Established</span>
              </div>
              <div className="p-3 bg-[#101a6d]/60 rounded-xl border border-[#25c0f3]/30">
                <span className="text-2xl font-black text-[#a99410] block">10+ Yrs</span>
                <span className="text-xs text-[#b6eafb]/80">Leadership Experience</span>
              </div>
              <div className="p-3 bg-[#101a6d]/60 rounded-xl border border-[#25c0f3]/30">
                <span className="text-2xl font-black text-[#a99410] block">6+</span>
                <span className="text-xs text-[#b6eafb]/80">Global Hubs</span>
              </div>
              <div className="p-3 bg-[#101a6d]/60 rounded-xl border border-[#25c0f3]/30">
                <span className="text-2xl font-black text-[#a99410] block">100%</span>
                <span className="text-xs text-[#b6eafb]/80">Ethical & Compliant</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a99410] mt-1.5 shrink-0" />
                <span><strong>Registered Office:</strong> Toronto Building, 202 2nd Floor, Bur Dubai, Dubai, UAE</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a99410] mt-1.5 shrink-0" />
                <span><strong>Primary Markets:</strong> Malta, Australia, UAE, Croatia, Bulgaria, Romania</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#a99410] mt-1.5 shrink-0" />
                <span><strong>Contact Direct:</strong> +971 04 5570778 | info@skyglobalhr.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-justify">
              <strong className="text-slate-800">SkyGlobal HR Consultancy</strong> aims to be the preferred global partner for talent acquisition, delivering exceptional recruitment solutions that drive business success. We strive to create lasting partnerships with both candidates and clients, building trust and consistently exceeding expectations.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed text-justify">
              At <strong className="text-slate-800">SkyGlobal HR Consultancy</strong>, we envision a world where talent knows no boundaries. Our vision is to become a <strong className="text-slate-800">global leader in recruitment</strong>, shaping the future of work by connecting exceptional people with purpose-driven opportunities.
            </p>
          </div>
        </div>

        {/* Core Values: DIVINE Framework */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Guiding Principles
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-3">
              Our Core Values: <span className="text-amber-600">D.I.V.I.N.E</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              At SkyGlobal HR Consultancy, strong ethical principles guide our every action. Our values are embodied in the acronym <strong>DIVINE</strong>, shaping our service to both clients and candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div 
                  key={i}
                  className="bg-slate-50/70 border border-slate-200 rounded-3xl p-7 hover:bg-white hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform shadow-sm">
                        {v.letter}
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:text-amber-600 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="text-xl font-bold font-display text-slate-900 mb-2">
                      {v.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                      {v.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    <span>Part of DIVINE Code</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
