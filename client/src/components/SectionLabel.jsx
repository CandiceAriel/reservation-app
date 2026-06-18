import { cn } from '../lib/utils'; // Optional: Use if you have a shadcn style class merger

export function SectionLabel({ 
  children, 
  className = '', 
  lineClassName = '', 
  align = 'left' 
}) {
  
  // Alignment mapping for the container elements
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  return (
    <div className={cn("flex flex-col gap-2.5 select-none", alignmentClasses[align], className)}>
      {/* Decorative Top Accent Line */}
      <span 
        className={cn(
          "w-12 h-[2px] bg-brown rounded-full tracking-normal block", 
          lineClassName
        )} 
      />
      
      {/* Label Text */}
      <span className="font-display font-bold text-xs tracking-widest uppercase text-brown/90">
        {children}
      </span>
    </div>
  );
}