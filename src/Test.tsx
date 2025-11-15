import React, { useState } from "react";
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
} from "@tnbt/react-favorit-style";
import { useI18n } from "./i18n";
import LanguageSwitcher from "./components/LanguageSwitcher";
export default function Test() {
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
  const { locale, t } = useI18n(); // Get both locale and t() function
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleDelete = () => {
    console.log("Item deleted successfully!");
  };

  return (
    <div>
      <LanguageSwitcher />
      <ButtonCommon onClick={() => setIsDeleteOpen(true)} variant="delete">
        {t("button.delete")}
      </ButtonCommon>
      {/* Example 1: Using contentKey with params for dynamic translation */}
      <ConfirmDelete
        onExcute={handleDelete}
        setIsModalOpen={setIsDeleteOpen}
        isModalOpen={isDeleteOpen}
        contentKey="content.deleteOrders"
        contentParams={{ count: 5 }}
      />
      {/* <SelectGray options={selectData} value={valueSelect} onChange={(e) => handleSelect(e)} /> */}
      <GradientButton variant="purple">Purple Button</GradientButton>
      <ButtonBorderGradient variant="purpleBlue">Purple</ButtonBorderGradient>
      <ButtonBorderGradient variant="cyanBlue">Purple</ButtonBorderGradient>
      <ButtonBorderGradient variant="greenBlue">Purple</ButtonBorderGradient>
      <h3 className="text-[22px] font-[500] mt-5 mb-3">Table common for apply specific with to each column</h3>
      <TableCommon data={commonTableData} pageSize={5} initialColumnWidths={{ 0: "150px", 1: "260px", 2: "140px" }} />
      <h3 className="text-[22px] font-[500] mt-5">Table with resize column's width</h3>
      <div className="overflow-hidden rounded-lg border border-gray-300 z-[11] my-[10px]">
        <TableWithResizeColumn
          data={tableData}
          stickyColumns={[0, 1, 2]} // make first and second columns sticky
          initialColumnWidths={{ 0: "180px", 1: "260px", 2: "140px" }}
          cellPadding="px-4 py-2"
          maxHeight="480px"
          pageSize={5}
          onSelectionChange={(ids) => handleGetSelected(ids)}
        />
      </div>
      <h3 className="text-[22px] font-[500] mt-5">Table with drag column</h3>
      <div className="overflow-hidden rounded-lg border border-gray-300 z-[11] my-[10px]">
        <TableWithDragColumn
          data={tableData}
          stickyColumns={[0, 1, 2]} // make first and second columns sticky
          initialColumnWidths={{ 0: "180px", 1: "260px", 2: "140px" }}
          cellPadding="px-4 py-2"
          maxHeight="480px"
          pageSize={5}
          isShowPagination={true}
          onSelectionChange={(ids) => handleGetSelected(ids)}
        />
      </div>
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
