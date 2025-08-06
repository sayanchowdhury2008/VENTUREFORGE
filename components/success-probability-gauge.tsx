"use client"

interface SuccessProbabilityGaugeProps {
  probability: number
  size?: "sm" | "md" | "lg"
}

export function SuccessProbabilityGauge({ probability, size = "md" }: SuccessProbabilityGaugeProps) {
  const getColor = (prob: number) => {
    if (prob >= 80) return "bg-lime-400"
    if (prob >= 60) return "bg-yellow-400"
    if (prob >= 40) return "bg-orange-400"
    return "bg-red-500"
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "w-12 h-12 text-xs"
      case "lg":
        return "w-20 h-20 text-lg"
      default:
        return "w-16 h-16 text-sm"
    }
  }

  return (
    <div className={`${getSizeClasses(size)} ${getColor(probability)} border-2 border-black harsh-shadow-sm flex items-center justify-center transform rotate-2`}>
      <span className="brutalist-text-primary font-black">
        {probability}%
      </span>
    </div>
  )
}
