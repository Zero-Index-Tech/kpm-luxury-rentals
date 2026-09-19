import './store.css'

export default function YocoNotice({ compact = false }: { compact?: boolean }) {
  return <div className={`yoco-notice ${compact ? 'yoco-notice-compact' : ''}`}>
    <img src="/merch/Yoco-logo.png" alt="Yoco" width={112} height={63} loading="lazy" />
    <div><p>Yoco coming online soon</p><span>{compact ? 'Online merch payments are on their way.' : 'Save your favourites now. We’ll email you when payments open if you opt in.'}</span></div>
  </div>
}
