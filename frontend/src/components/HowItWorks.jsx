import { UserRound, LayoutGrid, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: UserRound,
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up for free and unlock instant access to all our powerful AI tools.',
    bg: { from: '#3588F2', to: '#0BB0D7' }
  },
  {
    icon: LayoutGrid,
    step: '02',
    title: 'Choose Your Tool',
    description: 'Browse our suite of AI tools and pick the one that fits your creative needs.',
    bg: { from: '#B153EA', to: '#E549A3' }
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Generate & Export',
    description: 'Create high-quality content instantly and use it however you like.',
    bg: { from: '#20C363', to: '#11B97E' }
  }
]

const HowItWorks = () => {
  return (
    <section className="px-4 sm:px-20 xl:px-32 my-24 py-16 bg-linear-to-b from-[#F1EAFF] to-[#FFFFFF]">
      <div className="text-center">
        <h2 className="text-[42px] font-semibold text-slate-700">How It Works</h2>
        <p className="max-w-lg mx-auto text-gray-500">
          Get started in three simple steps and begin creating AI-powered content in minutes.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-center items-center md:items-start gap-10 mt-14">
        <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[52%] h-px bg-gray-200 z-0" />

        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className="flex flex-col items-center text-center max-w-60 relative z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: `linear-gradient(to bottom, ${step.bg.from}, ${step.bg.to})` }}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="mt-4 text-xs font-bold tracking-widest text-primary uppercase">Step {step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-700">{step.title}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks
