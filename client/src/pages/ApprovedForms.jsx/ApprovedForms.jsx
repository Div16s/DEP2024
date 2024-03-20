import { Card, Typography, CardFooter, Button as TailwindButton } from "@material-tailwind/react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { approvedForms, approvedFormsAdmin } from "../../services/Apis";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button as ChakraButton } from "@chakra-ui/react";
import  SP_101_PDF_URL_Generator from "../Forms/SP_101_PDF_URL_Generator";

const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category"];
const ROWS_PER_PAGE = 7;

// Function for fetching Approved forms for the specified user ID
const fetchApprovedFormsForUser = async (userId) => {
    try {
        const userData = {
            userId
        };
        const response = await approvedForms(userData);
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            toast.error(response.response.data.err);
            return response.response.data.err;
        }
    } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error("Error fetching approved forms for user:", error);
        return error;
    }
};

// Function for fetching Approved forms for the specified username
const fetchApprovedFormsForAdmin = async (username) => {
    try {
        const userData = {
            username
        }
        const response = await approvedFormsAdmin(userData);
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


export default function TableWithStripedRows() {
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    const userId = JSON.parse(localStorage.getItem("userInfo")).id;
    const username = JSON.parse(localStorage.getItem("userInfo")).name;
    const department = JSON.parse(localStorage.getItem("userInfo")).department;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [userApprovedForms, setUserApprovedForms] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [formID, setFormID] = useState("");

    const indexOfLastRow = currentPage * ROWS_PER_PAGE;
    const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
    const currentRows = userApprovedForms.length > 0 ? (userApprovedForms.slice(indexOfFirstRow, indexOfLastRow)) : 0;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = userApprovedForms && (Math.ceil(userApprovedForms.length / ROWS_PER_PAGE));

    // Callback function to handle PDF url generation
    const handlePdfGenerated = (url) => {
        setPdfUrl(url);
    }

    // Function to handle viewing a form
    const handleViewForm = (id) => {
        setFormID(id);
        onOpen();
    };

    // Function to close the PDF viewer modal
    const handleClosePdfViewer = () => {
        setFormID("");
        setPdfUrl(null);
        onClose();
    };

    useEffect(() => {
        if (role === "HOD") {
            // Fetching approved forms for the specified username when the component mounts
            fetchApprovedFormsForAdmin(username)
                .then(data => {
                    setUserApprovedForms(data);
                })
                .catch(error => {
                    console.error('Error fetching approved forms for user:', error);
                });
        }
        else if (role === "FACULTY") {
            // Fetching approved forms for the specified user ID when the component mounts
            fetchApprovedFormsForUser(userId)
                .then(data => {
                    setUserApprovedForms(data);
                })
                .catch(error => {
                    console.error('Error fetching approved forms for user:', error);
                });
        }
    }, [userId, username]);

    return (
        <div className="h-screen">
            <h1 className="mt-32 -mb-10 ml-48 text-2xl text-blue-gray-900 font-semibold">
                <AiOutlineFileDone size={40} />
                APPROVED FORMS
            </h1>
            <div className="flex justify-center">
                <Card className="mt-14 h-full w-4/5 overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-green-400 p-4">
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-semibold text-lg leading-none"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                                <th className="border-b border-blue-gray-00 text-lg text-white bg-green-400 p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (currentRows.map(({ id, name, budgetHead, date, formCategory }, index) => (
                                <tr key={id} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                                <SP_101_PDF_URL_Generator forms={userApprovedForms} formId={formID} department={department} onPdfGenerated={handlePdfGenerated} />
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
                                        <Typography variant="small" color="blue-gray" className="text-base font-medium">
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-medium">
                                            {formCategory}
                                        </Typography>
                                    </td>
                                    {role === 'HOD' && (
                                        <td className="p-4 flex items-center">
                                            <ChakraButton
                                                colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                mr={2}
                                                type="button"
                                                onClick={() => handleViewForm(id)}
                                            >
                                                View
                                            </ChakraButton>
                                            <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />

                                        </td>
                                    )}
                                    {role !== 'HOD' && (
                                        <td className="p-4">
                                            <ChakraButton
                                                colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                mr={2}
                                                type="button"
                                                onClick={() => handleViewForm(id)}>
                                                View
                                            </ChakraButton>
                                            <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                        </td>
                                    )}
                                </tr>
                            ))) : (<tbody>
                                <tr className="h-96">
                                    <td className="p-4 text-center flex items-center justify-center">
                                        <Typography variant="large" color="blue-gray" className="text-center text-lg font-semibold font-figtree">
                                            No Approved Forms
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>)}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <TailwindButton
                                onClick={() => paginate(currentPage - 1)}
                                variant="outlined"
                                size="sm"
                                disabled={currentPage === 1}
                                className="flex justify-center items-center flex-col"
                            >
                                <FaArrowLeft /> Previous

                            </TailwindButton>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <TailwindButton
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        variant="outlined"
                                        size="sm"
                                        disabled={currentPage === i + 1}
                                    >
                                        {i + 1}
                                    </TailwindButton>
                                ))}
                            </div>
                            <TailwindButton
                                onClick={() => paginate(currentPage + 1)}
                                variant="outlined"
                                size="sm"
                                disabled={currentPage === totalPages}
                                className="flex justify-center items-center flex-col"
                            >
                                <FaArrowRight /> Next
                            </TailwindButton>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}

//Component for ViewPDF Modal
const ViewPDFModal = ({ isOpen, onClose, pdfUrl, handleClosePdfViewer }) => {
    return (
        <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton size={"lg"} />
                <ModalBody>
                    <iframe src={pdfUrl} width="100%" height="500px"></iframe>
                </ModalBody>
                <ModalFooter>
                    <ChakraButton colorScheme="red" size={"lg"} onClick={handleClosePdfViewer}>Close</ChakraButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}