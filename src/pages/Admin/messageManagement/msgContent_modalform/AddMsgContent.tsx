// import React, { useEffect, useState } from "react";
// import { Col, Input, Label } from "reactstrap";
// import MDEditor from "@uiw/react-md-editor";
// import LexicalEditor from "./LexicalEditor";


// interface AddMsgContentFormProps {
//   onChange: (isValid: boolean, formData: any) => void;
// }

// const AddMsgContentForm: React.FC<AddMsgContentFormProps> = ({ onChange }) => {
//   const [formData, setFormData] = useState({
//     msgType: "",
//     smsTemplateId: "",
//     smsContent: "",
//     whatsappContent: "",
//     emailSubject: "",
//     emailContent: "",
//     notificationTitle: "",
//     notificationContent: "",
//     keywords: "",
//   });
// const [text, setText] = useState<string>("");

//   const isValid = Object.values(formData).every((val) => val.trim() !== "");

//   useEffect(() => {
//     onChange(isValid, formData);
//   }, [formData, isValid]);

//   const handleChange = (key: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <div className="row g-3">
//       <Col md={6}>
//         <Label>Message Type</Label>
//         <Input
//           type="text"
//           placeholder="Message Type"
//           value={formData.msgType}
//           onChange={(e) => handleChange("msgType", e.target.value)}
//         />
//       </Col>

//       <Col md={6}>
//         <Label>SMS Template ID</Label>
//         <Input
//           type="text"
//           placeholder="SMS Template ID"
//           value={formData.smsTemplateId}
//           onChange={(e) => handleChange("smsTemplateId", e.target.value)}
//         />
//       </Col>

//       <Col md={6}>
//         <Label>SMS Content</Label>
//         <Input
//           type="textarea"
//           rows={4}
//           placeholder="SMS Content"
//           value={formData.smsContent}
//           onChange={(e) => handleChange("smsContent", e.target.value)}
//         />
//       </Col>

//       <Col md={6}>
//         <Label>Whatsapp Content</Label>
//         <Input
//           type="textarea"
//           rows={4}
//           placeholder="Whatsapp Content"
//           value={formData.whatsappContent}
//           onChange={(e) => handleChange("whatsappContent", e.target.value)}
//         />
//       </Col>

//       <Col md={6}>
//         <Label>Email Subject</Label>
//         <Input
//           type="text"
//           placeholder="Email Subject"
//           value={formData.emailSubject}
//           onChange={(e) => handleChange("emailSubject", e.target.value)}
//         />
//       </Col>

//       <Col md={6}>
//         <Label>Notification Title</Label>
//         <Input
//           type="text"
//           placeholder="Notification Title"
//           value={formData.notificationTitle}
//           onChange={(e) => handleChange("notificationTitle", e.target.value)}
//         />
//       </Col>

//       <Col md={12}>
//         <Label>Email Content</Label>
//         <div data-color-mode="light">
//           <MDEditor
//             value={formData.emailContent}
//             onChange={(val = "") => handleChange("emailContent", val)}
//             preview="edit"
//             />

//           {/* <LexicalEditor
//           value={formData.emailContent}
//           onChange={(val) => handleChange("emailContent", val)}/> */}
//         </div>
//       </Col>

//       <Col md={12}>
//         <Label>Notification Content</Label>
//         <Input
//           type="textarea"
//           rows={3}
//           placeholder="Notification Content"
//           value={formData.notificationContent}
//           onChange={(e) => handleChange("notificationContent", e.target.value)}
//         />
//       </Col>

//       <Col md={12}>
//         <Label>Keywords</Label>
//         <Input
//           type="textarea"
//           rows={3}
//           placeholder="Keywords"
//           value={formData.keywords}
//           onChange={(e) => handleChange("keywords", e.target.value)}
//         />
//         <div className="text-muted mt-1">
//           <strong className="text-pink">Exp:</strong> [COMPANY_NAME],
//           [USER_NAME], [PASSWORD], [MPIN]
//         </div>
//       </Col>
//     </div>
//   );
// };

// export default AddMsgContentForm;


import React, { useEffect, useState } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import MDEditor from "@uiw/react-md-editor";

interface AddMsgContentFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AddMsgContentForm: React.FC<AddMsgContentFormProps> = ({ onChange }) => {
  const [formData, setFormData] = useState({
    msgType: "",
    smsTemplateId: "",
    smsContent: "",
    whatsappContent: "",
    emailSubject: "",
    emailContent: "",
    notificationTitle: "",
    notificationContent: "",
    keywords: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    for (const [key, val] of Object.entries(formData)) {
      if (touched[key] && val.trim() === "") {
        newErrors[key] = "This field is required";
      }
    }
    setErrors(newErrors);

    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    onChange(isValid && Object.keys(newErrors).length === 0, formData);
  }, [formData, touched]);

  return (
    <div className="row g-3">
      {[
        { label: "Message Type", key: "msgType", md: 6 },
        { label: "SMS Template ID", key: "smsTemplateId", md: 6 },
        {
          label: "SMS Content",
          key: "smsContent",
          md: 6,
          type: "textarea",
          rows: 4,
        },
        {
          label: "Whatsapp Content",
          key: "whatsappContent",
          md: 6,
          type: "textarea",
          rows: 4,
        },
        { label: "Email Subject", key: "emailSubject", md: 6 },
        { label: "Notification Title", key: "notificationTitle", md: 6 },
        {
          label: "Notification Content",
          key: "notificationContent",
          md: 12,
          type: "textarea",
          rows: 3,
        },
        {
          label: "Keywords",
          key: "keywords",
          md: 12,
          type: "textarea",
          rows: 3,
        },
      ].map(({ label, key, md, type = "text", rows }) => (
        <Col md={md} key={key}>
          <Label>{label}</Label>
          <Input
            type={type}
            rows={rows}
            placeholder={label}
            value={formData[key as keyof typeof formData]}
            onChange={(e) => handleChange(key, e.target.value)}
            onBlur={() => handleBlur(key)}
            invalid={!!errors[key]}
          />
          {errors[key] && <FormFeedback>{errors[key]}</FormFeedback>}
          {key === "keywords" && (
            <div className="text-muted mt-1">
              <strong className="text-pink">Exp:</strong> [COMPANY_NAME],
              [USER_NAME], [PASSWORD], [MPIN]
            </div>
          )}
        </Col>
      ))}

      <Col md={12}>
        <Label>Email Content</Label>
        <div data-color-mode="light">
          <MDEditor
            value={formData.emailContent}
            onChange={(val = "") => handleChange("emailContent", val)}
            onBlur={() => handleBlur("emailContent")}
            preview="edit"
          />
          {errors.emailContent && (
            <div className="text-danger mt-1">{errors.emailContent}</div>
          )}
        </div>
      </Col>
    </div>
  );
};

export default AddMsgContentForm;
