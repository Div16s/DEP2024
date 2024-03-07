import { Card, Typography } from "@material-tailwind/react";
import { MdOutlinePendingActions } from "react-icons/md";

const TABLE_HEAD = ["Serial No.", "User", "Date", "Category"];

const TABLE_ROWS = [
    {
        sr_no: "1",
        name: "Rohit",
        date: "23/02/24",
        category: "SP101"
    },
    {
        sr_no: "2",
        name: "Mukesh",
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
        name: "Manish",
        date: "24/02/24",
        category: "SP101"
    },
    {
        sr_no: "5",
        name: "Rishabh",
        date: "04/01/24",
        category: "SP102"
    },
];

export default function PendingForms() {
    return (
        <div>
            <h1 className="mt-32 -mb-10 ml-36 text-lg text-blue-gray-900 font-semibold">
                <MdOutlinePendingActions size={40}/>
                PENDING FORMS 
            </h1>
            <div className="flex justify-center">
                <Card className="mt-14 h-full w-4/5 overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-00 bg-red-300 p-4">
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
                            {TABLE_ROWS.map(({ sr_no, name, date, category }, index) => (
                                <tr key={name} className="even:bg-blue-gray-50/50">
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
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                            {category}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}