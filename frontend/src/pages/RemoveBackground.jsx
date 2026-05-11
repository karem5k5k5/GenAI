import { Eraser, Sparkles, Loader2, Download, Upload } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

const RemoveBackground = () => {
  const { backendUrl, showToast } = useAppContext()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setResult('')
    setPreview(URL.createObjectURL(selected))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setResult('')
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await fetch(`${backendUrl}/creation/remove-background`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        showToast('Background removed!', 'success')
      } else {
        showToast(data.message || 'Processing failed', 'error')
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
      a.download = 'no-background.png'
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
          <Sparkles className="w-6 text-[#ff4938]" />
          <h2 className="text-xl font-semibold">Background Removal</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <label className="flex flex-col items-center justify-center w-full h-32 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-contain rounded-lg p-1" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Click to upload image</span>
            </div>
          )}
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            className="hidden"
            required
          />
        </label>
        <p className="mt-1 text-xs text-gray-500">Supports JPG, PNG, and other image formats</p>

        <button
          disabled={loading || !file}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <Eraser className="w-5" />}
          {loading ? 'Processing...' : 'Remove Background'}
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#ff4938]" />
            <h3 className="text-xl font-semibold">Processed Image</h3>
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
              <Loader2 className="w-8 h-8 animate-spin text-[#ff4938]" />
              <p className="text-sm">Removing background...</p>
            </div>
          ) : result ? (
            <img src={result} alt="processed" className="w-full rounded-lg object-contain" style={{ background: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 20px 20px' }} />
          ) : (
            <div className="flex flex-col items-center gap-5 text-gray-400 text-sm">
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RemoveBackground
