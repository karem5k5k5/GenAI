import { Image, Sparkles, Loader2, Download } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const imageStyles = ["Realistic", "Ghibli Style", "Anime Style", "Cartoon Style", "Fantasy Style", "3D Style", "Portrait Style"]

const GenerateImages = () => {
  const { backendUrl, showToast } = useAppContext()
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0])
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    const prompt = `Generate an image of ${input} in the style ${selectedStyle}.`
    try {
      const res = await fetch(`${backendUrl}/creation/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt, publish }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        showToast('Image generated!', 'success')
      } else {
        showToast(data.message || 'Generation failed', 'error')
      }
    } catch (_) {
      showToast('Network error', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!result) return
    try {
      const res = await fetch(result)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'generated-image.png'
      a.click()
      URL.revokeObjectURL(url)
    } catch (_) {
      showToast('Download failed', 'error')
    }
  }

  return (
    <section className="h-full overflow-y-scroll p-6 flex flex-wrap items-start gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00ad25]" />
          <h2 className="text-xl font-semibold">AI Image Generator</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          rows={4}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-none rounded-md text-sm border border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex flex-wrap gap-3 sm:max-w-9/11">
          {imageStyles.map((item, idx) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={idx}
              className={`px-4 py-1 text-xs rounded-full border cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#00ad25] to-[#04ff50] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <Image className="w-5" />}
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-[#00ad25]" />
            <h3 className="text-xl font-semibold">Generated Image</h3>
          </div>
          {result && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center mt-3">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#00ad25]" />
              <p className="text-sm">Generating your image...</p>
            </div>
          ) : result ? (
            <img src={result} alt="Generated" className="w-full rounded-lg object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-5 text-gray-400 text-sm">
              <Image className="w-9 h-9" />
              <p>Describe an image and click "Generate Image" to get started</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default GenerateImages
