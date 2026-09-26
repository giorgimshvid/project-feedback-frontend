import { useFormik } from "formik";
import type { Member, MemberRequest } from "../models/MemberProps";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { memberValidationSchema } from "../utils/validations";
import { memberService } from "../services/member.service";
import { useEffect } from "react";
import Input from "../shared/ui/Input";
import Button from "../shared/ui/Button";

interface MemberModalProps {
    onClose: (memberModal: boolean) => void;
    isOpened: boolean;
    onMemberSave: () => void;
    member: Member | null;
    projectId: number;
}


const MemberModal = ({onClose, isOpened, onMemberSave, member, projectId}: MemberModalProps) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            position: ''
        },
        validationSchema: toFormikValidationSchema(memberValidationSchema),
        onSubmit: async (value: MemberRequest, { setStatus, setSubmitting, resetForm }) => {
            try {
                if (member) {
                    await memberService.editMember(projectId, member.id, value)
                } else {
                    await memberService.createMember(projectId, value)
                }
                onMemberSave();
                onClose(true);
                resetForm();
            } catch(e) {
                const err = e instanceof Error ? e : new Error(String(e))
                setStatus(err.message || 'არასწორი სახელი, მეილი ან პოზიცია')
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (isOpened) {
            if (member) {
                formik.setValues({
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    position: member.position
                })
            } else {
                formik.resetForm();
            }
        }
    }, [isOpened, member]);

    if (!isOpened) {
        return null;
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center p-4 absolute z-10 inset-0">
                <div className="overlay absolute w-full h-full bg-black opacity-80"></div>
                <div
                    className="close-btn text-5xl text-white absolute top-6 right-6 font-bold z-10 cursor-pointer"
                    onClick={() => onClose(false)}
                >
                    ✖
                </div>
                <h2>
                    {
                        member ? 'პროექტის რედაქტირება' : 'პროექტის დამატება'
                    }
                </h2>
                <form onSubmit={formik.handleSubmit}  className="flex px-4 py-5 flex-col gap-4 relative z-10">
                    <div className="from-field">
                        <Input 
                            type="text"
                            placeholder="წევრის სახელი"
                            id='firstName'
                            name='firstName'
                            label='firstName'
                            value={formik.values.firstName}
                            handleChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('firstName')}
                            touched={formik.touched.firstName}
                            error={formik.errors.firstName}
                            required
                        />
                    </div>
                    <div className="from-field">
                        <Input 
                            type="text"
                            placeholder="წევრის გვარი"
                            id='lastName'
                            name='lastName'
                            label='lastName'
                            value={formik.values.lastName}
                            handleChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('lastName')}
                            touched={formik.touched.lastName}
                            error={formik.errors.lastName}
                            required
                        />
                    </div>
                    <div className="from-field">
                        <Input 
                            type="text"
                            placeholder="წევრის იმეილი"
                            id='email'
                            name='email'
                            label='email'
                            value={formik.values.email}
                            handleChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('email')}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                            required
                        />
                    </div>
                    <div className="from-field">
                        <Input 
                            type="text"
                            placeholder="წევრის თანამდებობა"
                            id='position'
                            name='position'
                            label='position'
                            value={formik.values.position}
                            handleChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('position')}
                            touched={formik.touched.position}
                            error={formik.errors.position}
                            required
                        />
                    </div>
                    <div className="from-field">
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            {
                                member ? 'რედაქტირება' : 'დამატება'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MemberModal