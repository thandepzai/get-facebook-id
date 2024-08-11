import Modal from "lib/component/Modal/Modal";
import { ElementRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import AppVideo from ".";
import { AppVideoProps, AppVideoType } from "./type";

interface VideoModalHandler {
    open: (name: string, videoProps: AppVideoProps) => void;
}

const VideoModal = forwardRef<VideoModalHandler>((_, ref) => {
    const modalRef = useRef<ElementRef<typeof Modal>>(null);

    const [videoName, setVideoName] = useState("");
    const [appVideoProps, setAppVideoProps] = useState<AppVideoProps | undefined>();

    useImperativeHandle(ref, () => ({
        open: (name, videoProps) => {
            modalRef.current?.open();
            setVideoName(name);
            setAppVideoProps(videoProps);
        }
    }));

    return (
        <Modal
            ref={modalRef}
            lazyLoad
            unmountOnHide
            className="w-[90vw] tab:w-[70vw] lap:w-[50vw]"
            onBackdropPress={() => {
                modalRef.current?.close();
            }}
            openDuration={0.4}
            closeDuration={0.2}
            initialScale={0.7}
        >
            <div className="w-full p-4 bg-white rounded-lg">
                <div className="mb-2 text-lg font-medium">{videoName}</div>
                {appVideoProps ? (
                    <AppVideo
                        key={
                            appVideoProps.type === AppVideoType.HLS ? appVideoProps.hlsSource : appVideoProps.youtubeId
                        }
                        {...appVideoProps}
                    />
                ) : null}
            </div>
        </Modal>
    );
});

export default VideoModal;
