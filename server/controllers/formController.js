import prisma from '../db/dbConfig.js'

const submitFormSP101 = async (req, res) => {
    const { userName, userId, formCategory, budgetHead, sanctionedBudget, approxCost, items, category, budgetaryApprovalEnclosed,
        readyForInstallation, goodForResearchPurpose, GEM, modeOfEnquiry, nameOfSupplier, numberOfQuotation,
        quotationNumber, date, modeOfPayment, deliveryPeriod }
        = req.body;

    const signatureFile = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            signature: true
        }
    });

    const signature = signatureFile.signature.toString();

    try {
        const submittedForm = await prisma.form.create({
            data: {
                name: userName,
                userId,
                signature,
                formCategory,
                budgetHead,
                sanctionedBudget,
                approxCost,
                items: {
                    create: items.map(item => ({
                        itemDescription: item.itemDescription,
                        quantity: item.quantity,
                        price: item.price
                    }))
                },
                category,
                budgetaryApprovalEnclosed,
                readyForInstallation,
                goodForResearchPurpose,
                GEM,
                modeOfEnquiry,
                nameOfSupplier,
                numberOfQuotation,
                quotationNumber,
                date,
                modeOfPayment,
                deliveryPeriod
            },
            include: { items: true } // Include items in the response
        });

        res.status(200).json({
            message: "Form submitted successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in submitForm: ", error.message);
    }
};

const pendingForms = async (req, res) => {
    const { userId } = req.body;
    const id = parseInt(userId);

    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: id,
                status: false
            },
            include: {
                items: true // Include the items related to each form
            }
        });

        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingForms: ", error.message);
    }
}

const pendingFormsAdmin = async (req, res) => {
    const { username } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                budgetHead: username,
                status: false
            },
            include: {
                items: true // Include the items related to each form
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in pendingForms: ", error.message);
    }
}

const approvedForms = async (req, res) => {
    const { userId } = req.body;
    const id = parseInt(userId);
    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: id,
                status: true
            },
            include: {
                items: true // Include the items related to each form
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedForms: ", error.message);
    }
}

const approvedFormsAdmin = async (req, res) => {
    const { username } = req.body;
    try {
        const forms = await prisma.form.findMany({
            where: {
                budgetHead: username,
                status: true
            },
            include: {
                items: true // Include the items related to each form
            }
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approvedForms: ", error.message);
    }
}

const approveForm = async (req, res) => {
    const { formID, adminSignature } = req.body;

    try {
        const approvedForm = await prisma.form.update({
            where: {
                id: formID
            },
            data: {
                adminSignature: adminSignature,
                status: true,
            }
        });

        res.status(200).json({
            message: "Form approved successfully"
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
        console.log("Error in approveForm: ", error.message);
    }
}

export { submitFormSP101, pendingForms, pendingFormsAdmin, approvedForms, approvedFormsAdmin, approveForm}