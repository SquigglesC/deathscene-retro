import {
    Modal,
    ModalContent,
    useDisclosure,
} from "@heroui/react";
import type { ReactNode } from "react";

export default function ImageModal({ children }: { children: ReactNode }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

            <div onClick={onOpen} className="relative w-full h-full transition-transform duration-1000 ease-[0.42, 0, 0.58, 1] group-hover:scale-105">
                {children}
            </div>
            <Modal classNames={
                {
                    base: "rounded-none",
                    closeButton: "bg-dark text-light rounded-sm hover:bg-primary transition-colors duration-300",

                }
            } placement="center" backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {children}
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}