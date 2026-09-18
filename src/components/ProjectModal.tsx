import { useFormik } from "formik";
import type { Project, ProjectRequest } from "../models/ProjectProps";
import { toFormikValidate, toFormikValidationSchema } from "zod-formik-adapter";
import { projectValidationSchema } from "../utils/validations";
import { projectService } from "../services/project.service";

interface ProjectModalProps {
    onClose: () => void;
    isOpened: boolean;
    onProjectSave: () => void;
    project?: Project;
}


const ProjectModal = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: 'active'
        },
        validationSchema: toFormikValidationSchema(projectValidationSchema),
        onSubmit: async (value: ProjectRequest, { setStatus, setSubmitting }) => {
            try {
                await projectService.createProject(value);

            } catch (e) {
                const err = e instanceof Error ? e : new Error(String(e))
                setStatus(err.message || 'არასწორი სახელი, აღწერა ან სტატუსი')
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <>

        </>
    )
}

export default ProjectModal


// export interface Project {
//   id: number
//   name: string
//   description: string
//   status: string
//   ownerId: number
//   createdAt: string
// }