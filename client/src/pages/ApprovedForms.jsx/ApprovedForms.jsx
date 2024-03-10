import { Card, Typography, IconButton, CardFooter, Button, } from "@material-tailwind/react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const TABLE_HEAD = ["Serial No.", "User", "Date", "Category"];
const ROWS_PER_PAGE = 7;

const TABLE_ROWS = [
    {
        sr_no: "1",
        name: "Rohit",
        date: "23/02/24",
        category: "SP101"
    },
    {
        sr_no: "2",
        name: "Apoorv",
        date: "21/01/24",
        category: "SP101"
    },
    {
        sr_no: "3",
        name: "Anil",
        date: "19/02/24",
        category: "SP102"
    },
    {
        sr_no: "4",
        name: "Nikhil",
        date: "24/02/24",
        category: "SP101"
    },
    {
        sr_no: "5",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "6",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "7",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "8",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "9",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "10",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "11",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "12",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "13",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "14",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "15",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "16",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "17",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "18",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "19",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "20",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "21",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "22",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "23",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
    {
        sr_no: "24",
        name: "Montu",
        date: "04/01/24",
        category: "SP102"
    },
];

export default function TableWithStripedRows() {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastRow = currentPage * ROWS_PER_PAGE;
    const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
    const currentRows = TABLE_ROWS.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(TABLE_ROWS.length / ROWS_PER_PAGE);
    return (
        <div className="h-screen">
            <h1 className="mt-32 -mb-10 ml-36 text-lg text-blue-gray-900 font-semibold">
                <AiOutlineFileDone size={40} />
                APPROVED FORMS
            </h1>
            <div className="flex justify-center">
                <Card className="mt-14 h-full w-4/5 overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-green-300 p-4">
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map(({ sr_no, name, date, category }, index) => (
                                <tr key={sr_no} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {sr_no}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            {category}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <Button
                                onClick={() => paginate(currentPage - 1)}
                                variant="outlined"
                                size="sm"
                                disabled={currentPage === 1}
                                className="flex justify-center items-center flex-col"
                            >
                                <FaArrowLeft /> Previous
                                
                            </Button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        variant="outlined"
                                        size="sm"
                                        disabled={currentPage === i + 1}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                onClick={() => paginate(currentPage + 1)}
                                variant="outlined"
                                size="sm"
                                disabled={currentPage === totalPages}
                                className="flex justify-center items-center flex-col"
                            >
                                <FaArrowRight /> Next
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}