import { useFormik } from "formik";
import type { Project, ProjectRequest } from "../models/ProjectProps";
import { toFormikValidate, toFormikValidationSchema } from "zod-formik-adapter";
import { projectValidationSchema } from "../utils/validations";
import { projectService } from "../services/project.service";
import Input from "./Input";
import { useEffect } from "react";
import Button from "./Button";

interface ProjectModalProps {
    onClose: (projectModal: boolean) => void;
    isOpened: boolean;
    onProjectSave: () => void;
    project: Project | null;
}


const ProjectModal = ({ onClose, isOpened, onProjectSave, project }: ProjectModalProps) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: 'active'
        },
        validationSchema: toFormikValidationSchema(projectValidationSchema),
        onSubmit: async (value: ProjectRequest, { setStatus, setSubmitting, resetForm }) => {
            try {
                if (project) {
                    await projectService.editProject(project.id, value);
                } else {
                    await projectService.createProject(value);
                }
                onProjectSave();
                onClose(true);
                resetForm();
            } catch (e) {
                const err = e instanceof Error ? e : new Error(String(e))
                setStatus(err.message || 'არასწორი სახელი, აღწერა ან სტატუსი')
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (isOpened) {
            if (project) {
                formik.setValues({
                    name: project.name,
                    description: project.description,
                    status: project.status
                })
            } else {
                formik.resetForm();
            }
        }
    }, [isOpened, project]);

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
                        project ? 'პროექტის რედაქტირება' : 'პროექტის დამატება'
                    }
                </h2>
                <form onSubmit={formik.handleSubmit} className="flex px-4 py-5 flex-col gap-4 relative z-10">
                    <div className="from-field">
                        <Input
                            type="text"
                            placeholder="პროექტის სახელი"
                            id='name'
                            name='name'
                            label='name'
                            value={formik.values.name}
                            handleChange={formik.handleChange}
                            onBlur={() => formik.setFieldTouched('name')}
                            touched={formik.touched.name}
                            error={formik.errors.name}
                            required
                        />
                    </div>
                    <div className="from-field">
                        <textarea
                            placeholder="პროექტის სახელი"
                            id='description'
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={() => formik.handleBlur('description')}
                        ></textarea>
                    </div>
                    <div className="from-field">
                        <select
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur('status')}
                        >
                            <option value="active">active</option>
                            <option value="archived">archived</option>
                            <option value="completed">completed</option>
                        </select>
                    </div>
                    <div className="from-field">
                        <Button
                            type={"submit"}
                            variant={"primary"}
                        >
                            {
                                project ? 'რედაქტირება' : 'დამატება'
                            }
                        </Button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default ProjectModal