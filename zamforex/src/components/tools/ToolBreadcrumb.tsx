import Link from "next/link";

export default function ToolBreadcrumb({ current }: { current?: string }) {
  return (
    <div className="ta-breadcrumb">
      <Link href="/">Home</Link>
      <span>/</span>
      {current ? <Link href="/tools">Tools</Link> : <span>Tools</span>}
      {current && (
        <>
          <span>/</span>
          <span>{current}</span>
        </>
      )}
    </div>
  );
}
