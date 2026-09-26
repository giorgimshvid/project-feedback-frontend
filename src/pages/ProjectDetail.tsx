import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import type { RootState } from "../store/store";
import MemberModal from "../components/MemberModal";
import type { Member } from "../models/MemberProps";
import { memberService } from "../services/member.service";
import DeleteModal from "../components/DeleteModal";

const ProjectDetail = () => {

    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    
    const [members, setMembers] = useState<Member[]>([]);
    const [member, setMember] = useState<Member | null>(null);
    const [memberModal, setMemberModal] = useState<boolean>(false);
    const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
    const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
    
    const [loadingMember, setLoadingMember] = useState<boolean>(false);
    const { isAuthenticated, isLoading} = useSelector((state: RootState) => state.auth);
    // TO DO:
    // loadingMember, fetchMembers

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate, isLoading])

    const fetchMembers = async () => {
        try {
            setLoadingMember(false);
            const data = await memberService.getMembers(Number(projectId));
            setMembers(data);
        } catch(error) {
            console.log(error)
        } finally {
            setLoadingMember(false);
        }
    }

    useEffect(() => {
        if (projectId) {
            fetchMembers();
        }
    }, [projectId]);

    const handleOpenAddModal = () => {
        setMember(null);
        setMemberModal(true);
    }

    const handleEditModal = (selectedMember: Member) => {
        console.log('edit');
        setMember(selectedMember);
        setMemberModal(true);
    }
    
    const handleDeleteModal = (selectedMember: Member) => {
        console.log('delete');
        setMemberToDelete(selectedMember);
        setDeleteModalOpened(true);
    }

    const confirmDelete = async () => {
        if (!memberToDelete) {
            return;
        }
        try {
            await memberService.deleteMember(Number(projectId), memberToDelete?.id);
            fetchMembers();
            setDeleteModalOpened(false);
        } catch(error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <main className="min-h-screen bg-slate-50 pt-6 px-6 pb-12">
                <div className="mx-auto">
                    <Link to='/dashboard' className="ml-5 text-3xl font-bold">
                        ⬅
                    </Link>
                    <div className="add-btn-wrap flex justify-center">
                        <button className="logout-btn text-white mb-6 px-4 py-2 bg-emerald-600" onClick={handleOpenAddModal}>Add Member</button>
                    </div>
                    <div className="member-list w-full flex justify-around flex-wrap gap-y-6">
                        {
                            loadingMember ? <p className="text-center my-5 text-slate-500">წევრები იტვირთება...</p> :
                            members.map( member => 
                                <div
                                    key={member.id}
                                    className="flex justify-between w-full max-w-7xl"
                                >
                                    <div className="flex flex-col">
                                        <p className="mt-3 text-base font-medium">First Name: {member.firstName}</p>
                                        <p className="mt-3 text-base font-medium">Last Name: {member.lastName}</p>
                                        <p className="mt-3 text-base font-medium">Email: {member.email}</p>
                                        <p className="mt-3 text-base font-medium">Position: {member.position}</p>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <button className="text-white px-3 py-1 bg-blue-600" onClick={() => handleEditModal(member) }>Edit</button>
                                        <button className="text-white px-3 py-1 bg-red-600" onClick={() => {handleDeleteModal(member)} }>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>

            <MemberModal 
                onClose={() => setMemberModal(false)}
                isOpened={memberModal}
                onMemberSave={fetchMembers}
                member={member}
                projectId={ Number(projectId) }
            />

            {
                deleteModalOpened &&
                <DeleteModal
                   name={memberToDelete?.firstName ?? ''}  
                   onClose={() => setDeleteModalOpened(false)}
                   onConfirm={confirmDelete}
                />
            }

        </>
    )
}

export default ProjectDetail