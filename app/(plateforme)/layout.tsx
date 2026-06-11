import PlatformeShell from "@/components/layout/PlatformeShell";

export default function LayoutPlateforme({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PlatformeShell>{children}</PlatformeShell>;
}
