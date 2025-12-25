"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface ValueSliderProps {
  label: string
  value: number
  onValueChange: (value: number) => void
  min: number
  max: number
  step: number
  unit?: string
  description?: string
  className?: string
}

export function ValueSlider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  unit,
  description,
  className,
}: ValueSliderProps) {
  const handleDecrement = () => {
    onValueChange(Math.max(min, value - step))
  }

  const handleIncrement = () => {
    onValueChange(Math.min(max, value + step))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(unit || '', '');
    const newValue = parseInt(rawValue, 10);
    if (!isNaN(newValue)) {
      onValueChange(Math.max(min, Math.min(max, newValue)))
    }
  }
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(unit || '', '');
      const newValue = parseInt(rawValue, 10);
      if (isNaN(newValue) || newValue < min) {
        onValueChange(min);
      } else if (newValue > max) {
        onValueChange(max);
      }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2 rounded-md border border-input bg-background text-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-none border-r"
            onClick={handleDecrement}
            disabled={value <= min}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrement</span>
          </Button>
          <Input
            type="text"
            className="h-8 w-14 border-0 bg-transparent p-0 text-center shadow-none focus-visible:ring-0"
            value={`${value}${unit || ''}`}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-none border-l"
            onClick={handleIncrement}
            disabled={value >= max}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increment</span>
          </Button>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onValueChange(values[0])}
        min={min}
        max={max}
        step={step}
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

    