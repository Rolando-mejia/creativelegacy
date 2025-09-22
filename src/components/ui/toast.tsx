import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
  show: boolean;
}

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose, 
  show 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const typeStyles = {
    success: 'bg-green-600/90 border-green-400/50 text-green-50',
    error: 'bg-red-600/90 border-red-400/50 text-red-50',
    info: 'bg-blue-600/90 border-blue-400/50 text-blue-50'
  };

  const icons = {
    success: CheckCircle,
    error: X,
    info: CheckCircle
  };

  const Icon = icons[type];

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 flex justify-center sm:justify-end">
      <div className={`
        ${typeStyles[type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        transform transition-all duration-300 ease-in-out
        px-4 sm:px-6 py-3 sm:py-4 rounded-lg border backdrop-blur-sm
        flex items-center gap-2 sm:gap-3 shadow-lg w-full max-w-sm sm:max-w-md
        font-orbitron
      `}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-medium flex-1">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-1 sm:ml-2 hover:opacity-70 transition-opacity flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}