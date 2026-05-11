import { useState } from 'react'
import { Hash, Sparkles, Loader2 } from 'lucide-react'
import Markdown from 'react-markdown'
import { useAppContext } from '../context/AppContext'

const blogCategories = ["General", "Technology", "Business", "Health", "Lifestyle", "Education", "Travel", "Food"]

const BlogTitles = () => {
  const { backendUrl, showToast } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0])
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    const prompt = `Generate ONLY ONE short catchy blog title about "${input}" in the category: ${selectedCategory}".
                    Rules:
                    - Return title only
                    - No explanations
                    - No bullet points
                    - No multiple options
                    - Minimum 10 words
                    - Maximum 20 words`
    try {
      const res = await fetch(`${backendUrl}/creation/generate-title`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        showToast('Blog titles generated!', 'success')
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
          <Sparkles className="w-6 text-[#8e37eb]" />
          <h2 className="text-xl font-semibold">Blog Title Generator</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none rounded-md text-sm border border-gray-300"
          placeholder="e.g. productivity, machine learning..."
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex flex-wrap gap-3 sm:max-w-9/11">
          {blogCategories.map((item, idx) => (
            <span
              onClick={() => setSelectedCategory(item)}
              key={idx}
              className={`px-4 py-1 text-xs rounded-full border cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#c341f6] to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <Hash className="w-5" />}
          {loading ? 'Generating...' : 'Generate Title'}
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-150">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#8e37eb]" />
          <h3 className="text-xl font-semibold">Generated Titles</h3>
        </div>

        <div className="flex-1 overflow-y-auto mt-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#8e37eb]" />
              <p className="text-sm">Generating blog titles...</p>
            </div>
          ) : result ? (
            <div className="text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-gray-400">
              <Hash className="w-9 h-9" />
              <p className="text-sm">Enter a keyword and click "Generate Title" to get started</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogTitles
