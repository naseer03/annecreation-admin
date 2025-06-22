import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/air-conditioner-unit.png"
        alt="Anne Creations Logo"
        width={64}
        height={64}
        className="rounded-full"
      />
    </div>
  )
}
