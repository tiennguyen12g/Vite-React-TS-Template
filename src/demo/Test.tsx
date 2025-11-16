import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ButtonCommon,
  GradientButton,
  ButtonBorderGradient,
  Input,
  type TableHeader,
  TableWithDragColumn,
  TableCommon,
  TableWithResizeColumn,
  SelectGray,
  ConfirmDelete,
  UI_KEYS,
  GroupButton,
} from "@tnbt/react-favorit-style";
import ModalExample from "../examples/ModalExample";
import LanguageSwitcher from "../components/LanguageSwitcher";

import TableExample from "../examples/TableExample";
import InputExample from "../examples/InputExample";
import SearchExample from "../examples/SearchExample";
import SelectExample from "../examples/SelectExample";
import ButtonExample from "../examples/ButtonExample";
import ButtonBlurExample from "../examples/ButtonBlurExample";
import CustomModalExample from "../examples/CustomModalExample";
import TestSeriUi from "../examples/TestSeriUi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import TutorialBox from "./TutorialBox";
export default function Test() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"style" | "translation">("style");
  const [selected, setSelected] = useState<any[]>([]);
  const handleGetSelected = (data: any[]) => {
    console.log("data", data);
    setSelected(data);
  };
  const [valueSelect, setValueSelect] = useState("");
  const handleSelect = (value: any) => {
    console.log("e", value);
    setValueSelect(value);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleDelete = () => {
    console.log("Item deleted successfully!");
  };

  return (
    <div className="w-[80%] bg-white py-5">
      <div className="flex justify-center my-5 border-b border-gray-300 py-2.5">
        {/* The div create background for group button. */}
        <div className="bg-gray-200 px-1.25 py-0.75 rounded-sm w-fit max-w-full">
          <GroupButton
            options={[
              { key: "style", label: "Style" },
              { key: "translation", label: "Language" },
            ]}
            defaultValue="style"
            onChange={(key, option) => setViewMode(key as "style" | "translation")}
            size="md"
          />
        </div>
      </div>
      {viewMode === "translation" && (
        <div>
          <h3 className="text-[26px] font-[700] text-left">1. Testing switch language</h3>
          <ModalExample />
        </div>
      )}

      {viewMode === "style" && (
    <div>
      {/* Modal Section */}
      <h3 className="text-[26px] font-[700] text-left">1. Modal</h3>
      <CustomModalExample />
      <TutorialBox
        componentName="ConfirmDelete"
        description="A confirmation modal for delete actions with warning message and translation support."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface Props {
  onExcute?: () => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  content?: string;
  contentKey?: string; // Translation key for content
  contentParams?: Record<string, string | number>; // Parameters for interpolation
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { ConfirmDelete, UI_KEYS } from "@tnbt/react-favorit-style";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {t(UI_KEYS.button.delete, "Delete")}
      </button>
      
      <ConfirmDelete
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        onExcute={() => console.log("Deleted")}
        contentKey="content.deleteOrders"
        contentParams={{ count: 5 }}
      />
    </>
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Toast Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">2. Toast SeraUi</h3>
      <TestSeriUi />
      <TutorialBox
        componentName="Notification"
        description="Toast notification system for displaying success, error, warning, and info messages."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface NotificationProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: NotificationPosition;
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { Notification } from "@tnbt/react-favorit-style";

// Show notification
Notification.success("Operation completed!");
Notification.error("Something went wrong");
Notification.warning("Please check your input");
Notification.info("New update available");`}
          </SyntaxHighlighter>
        }
      />

      {/* Button Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">4. Button</h3>
      <ButtonExample />
      <TutorialBox
        componentName="ButtonCommon"
        description="A versatile button component with multiple variants, sizes, and icon support."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface ButtonCommonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "continue" | "agree" | "delete" | "cancel" 
    | "next" | "back" | "submit" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode | React.ComponentType | keyof typeof icons;
  iconPosition?: "left" | "right";
  iconClass?: string;
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { ButtonCommon, icons } from "@tnbt/react-favorit-style";

function MyComponent() {
  return (
    <>
      <ButtonCommon variant="default" size="md">
        Default Button
      </ButtonCommon>
      
      <ButtonCommon 
        variant="delete" 
        icon={icons.trash}
        iconPosition="left"
        onClick={() => console.log("Delete")}
      >
        Delete Item
      </ButtonCommon>
      
      <ButtonCommon 
        variant="submit" 
        fullWidth
        className="bg-blue-600 hover:bg-blue-700"
      >
        Custom Styled Button
      </ButtonCommon>
    </>
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Button Blur Section */}
      <h3 className="text-[26px] font-[700] mt-8 text-left">5. Button Blur With Compatible Background(Glassmorphism)</h3>
      <ButtonBlurExample />
      <TutorialBox
        componentName="ButtonBlur"
        description="Glassmorphism button with blur effect, perfect for overlays and modern UI designs."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface ButtonBlurProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode | React.ComponentType;
  iconPosition?: "left" | "right";
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { ButtonBlur } from "@tnbt/react-favorit-style";

function MyComponent() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <ButtonBlur variant="default" size="md">
        Glassmorphism Button
      </ButtonBlur>
      
      <ButtonBlur variant="light" fullWidth>
        Light Variant
      </ButtonBlur>
    </div>
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Select Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">6. Select + Dropdown</h3>
      <SelectExample />
      <TutorialBox
        componentName="SelectGray"
        description="Styled select dropdown component with customizable options and full-width support."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface SelectGrayProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ key: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  isUsePlaceHolder?: boolean;
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { SelectGray } from "@tnbt/react-favorit-style";
import { useState } from "react";

function MyComponent() {
  const [selected, setSelected] = useState("");
  
  const options = [
    { key: "en", label: "English" },
    { key: "vi", label: "Vietnamese" },
  ];
  
  return (
    <SelectGray
      value={selected}
      onChange={setSelected}
      options={options}
      placeholder="Select language"
      fullWidth
      size="md"
    />
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Search Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">7. Search</h3>
      <SearchExample />
      <TutorialBox
        componentName="Search"
        description="Search input component with debounce support and customizable styling."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onDebounceChange?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { Search } from "@tnbt/react-favorit-style";
import { useState } from "react";

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Search
      value={searchTerm}
      onChange={setSearchTerm}
      onDebounceChange={(value) => {
        // Called after user stops typing
        console.log("Searching for:", value);
      }}
      placeholder="Search..."
      debounceMs={300}
      fullWidth
    />
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Input Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">8. Input</h3>
      <InputExample />
      <TutorialBox
        componentName="Input"
        description="Feature-rich input component with icons, validation, debounce, and error handling."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  value?: string;
  onChange?: (value: string) => void;
  onDebounceChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode | React.ComponentType;
  rightIcon?: React.ReactNode | React.ComponentType;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  debounceMs?: number;
  showClearButton?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { Input } from "@tnbt/react-favorit-style";
import { MdEmail, MdLock } from "react-icons/md";
import { useState } from "react";

function MyComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <>
      <Input
        type="email"
        value={email}
        onChange={setEmail}
        label="Email"
        placeholder="Enter your email"
        leftIcon={MdEmail}
        error={!email ? "Email is required" : undefined}
        fullWidth
        required
      />
      
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        label="Password"
        placeholder="Enter password"
        leftIcon={MdLock}
        showClearButton
        fullWidth
      />
    </>
  );
}`}
          </SyntaxHighlighter>
        }
      />

      {/* Table Section */}
      <h3 className="text-[26px] font-[700] text-left mt-8">9. Table</h3>
      <TableExample />
      <TutorialBox
        componentName="TableCommon"
        description="Flexible table component with sorting, pagination, and customizable columns."
        propsInterface={
          <SyntaxHighlighter language="typescript" style={dracula}>
            {`interface TableCommonProps {
  headers: TableHeader[];
  rows: TableRow[];
  onRowClick?: (row: TableRow) => void;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
}

interface TableHeader {
  key: string;
  label: string;
  width?: number;
  align?: "left" | "center" | "right";
  sticky?: boolean;
}`}
          </SyntaxHighlighter>
        }
        exampleCode={
          <SyntaxHighlighter language="tsx" style={dracula}>
            {`import { TableCommon, type TableHeader, type TableRow } from "@tnbt/react-favorit-style";

function MyComponent() {
  const headers: TableHeader[] = [
    { key: "name", label: "Name", width: 200 },
    { key: "email", label: "Email", width: 250 },
    { key: "role", label: "Role", width: 150 },
  ];
  
  const rows: TableRow[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];
  
  return (
    <TableCommon
      headers={headers}
      rows={rows}
      onRowClick={(row) => console.log("Clicked:", row)}
      sortable
      pagination
      pageSize={10}
    />
  );
}`}
          </SyntaxHighlighter>
        }
      />
    </div>
      )}
    </div>
  );
}
const commonTableData = {
  headers: [
    { key: "name", label: "Name", sticky: true, width: 120, align: "center" },
    { key: "role", label: "Role", width: 120, align: "right" },
    { key: "status", label: "Status", width: 120, align: "left" },
    { key: "age", label: "Age", width: 80 },
    { key: "birthday", label: "Birthday", width: 140 },
    { key: "company", label: "Company", width: 200 },
  ] as TableHeader[],
  rows: [
    {
      id: "1",
      name: "John Doe",
      role: "Owner",
      status: "Active",
      age: 34,
      birthday: "1990-01-12",
      company: "Acme Inc.",
      country: "USA",
      phone: "+1 555-1203",
      relationship: "Married",
      email: "john.doe@example.com",
      address: "123 Silicon Valley, CA",
      joined: "2020-05-21",
    },
    {
      id: "2",
      name: "Alice Johnson",
      role: "User",
      status: "Pending",
      age: 29,
      birthday: "1995-07-08",
      company: "Meta Labs",
      country: "Canada",
      phone: "+1 444-8811",
      relationship: "Single",
      email: "alice.j@example.com",
      address: "44 Toronto Ave",
      joined: "2022-10-10",
    },
    {
      id: "3",
      name: "Mike Smith",
      role: "Admin",
      status: "Active",
      age: 41,
      birthday: "1983-03-17",
      company: "TikVision",
      country: "Germany",
      phone: "+49 103-3344",
      relationship: "Married",
      email: "mike.smith@example.com",
      address: "99 Berlin Street",
      joined: "2019-08-12",
    },
  ],
};

