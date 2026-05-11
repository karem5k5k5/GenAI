import { useAppContext } from '../context/AppContext'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
}

const borderColors = {
  success: 'border-green-200',
  error: 'border-red-200',
  info: 'border-blue-200',
}

const Toast = () => {
  const { toast } = useAppContext()

  if (!toast.visible) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border ${borderColors[toast.type]} rounded-xl shadow-lg px-4 py-3 max-w-sm animate-fade-in`}>
      {icons[toast.type]}
      <p className="text-sm text-gray-700 flex-1">{toast.message}</p>
    </div>
  )
}

export default Toast
