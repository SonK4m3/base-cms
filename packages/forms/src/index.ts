export type LeadFormPurpose =
  | "general_inquiry"
  | "appointment_request"
  | "doctor_consultation"
  | "service_quote";

export interface LeadFormField {
  name: string;
  label: string;
  required?: boolean;
}

export const defaultLeadFormFields: LeadFormField[] = [
  { name: "fullName", label: "Họ và tên", required: true },
  { name: "phone", label: "Số điện thoại", required: true },
  { name: "email", label: "Email" },
  { name: "message", label: "Nội dung cần tư vấn", required: true }
];

