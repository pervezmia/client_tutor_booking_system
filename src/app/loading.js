const Loading = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Icon */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-[1.75rem] bg-brand-400/20 animate-ping" />
          <div className="relative w-20 h-20 bg-brand-400 rounded-[1.75rem] flex items-center justify-center shadow-xl shadow-brand-400/30">
            <svg
              className="w-10 h-10 text-white animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="42"
                strokeDashoffset="14"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1.5">
          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce [animation-delay:-0.3s]">.</span>
              <span className="animate-bounce [animation-delay:-0.15s]">.</span>
              <span className="animate-bounce">.</span>
            </span>
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
            Please wait a moment
          </p>
        </div>

        {/* Progress bar shimmer — pure Tailwind, styled-jsx ছাড়া */}
        <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-brand-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;