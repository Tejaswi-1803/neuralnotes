import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ code, language = 'python' }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = code
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.append(textArea)
      textArea.select()
      const succeeded = document.execCommand('copy')
      textArea.remove()
      if (succeeded) {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    }
  }

  return <div className="code-block"><div className="code-toolbar"><span>{language}</span><button type="button" onClick={copyCode} aria-label="Copy code">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy code'}</button></div><pre><code>{code}</code></pre></div>
}