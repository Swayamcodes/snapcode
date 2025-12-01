import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-6 py-3 flex justify-between items-center bg-white">
      <span className="font-semibold text-lg">Component-to-Code Studio</span>

      <div className="flex items-center gap-3">
        <Button variant="outline">Examples</Button>
        <Button>Open Studio</Button>
      </div>
    </nav>
  );
}
