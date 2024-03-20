import { Card, Typography } from "@material-tailwind/react";
import { MdOutlinePendingActions } from "react-icons/md";
import { pendingForms, pendingFormsAdmin, approveFormRequest } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import SP_101_PDF_URL_Generator from '../Forms/SP_101_PDF_URL_Generator';

const TABLE_HEAD = ["Form ID", "User", "Budget Head", "Date", "Category"];

const fetchPendingFormsForUser = async (userId) => {
    // Make an API request to fetch pending forms data for the specified user ID
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: approveFormModalOpen, onOpen: openApproveFormModal, onClose: closeApproveFormModal } = useDisclosure();
    const { isOpen: rejectFormModalOpen, onOpen: openRejectFormModal, onClose: closeRejectFormModal } = useDisclosure();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [formID, setFormID] = useState("");
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem("userInfo")).id;
    const role = JSON.parse(localStorage.getItem("userInfo")).role;
    const department = JSON.parse(localStorage.getItem("userInfo")).department;

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

    // Function to handle approving a form
    const approveForm = (id) => {
        setFormID(id);
        openApproveFormModal();
    }

    // Function to handle sending a request to backend to approve a form
    const handleApproveForm = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const adminSignature = JSON.parse(localStorage.getItem("userInfo")).signatureFile;
            const data = {
                formID,
                adminSignature
            }
            console.log(data);
            const response = await approveFormRequest(data);

            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(response.response.data.err);
        } finally {
            setLoading(false);
            closeApproveFormModal();
        }
    }

    // Function to handle rejecting a form
    const rejectForm = (id) => {
        openRejectFormModal();
    }


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
                            {userPendingForms.length>0 ? userPendingForms.map(({ id, name, budgetHead, date, formCategory }, index) => (

                                <tr key={id} className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}>
                                    <SP_101_PDF_URL_Generator forms={userPendingForms} formId={formID} department={department} onPdfGenerated={handlePdfGenerated} />
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
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="text-base font-normal">
                                            {formCategory}
                                        </Typography>
                                    </td>
                                    {role === 'HOD' && (
                                        <td className="p-4 flex items-center">
                                            <Button
                                                colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                mr={2}
                                                type="button"
                                                onClick={() => handleViewForm(id)}>
                                                View
                                            </Button>
                                            <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                            <Button colorScheme="green" mr={2} size={"md"} fontFamily={"figtree"}
                                                onClick={() => approveForm(id)}
                                            >
                                                Approve
                                            </Button>
                                            <ApproveFormModal isOpen={approveFormModalOpen} onClose={closeApproveFormModal} handleApproveForm={handleApproveForm} loading={loading}/>
                                            <Button colorScheme="red" size={"md"} fontFamily={"figtree"}
                                                onClick={() => rejectForm(id)}
                                            >
                                                Reject
                                            </Button>
                                            <RejectFormModal isOpen={rejectFormModalOpen} onClose={closeRejectFormModal}/>
                                        </td>
                                    )}
                                    {role !== 'HOD' && (
                                        <td className="p-4">
                                            <Button
                                                colorScheme="blue" size={"md"} fontFamily={"figtree"}
                                                mr={2}
                                                type="button"
                                                onClick={() => handleViewForm(id)}>
                                                View
                                            </Button>
                                            <ViewPDFModal isOpen={isOpen} onClose={onClose} pdfUrl={pdfUrl} handleClosePdfViewer={handleClosePdfViewer} />
                                        </td>
                                    )}
                                </tr>
                            ))
                            :(<tbody>
                                <tr className="h-96">
                                    <td className="p-4 text-center flex items-center justify-center">
                                        <Typography color="blue-gray" className="text-center text-xl font-semibold font-figtree">
                                            No Pending Forms
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>)}
                        </tbody>
                    </table>
                </Card>
            </div>
            <ToastContainer />
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
                    <Button colorScheme="red" size={"lg"} onClick={handleClosePdfViewer}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

//Component for Approve Form Modal
const ApproveFormModal = ({ isOpen, onClose, handleApproveForm ,loading }) => {
    return (
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Approve Form</ModalHeader> */}
                <ModalCloseButton size={"lg"} />
                <ModalBody className="bg">
                    <FormControl>
                        <FormLabel marginRight={2}>
                            <h1 className="text-2xl font-figtree font-semibold">Enter Remarks</h1>
                        </FormLabel>
                        <Input type="text" borderWidth="1px" borderColor="gray.400"/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="green" size={"lg"} isLoading={loading} onClick={handleApproveForm}>Approve</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

//Component for Reject Form Modal
const RejectFormModal = ({ isOpen, onClose, rejectForm }) => {
    return (
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Reject Form</ModalHeader> */}
                <ModalCloseButton size={"lg"} />
                <ModalBody>
                    <FormControl>
                        <FormLabel marginRight={2}>
                            <h1 className="text-2xl font-figtree font-semibold">Enter Remarks</h1>
                        </FormLabel>
                        <Input type="text" borderWidth="1px" borderColor="gray.400"/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" size={"lg"} onClick={onClose}>Reject</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}