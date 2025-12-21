import { AnimatePresence, motion as Motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

const AlertBase = ({
  show,
  onClose,
  title,
  message,
  autoClose,
  duration,
  showCloseButton = false,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <Motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-sm sm:max-w-xs"
        >
          <div className="relative overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-950/95 to-emerald-900/95 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 rounded-lg p-4 flex items-start gap-3">
            {/* Animated gradient background */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] rounded-lg"
              style={{ animation: 'gradientShift 3s ease infinite' }}
            />

            {/* Icon */}
            <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-emerald-400 mt-0.5" />

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="text-emerald-300 font-semibold text-sm sm:text-base mb-1 truncate">
                {title}
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words">
                {message}
              </p>
            </div>

            {/* Close button */}
            {showCloseButton && (
              <Motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-emerald-400/60 hover:text-emerald-300 ml-2 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Motion.button>
            )}

            {/* Progress bar */}
            {autoClose && duration && (
              <Motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 origin-left"
              />
            )}
          </div>

          <style jsx="true">{`
            @keyframes gradientShift {
              0%,
              100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
          `}</style>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export const SuccessAlert = AlertBase
export const TaskAlert = AlertBase
export const ChallengeCompleteAlert = AlertBase
