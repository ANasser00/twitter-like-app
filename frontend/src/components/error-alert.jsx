"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

export function ErrorAlert({ message, onDismiss }) {
  return (
    <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        <Button variant="ghost" size="sm" onClick={onDismiss} className="h-auto p-1 hover:bg-destructive/20">
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
