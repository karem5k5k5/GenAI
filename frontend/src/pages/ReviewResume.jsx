import { FileText, Sparkles, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { useAppContext } from '../context/AppContext'

const ReviewResume = () => {
  const { backendUrl, showToast } = useAppContext()
  const [file, setFile] = useState(null)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected)
      setResult('')
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setResult('')
    const formData = new FormData()
    formData.append('resume', file)
    try {
      const res = await fetch(`${backendUrl}/creation/resume-review`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        showToast('Resume reviewed!', 'success')
      } else {
        showToast(data.message || 'Review failed', 'error')
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
          <Sparkles className="w-6 text-[#00da83]" />
          <h2 className="text-xl font-semibold">Resume Review</h2>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <label className="flex flex-col items-center justify-center w-full h-28 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          {file ? (
            <div className="flex flex-col items-center gap-2 text-gray-600 px-4 text-center">
              <FileText className="w-6 h-6 text-[#00da83]" />
              <span className="text-xs font-medium truncate max-w-full">{file.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Click to upload PDF resume</span>
            </div>
          )}
          <input
            onChange={handleFileChange}
            type="file"
            accept="application/pdf"
            className="hidden"
            required
          />
        </label>
        <p className="mt-1 text-xs text-gray-500">PDF format only, max 5MB</p>

        <button
          disabled={loading || !file}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#00da83] to-[#009bb3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-5 animate-spin" /> : <FileText className="w-5" />}
          {loading ? 'Reviewing...' : 'Review Resume'}
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-150">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00da83]" />
          <h3 className="text-xl font-semibold">Analysis Result</h3>
        </div>

        <div className="flex-1 overflow-y-auto mt-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#00da83]" />
              <p className="text-sm">Analyzing your resume...</p>
            </div>
          ) : result ? (
            <div className="text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-gray-400 text-sm">
              <FileText className="w-9 h-9" />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ReviewResume
