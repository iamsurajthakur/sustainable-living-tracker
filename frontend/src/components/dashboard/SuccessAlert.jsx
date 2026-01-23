import { AnimatePresence, motion as Motion } from 'framer-motion'
import { CheckCircle2, X, XCircle } from 'lucide-react'

const AlertBase = ({
  show,
  onClose,
  title,
  message,
  autoClose,
  duration,
  showCloseButton = false,
  icon,
  colors = {},
}) => {
  const {
    border = 'border-emerald-500/30',
    gradientFrom = 'from-emerald-950/95',
    gradientTo = 'to-emerald-900/95',
    iconColor = 'text-emerald-400',
    titleColor = 'text-emerald-300',
    messageColor = 'text-gray-300',
    progressBar = 'bg-gradient-to-r from-emerald-400 to-teal-400',
  } = colors

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
          <div
            className={`relative overflow-hidden ${border} bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-xl shadow-2xl shadow-emerald-500/20 rounded-lg p-4 flex items-start gap-3`}
          >
            {/* Animated gradient background */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} via-teal-500 to-emerald-500 bg-[length:200%_100%] rounded-lg`}
              style={{ animation: 'gradientShift 3s ease infinite' }}
            />

            {/* Icon */}
            {icon || (
              <CheckCircle2
                className={`flex-shrink-0 h-5 w-5 ${iconColor} mt-0.5`}
              />
            )}

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4
                className={`font-semibold text-sm sm:text-base mb-1 truncate ${titleColor}`}
              >
                {title}
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed break-words ${messageColor}`}
              >
                {message}
              </p>
            </div>

            {/* Close button */}
            {showCloseButton && (
              <Motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`${iconColor}/60 hover:${iconColor} ml-2 flex-shrink-0`}
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
                className={`absolute bottom-0 left-0 h-1 ${progressBar} origin-left`}
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

// Prebuilt alerts
export const SuccessAlert = (props) => (
  <AlertBase
    {...props}
    title={props.title || 'Success'}
    colors={{
      border: 'border-emerald-500/30',
      gradientFrom: 'from-emerald-950/95',
      gradientTo: 'to-emerald-900/95',
      iconColor: 'text-emerald-400',
      titleColor: 'text-emerald-300',
      messageColor: 'text-gray-300',
      progressBar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
    }}
    icon={
      <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-emerald-400 mt-0.5" />
    }
  />
)

export const TaskAlert = (props) => (
  <AlertBase
    {...props}
    title={props.title || 'Task Complete'}
    colors={{
      border: 'border-blue-500/30',
      gradientFrom: 'from-blue-950/95',
      gradientTo: 'to-blue-900/95',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-300',
      messageColor: 'text-gray-300',
      progressBar: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    }}
    icon={
      <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-blue-400 mt-0.5" />
    }
  />
)

export const ChallengeCompleteAlert = (props) => (
  <AlertBase
    {...props}
    title={props.title || 'Challenge Complete'}
    colors={{
      border: 'border-yellow-500/30',
      gradientFrom: 'from-yellow-950/95',
      gradientTo: 'to-yellow-900/95',
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-300',
      messageColor: 'text-gray-300',
      progressBar: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    }}
    icon={
      <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-yellow-400 mt-0.5" />
    }
  />
)

export const ErrorAlert = (props) => (
  <AlertBase
    {...props}
    title={props.title || 'Error'}
    colors={{
      border: 'border-red-500/30',
      gradientFrom: 'from-red-950/95',
      gradientTo: 'to-red-900/95',
      iconColor: 'text-red-400',
      titleColor: 'text-red-300',
      messageColor: 'text-gray-300',
      progressBar: 'bg-gradient-to-r from-red-400 to-orange-400',
    }}
    icon={<XCircle className="flex-shrink-0 h-5 w-5 text-red-400 mt-0.5" />}
  />
)
