import React, { useState } from "react";
import { IoIosArrowDown,  } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



interface TutorialBoxProps {
  componentName: string;
  propsInterface:  React.ReactNode;
  exampleCode:  React.ReactNode;
  description?: string;
}

export default function TutorialBox({
  componentName,
  propsInterface,
  exampleCode,
  description,
}: TutorialBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white">
          See how to usage
        </span>
        {isOpen ? (
          <IoIosArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <IoIosArrowDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {description && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Props Interface
            </h4>
            <div className="rounded-lg overflow-hidden">
              {propsInterface}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Example Usage
            </h4>
            <div className="rounded-lg overflow-hidden">
              {exampleCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

