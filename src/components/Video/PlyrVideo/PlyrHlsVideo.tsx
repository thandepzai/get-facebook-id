import Hls from "hls.js";
import PlyrJS, { Options, PlyrEvent as PlyrJSEvent, SourceInfo } from "plyr";
import "plyr/dist/plyr.css";
import { HTMLProps, MutableRefObject, forwardRef, useEffect, useMemo, useRef } from "react";
import { PlyrVideoConfig } from "./config";
import styles from "./style.module.css";

// export type PlyrCallback = (this: PlyrJS, event: PlyrJSEvent) => void;

export type PlyrProps = HTMLProps<HTMLVideoElement> & {
    source?: SourceInfo | null;
    options?: Options;
};
export interface HTMLPlyrVideoElement {
    plyr?: PlyrJS;
}

export const CustomPlyrInstance = forwardRef<HTMLPlyrVideoElement, PlyrProps & { hlsSource: string }>((props, ref) => {
    const { options = null, source, hlsSource, ...rest } = props;
    const innerRef = useRef<HTMLPlyrVideoElement>();
    const hls = useRef() as MutableRefObject<Hls>;

    const videoOptions: PlyrJS.Options = {
        ...options
    };

    const createPlayer = () => {
        const plyrPlayer = new PlyrJS("#mapstudy-plyr-hls", videoOptions);

        if (innerRef.current?.plyr) {
            innerRef.current.plyr = plyrPlayer;
        }
    };

    useEffect(() => {
        if (!innerRef.current) return;

        if (Hls.isSupported()) {
            hls.current = new Hls();

            hls.current.loadSource(hlsSource);

            hls.current.on(Hls.Events.MANIFEST_LOADED, () => {
                videoOptions.quality = {
                    default: hls.current.levels[hls.current.levels.length - 1].height,
                    options: hls.current.levels.map((level) => level.height),
                    forced: true,
                    // Manage quality changes
                    onChange: (quality: number) => {
                        hls.current.levels.forEach((level, levelIndex) => {
                            if (level.height === quality) {
                                hls.current.currentLevel = levelIndex;
                            }
                        });
                    }
                };

                createPlayer();
            });

            hls.current.attachMedia(innerRef.current as HTMLMediaElement);
        } else {
            createPlayer();
        }

        if (typeof ref === "function") {
            if (innerRef.current) ref(innerRef.current);
        } else {
            if (ref && innerRef.current) ref.current = innerRef.current;
        }

        if (innerRef.current?.plyr && source) {
            innerRef.current.plyr.source = source;
        }

        innerRef.current.plyr?.on("play", () => hls.current.startLoad());

        innerRef.current.plyr?.on("qualitychange", () => {
            if (innerRef.current?.plyr?.currentTime !== 0) {
                hls.current.startLoad();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return (
        <video
            ref={innerRef as unknown as MutableRefObject<HTMLVideoElement>}
            id="mapstudy-plyr-hls"
            className="plyr"
            {...rest}
        />
    );
});

const PlyrHlsVideo = (
    props: Partial<PlyrProps> & { hlsSource: string; videoRef?: MutableRefObject<HTMLPlyrVideoElement> }
) => {
    const ref = useRef<HTMLPlyrVideoElement>(null);
    const options = useMemo(
        () => ({
            tooltips: {
                controls: true,
                seek: true
            },
            controls: PlyrVideoConfig.controls,
            i18n: PlyrVideoConfig.i18n,
            speed: PlyrVideoConfig.speed,
            ...props.options
        }),
        [props.options]
    );

    return (
        <div className={styles["plyr-wrapper"]}>
            <CustomPlyrInstance
                ref={props.videoRef ?? ref}
                source={props.source || null}
                options={options}
                hlsSource={props.hlsSource}
            />
        </div>
    );
};

export default PlyrHlsVideo;
