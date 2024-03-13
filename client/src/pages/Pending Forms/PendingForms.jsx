import { Card, Typography } from "@material-tailwind/react";
import { MdOutlinePendingActions } from "react-icons/md";
import { pendingForms, pendingFormsAdmin } from "../../services/Apis";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category"];

// Assuming you have a function to fetch pending forms for a particular user from the backend
const fetchPendingFormsForUser = async (userId) => {
    // Make an API request to fetch pending forms data for the specified user ID
    // Replace the URL with your actual backend endpoint
    console.log("User ID: ", userId);
    const userData = {
        userId
    }
    const response = await pendingForms(userData);
    if (response.status === 200) {
        console.log(response.data);
        return await response.data;
    }
    else {
        toast.error(response.response.data.err);
        return response.response.data.err;
    }
};

const fetchPendingFormsForAdmin = async (username) => {
    try {
        const userData = {
            username
        }
        const response = await pendingFormsAdmin(userData);
        if (response.status === 200) {
            console.log(response.data);
            return await response.data;
        }
        else {
            toast.error(response.response.data.err);
            return response.response.data.err;
        }
    } catch (error) {
        toast.error("An unexpected error occurred.");
    }
}

export default function PendingForms() {
    const [userPendingForms, setUserPendingForms] = useState([]);
    const userId = JSON.parse(localStorage.getItem("userInfo")).id;
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    useEffect(() => {
        if (role === "HOD") {
            // Fetch pending forms for the specified user ID when the component mounts
            const username = JSON.parse(localStorage.getItem("userInfo")).name;
            fetchPendingFormsForAdmin(username)
                .then(data => {
                    setUserPendingForms(data);
                })
                .catch(error => {
                    console.error('Error fetching pending forms for user:', error);
                });
        }
        else if (role === "FACULTY") {
            // Fetch pending forms for the specified user ID when the component mounts
            fetchPendingFormsForUser(userId)
                .then(data => {
                    setUserPendingForms(data);
                })
                .catch(error => {
                    console.error('Error fetching pending forms for user:', error);
                });
        }
    }, [userId]); // Add userId as a dependency

    return (
        <div className="h-screen">
            <h1 className="mt-32 -mb-10 ml-48 text-2xl text-blue-gray-900 font-semibold">
                <MdOutlinePendingActions size={40} />
                PENDING FORMS
            </h1>
            <div className="flex justify-center">
                <Card className="mt-14 h-full w-4/5 overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-00 text-white bg-red-300 p-4">
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-semibold text-lg text-white leading-none"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                                <th className="border-b border-blue-gray-00 text-lg text-white bg-red-300 p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPendingForms && userPendingForms.map(({ id, name, budgetHead, created_at, formCategory, formId }, index) => (
                                <tr key={id} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {id}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {budgetHead}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {new Date(created_at).toLocaleDateString('en-GB')}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {formCategory}
                                        </Typography>
                                    </td>
                                    {role === 'HOD' && (
                                        <td className="p-4 flex items-center">
                                            <button className="bg-blue-300 text-base text-white px-2 py-1 rounded-md hover:bg-blue-400 mr-2"
                                                onClick={() => viewForm(formId)}>View</button>
                                            <button className="bg-green-300 text-base text-white px-2 py-1 rounded-md hover:bg-green-400 mr-2"
                                                onClick={() => approveForm(formId)}>Approve</button>
                                            <button className="bg-red-400 text-base text-white px-2 py-1 rounded-md hover:bg-red-600"
                                                onClick={() => rejectForm(formId)}>Reject</button>
                                        </td>
                                    )}
                                    {role !== 'HOD' && (
                                        <td className="p-4">
                                            <button className="bg-blue-300 text-base text-white px-2 py-1 rounded-md hover:bg-blue-400"
                                                onClick={() => viewForm(formId)}>View</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}

// const TABLE_HEAD = ["Serial No.", "User", "Date", "Category"];

// const TABLE_ROWS = [
//     {
//         id: "1",
//         name: "Rohit",
//         date: "23/02/24",
//         category: "SP101"
//     },
//     {
//         id: "2",
//         name: "Mukesh",
//         date: "21/01/24",
//         category: "SP101"
//     },
//     {
//         id: "3",
//         name: "Anil",
//         date: "19/02/24",
//         category: "SP102"
//     },
//     {
//         id: "4",
//         name: "Manish",
//         date: "24/02/24",
//         category: "SP101"
//     },
//     {
//         id: "5",
//         name: "Rishabh",
//         date: "04/01/24",
//         category: "SP102"
//     },
// ];

// export default function PendingForms() {
//     return (
//         <div className="h-screen">
//             <h1 className="mt-32 -mb-10 ml-48 text-2xl text-blue-gray-900 font-semibold">
//                 <MdOutlinePendingActions size={40}/>
//                 PENDING FORMS
//             </h1>
//             <div className="flex justify-center">
//                 <Card className="mt-14 h-full w-4/5 overflow-scroll">
//                     <table className="w-full min-w-max table-auto text-left">
//                         <thead>
//                             <tr>
//                                 {TABLE_HEAD.map((head) => (
//                                     <th key={head} className="border-b border-blue-gray-00 bg-red-300 p-4">
//                                         <Typography
//                                             variant="small"
//                                             color="white"
//                                             className="font-normal leading-none opacity-70"
//                                         >
//                                             {head}
//                                         </Typography>
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {TABLE_ROWS.map(({ id, name, date, category }, index) => (
//                                 <tr key={name} className="even:bg-blue-gray-50/50">
//                                     <td className="p-4">
//                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                             {id}
//                                         </Typography>
//                                     </td>
//                                     <td className="p-4">
//                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                             {name}
//                                         </Typography>
//                                     </td>
//                                     <td className="p-4">
//                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                             {date}
//                                         </Typography>
//                                     </td>
//                                     <td className="p-4">
//                                         <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
//                                             {category}
//                                         </Typography>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </Card>
//             </div>
//         </div>
//     );
// }