import { useState } from 'react'
import Markdown from 'react-markdown'

const typeLabel = (type) => {
  const map = { title: 'Blog Title', document: 'Resume', article: 'Article', image: 'Image' }
  return map[type] || type
}

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  const id = item._id || item.id
  const date = item.createdAt || item.created_at

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h4 className="font-medium text-gray-800">{item.prompt}</h4>
          <p className="text-gray-500 mt-0.5">
            {typeLabel(item.type)} · {date ? new Date(date).toLocaleDateString() : ''}
          </p>
        </div>
        <button className="shrink-0 bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] px-4 py-1 rounded-full text-xs">
          {typeLabel(item.type)}
        </button>
      </div>

      {expanded && (
        <div className="mt-3">
          {item.type === 'image' ? (
            <img src={item.content} alt="creation" className="w-full max-w-md rounded-lg" />
          ) : (
            <div className="h-full overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
