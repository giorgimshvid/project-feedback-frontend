import Button from "../shared/ui/Button";

interface DeleteModalProps {
    projectName: string;
    onClose: (projectDeleteModal: boolean) => void;
    onConfirm: () => void;
}

const DeleteModal = ({ projectName, onClose, onConfirm }: DeleteModalProps) => {
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
                    { projectName }
                </h2>
                <div className="modal-content relative z-10">
                    <h3 className="text-white text-2xl mb-6">Are you sure you want to delete the project card?</h3>
                    <div className="flex gap-x-4">
                        <Button 
                            type="button"
                            variant={"primary"}
                            handleClick={onConfirm}
                            >
                            Delete
                        </Button>
                        <Button 
                            type="button"
                            variant={"secondary"}
                            handleClick={() => onClose(false)}
                            >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal