import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "brutalist-badge inline-flex items-center",
  {
    variants: {
      variant: {
        default: "brutalist-badge",
        secondary: "bg-cyan-400 border-2 border-black text-black font-black uppercase",
        destructive: "bg-red-500 border-2 border-black text-white font-black uppercase",
        outline: "bg-white border-2 border-black text-black font-black uppercase",
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
