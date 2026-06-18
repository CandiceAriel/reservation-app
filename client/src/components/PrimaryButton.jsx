export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
  disabled = false,
  size = 'md',
}) {
  
  const sizeClasses = {
    sm: 'py-2.5 px-6 text-sm',
    md: 'py-3.5 px-9 text-base',
    lg: 'py-4 px-10 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-display font-bold rounded-2xl inline-flex items-center justify-center
        bg-brown text-cream 
        transition-all duration-300 
        hover:bg-[#A06D48] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-btn-hover 
        active:translate-y-0 active:scale-[0.98] active:shadow-none 
        focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-cream 
        disabled:opacity-70 disabled:pointer-events-none 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `.trim().replace(/\s+/g, ' ')} 
    >
      {children}
    </button>
  );
}