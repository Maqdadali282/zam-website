import Link from "next/link";

export default function LearningBreadcrumb({ current }: { current?: string }) {
  return (
    <div className="ta-breadcrumb">
      <Link href="/">Home</Link>
      <span>/</span>
      {current ? <Link href="/forex-learning">Forex Learning</Link> : <span>Forex Learning</span>}
      {current && (
        <>
          <span>/</span>
          <span>{current}</span>
        </>
      )}
    </div>
  );
}
