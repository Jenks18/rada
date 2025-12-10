import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-gray-200 border border-gray-700",
        primary: "bg-purple-600/20 text-purple-400 border border-purple-500/30",
        success: "bg-green-600/20 text-green-400 border border-green-500/30",
        warning: "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30",
        danger: "bg-red-600/20 text-red-400 border border-red-500/30",
        outline: "border border-gray-700 text-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
