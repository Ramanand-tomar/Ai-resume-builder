import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 border-gray-300 h-10 w-full min-w-0 rounded-lg border bg-white px-3 py-2 text-base text-gray-900 shadow-xs transition-colors outline-none focus:bg-white focus:text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Input }
