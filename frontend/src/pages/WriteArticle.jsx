import { useState } from 'react'
import { Edit, Sparkles, Loader2 } from 'lucide-react'
import Markdown from 'react-markdown'
import { useAppContext } from '../context/AppContext'

const articleLengths = [
  { length: 800, text: "Short (500-800) words" },
  { length: 1200, text: "Medium (800-1200) words" },
  { length: 1600, text: "Long (1200+) words" },
]

const WriteArticle = () => {
  const { backendUrl, showToast } = useAppContext()
  const [selectedLength, setSelectedLength] = useState(articleLengths[0])
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    try {
      const res = await fetch(`${backendUrl}/creation/generate-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: input, length: selectedLength.length }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        showToast('Article generated!', 'success')
      } else {
        showToast(data.message || 'Generation failed', 'error')
      }
    } catch (_) {
      showToast('Network error', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4a7aff]" />
          <h2 className="text-xl font-semibold">Article Configuration</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none rounded-md text-sm border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex flex-wrap gap-3 sm:max-w-9/11">
          {articleLengths.map((item, idx) => (
            <span
              onClick={() => setSelectedLength(item)}
              key={idx}
              className={`px-4 py-1 text-xs rounded-full border cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#226eff] to-[#65adff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <Edit className="w-5" />}
          {loading ? 'Generating...' : 'Generate Article'}
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-150">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#3a7aff]" />
          <h3 className="text-xl font-semibold">Generated Article</h3>
        </div>

        <div className="flex-1 overflow-y-auto mt-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#4a7aff]" />
              <p className="text-sm">Generating your article...</p>
            </div>
          ) : result ? (
            <div className="text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p className="text-sm">Enter a topic and click "Generate Article" to get started</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WriteArticle
