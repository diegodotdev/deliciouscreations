import MaxWidthWrapper from "./max-width-wrapper";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <MaxWidthWrapper className="h-[90vh] grid place-items-center">
      <Loader2 size={15} className="animate-spin" />
    </MaxWidthWrapper>
  );
}