export const tableData = {
  headers: [
    { key: "select", label: "", type: "checkbox", sticky: true, width: 50 },
    { key: "name", label: "Name", sticky: true, width: 160, align: "center" },
    { key: "role", label: "Role", width: 120 },
    { key: "status", label: "Status", width: 120 },
    { key: "age", label: "Age", width: 80 },
    { key: "birthday", label: "Birthday", width: 140 },
    { key: "company", label: "Company", width: 200 },
    { key: "country", label: "Country", width: 140 },
    { key: "phone", label: "Phone", width: 160 },
    { key: "relationship", label: "Relationship", width: 160 },
    { key: "email", label: "Email", width: 240 },
    { key: "address", label: "Address", width: 260 },
    { key: "joined", label: "Joined Date", width: 140 },
  ] as TableHeader[],

  rows: [
    {
      id: "1",
      name: "John Doe",
      role: "Owner",
      status: "Active",
      age: 34,
      birthday: "1990-01-12",
      company: "Acme Inc.",
      country: "USA",
      phone: "+1 555-1203",
      relationship: "Married",
      email: "john.doe@example.com",
      address: "123 Silicon Valley, CA",
      joined: "2020-05-21",
    },
    {
      id: "2",
      name: "Alice Johnson",
      role: "User",
      status: "Pending",
      age: 29,
      birthday: "1995-07-08",
      company: "Meta Labs",
      country: "Canada",
      phone: "+1 444-8811",
      relationship: "Single",
      email: "alice.j@example.com",
      address: "44 Toronto Ave",
      joined: "2022-10-10",
    },
    {
      id: "3",
      name: "Mike Smith",
      role: "Admin",
      status: "Active",
      age: 41,
      birthday: "1983-03-17",
      company: "TikVision",
      country: "Germany",
      phone: "+49 103-3344",
      relationship: "Married",
      email: "mike.smith@example.com",
      address: "99 Berlin Street",
      joined: "2019-08-12",
    },
    {
      id: "4",
      name: "Emma Watson",
      role: "Supervisor",
      status: "Pending",
      age: 31,
      birthday: "1993-11-22",
      company: "FutureTech",
      country: "UK",
      phone: "+44 220-2211",
      relationship: "Engaged",
      email: "emma.w@example.com",
      address: "Ampere Rd, London",
      joined: "2021-02-03",
    },
    {
      id: "5",
      name: "Bruce Wayne",
      role: "VIP",
      status: "Active",
      age: 38,
      birthday: "1986-09-15",
      company: "Wayne Enterprises",
      country: "USA",
      phone: "+1 999-1010",
      relationship: "Single",
      email: "bruce.w@example.com",
      address: "Wayne Manor, Gotham",
      joined: "2018-01-01",
    },
    {
      id: "6",
      name: "John Doe",
      role: "Owner",
      status: "Active",
      age: 34,
      birthday: "1990-01-12",
      company: "Acme Inc.",
      country: "USA",
      phone: "+1 555-1203",
      relationship: "Married",
      email: "john.doe@example.com",
      address: "123 Silicon Valley, CA",
      joined: "2020-05-21",
    },
    {
      id: "7",
      name: "Alice Johnson",
      role: "User",
      status: "Pending",
      age: 29,
      birthday: "1995-07-08",
      company: "Meta Labs",
      country: "Canada",
      phone: "+1 444-8811",
      relationship: "Single",
      email: "alice.j@example.com",
      address: "44 Toronto Ave",
      joined: "2022-10-10",
    },
    {
      id: "8",
      name: "Mike Smith",
      role: "Admin",
      status: "Active",
      age: 41,
      birthday: "1983-03-17",
      company: "TikVision",
      country: "Germany",
      phone: "+49 103-3344",
      relationship: "Married",
      email: "mike.smith@example.com",
      address: "99 Berlin Street",
      joined: "2019-08-12",
    },
    {
      id: "9",
      name: "Emma Watson",
      role: "Supervisor",
      status: "Pending",
      age: 31,
      birthday: "1993-11-22",
      company: "FutureTech",
      country: "UK",
      phone: "+44 220-2211",
      relationship: "Engaged",
      email: "emma.w@example.com",
      address: "Ampere Rd, London",
      joined: "2021-02-03",
    },
    {
      id: "10",
      name: "Bruce Wayne",
      role: "VIP",
      status: "Active",
      age: 38,
      birthday: "1986-09-15",
      company: "Wayne Enterprises",
      country: "USA",
      phone: "+1 999-1010",
      relationship: "Single",
      email: "bruce.w@example.com",
      address: "Wayne Manor, Gotham",
      joined: "2018-01-01",
    },
    {
      id: "11",
      name: "John Doe",
      role: "Owner",
      status: "Active",
      age: 34,
      birthday: "1990-01-12",
      company: "Acme Inc.",
      country: "USA",
      phone: "+1 555-1203",
      relationship: "Married",
      email: "john.doe@example.com",
      address: "123 Silicon Valley, CA",
      joined: "2020-05-21",
    },
    {
      id: "12",
      name: "Alice Johnson",
      role: "User",
      status: "Pending",
      age: 29,
      birthday: "1995-07-08",
      company: "Meta Labs",
      country: "Canada",
      phone: "+1 444-8811",
      relationship: "Single",
      email: "alice.j@example.com",
      address: "44 Toronto Ave",
      joined: "2022-10-10",
    },
    {
      id: "13",
      name: "Mike Smith",
      role: "Admin",
      status: "Active",
      age: 41,
      birthday: "1983-03-17",
      company: "TikVision",
      country: "Germany",
      phone: "+49 103-3344",
      relationship: "Married",
      email: "mike.smith@example.com",
      address: "99 Berlin Street",
      joined: "2019-08-12",
    },
    {
      id: "14",
      name: "Emma Watson",
      role: "Supervisor",
      status: "Pending",
      age: 31,
      birthday: "1993-11-22",
      company: "FutureTech",
      country: "UK",
      phone: "+44 220-2211",
      relationship: "Engaged",
      email: "emma.w@example.com",
      address: "Ampere Rd, London",
      joined: "2021-02-03",
    },
    {
      id: "15",
      name: "Bruce Wayne",
      role: "VIP",
      status: "Active",
      age: 38,
      birthday: "1986-09-15",
      company: "Wayne Enterprises",
      country: "USA",
      phone: "+1 999-1010",
      relationship: "Single",
      email: "bruce.w@example.com",
      address: "Wayne Manor, Gotham",
      joined: "2018-01-01",
    },
  ],
};
const selectData = [
  { key: "vi", label: "Tiếng Việt" },
  { key: "en", label: "English" },
];
