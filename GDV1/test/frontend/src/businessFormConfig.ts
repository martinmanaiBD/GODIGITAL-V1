// businessFormConfig.ts
import * as yup from "yup";
import { Business } from "@component/API/business";

export const averageRevenueOptions = [
    { label: "RM10,000-RM50,000", value: "RM10,000-RM50,000" },
    { label: "RM50,000-RM100,000", value: "RM50,000-RM100,000" },
    { label: "RM100,000-RM500,000", value: "RM100,000-RM500,000" },
];

export const franchiseStatusOptions = [
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" },
];

export const businessNatureOptions = [
    { label: "Retail", value: "Retail" },
    { label: "Food & Beverage", value: "Food & Beverage" },
    { label: "Services", value: "Services" },
    { label: "Others", value: "Others" },
];

export const initialValues = (businessDetails: Business | null) => {
    return {
        companyName: businessDetails?.companyName || "",
        businessAddress: businessDetails?.businessAddress || "",
        averageRevenue: businessDetails?.averageRevenue,
        businessNature: businessDetails?.businessNature || "",
        registrationNumber: businessDetails?.registrationNumber || "",
        franchiseStatus: businessDetails?.franchiseStatus === "true" ? "YES" : "NO",
        franchiseNumber: businessDetails?.franchiseNumber || "",
    };
};

export const businessSchema = yup.object().shape({
    companyName: yup.string().required("required"),
    businessAddress: yup.string().required("required"),
    averageRevenue: yup.string().required("required"),
    businessNature: yup.string().required("required"),
    registrationNumber: yup.string().required("required"),
    franchiseStatus: yup.string().required("required"),
    franchiseNumber: yup.string().when("franchiseStatus", {
        is: "YES",
        then: yup.string().required("required"),
        otherwise: yup.string().notRequired(),
    }),
});
