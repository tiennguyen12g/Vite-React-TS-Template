import { FaRegTimesCircle } from "react-icons/fa";
import clsx from "clsx";

interface Props {
  className?: string; // e.g. "text-gray-600 hover:text-gray-900"
  size?: number;
  onClick?: () => void;
}

export default function CloseIcon({ className, size = 14, onClick }: Props) {
  return (
    <FaRegTimesCircle
      size={size}
      onClick={onClick}
      // do NOT pass color prop, use tailwind text classes instead
      className={clsx("cursor-pointer transition-colors", className)}
    />
  );
}
