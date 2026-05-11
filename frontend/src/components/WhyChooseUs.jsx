import { Zap, LayoutGrid, MousePointerClick, Users } from 'lucide-react'

const benefits = [
  {
    icon: LayoutGrid,
    title: 'All-in-One Platform',
    description: 'Six powerful AI tools in one place — no need to juggle between multiple apps and services.',
    bg: { from: '#3588F2', to: '#0BB0D7' }
  },
  {
    icon: Zap,
    title: 'Lightning Fast Results',
    description: 'Get high-quality outputs in seconds. Our AI models are optimized for speed and accuracy.',
    bg: { from: '#B153EA', to: '#E549A3' }
  },
  {
    icon: MousePointerClick,
    title: 'Simple & Intuitive',
    description: 'A clean, easy-to-use interface designed for everyone, regardless of technical skill.',
    bg: { from: '#20C363', to: '#11B97E' }
  },
  {
    icon: Users,
    title: 'Community Gallery',
    description: 'Explore a public gallery of AI-generated content and get inspired by other creators.',
    bg: { from: '#F76C1C', to: '#F04A3C' }
  }
]

const WhyChooseUs = () => {
  return (
    <section className="bg-linear-to-b from-[#F8F4FF] to-white py-24 px-4 sm:px-20 xl:px-32">
      <div className="text-center">
        <h2 className="text-[42px] font-semibold text-slate-700">Why Choose GenAI</h2>
        <p className="max-w-lg mx-auto text-gray-500">
          Built for creators, professionals, and students who want to do more with less effort.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div
              key={index}
              className="flex items-start gap-5 p-6 rounded-xl bg-white shadow-sm border border-gray-100 w-full max-w-105"
            >
              <Icon
                className="w-12 h-12 p-3 text-white rounded-xl shrink-0"
                style={{ background: `linear-gradient(to bottom, ${benefit.bg.from}, ${benefit.bg.to})` }}
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WhyChooseUs
