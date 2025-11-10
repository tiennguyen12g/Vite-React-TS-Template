import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: any;
  onChange: (value: any) => void;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  className,
  fullWidth,
  disabled,
}: SelectProps) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-200">{label}</label>
      )}
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-gradient-to-br from-orange-50 to-orange-100 text-gray-900 px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400/50 transition ${fullWidth ? "w-full" : ""
          } disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-400 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}


// ex:
//       <Select
//         label="Select Country"
//         value={country}
//         onChange={setCountry}
//         options={[
//           { label: "Vietnam", value: "vn" },
//           { label: "USA", value: "us" },
//           { label: "Japan", value: "jp" },
//         ]}
//       />