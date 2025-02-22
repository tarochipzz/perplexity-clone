"use client";
import { useEffect, useRef, useState } from "react";

export interface ButtonDropdownProps<T> {
  defaultValue: string;
  openUpwards?: boolean;
  ButtonComponent: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { selectedValue: string }
  >;
  options: T[];
  renderOption: (
    option: T,
    onOptionClick: (value: string) => void
  ) => React.ReactNode;
}

export const ButtonDropdown = <T,>({
  defaultValue,
  options,
  renderOption,
  ButtonComponent,
  openUpwards = false,
}: ButtonDropdownProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <ButtonComponent
        onClick={() => setDropdownOpen((prev) => !prev)}
        selectedValue={selectedValue}
      />
      {dropdownOpen && (
        <div
          className={`absolute ${
            openUpwards ? "bottom-full mb-2" : "top-full mt-2"
          } w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-10 p-3`}
        >
          {options.map((option) =>
            renderOption(option, (value) => {
              setDropdownOpen(false);
              setSelectedValue(value);
            })
          )}
        </div>
      )}
    </div>
  );
};
