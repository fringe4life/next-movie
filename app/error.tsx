'use client' // Error boundaries must be Client Components
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import EmptySection from './components/EmptySection'
import EmptyStateTitle from './components/EmptyStateTitle'
import notFound from "@public/not-found.svg"
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <EmptySection>
        <Image width='120' height='120' className="w-30 h-30" src={notFound.src} alt="Your movie wasn&apos;t found" />
        <EmptyStateTitle title="Unable to find what you&apos;re looking for. Please try another search." />
        <Button onClick={reset} variant="default">Or try again</Button>
    </EmptySection>
  )
}

