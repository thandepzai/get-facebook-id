import { useIsomorphicLayoutEffect } from "@hooks/useIsomorphicLayoutEffect";
import Hls from "hls.js";
import { Options } from "plyr";
import { APITypes, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import { forwardRef, useEffect, useRef, useState } from "react";
import { PlyrVideoConfig } from "./config";
import styles from "./style.module.css";

const CustomPlyrInstance = forwardRef<APITypes, PlyrProps & { hlsSource: string }>((props, ref) => {
    const { source, options = null, hlsSource } = props;
    const hls = useRef<Hls>(new Hls());
    const hasQuality = useRef<boolean>(false);
    const [plyrOptions, setPlyrOptions] = useState<Options | null>(options);

    const raptorRef = usePlyr(ref, {
        options: plyrOptions,
        source
    }) as React.MutableRefObject<HTMLVideoElement>;

    useEffect(() => {
        hasQuality.current = false;
    }, [options]);

    useEffect(() => {
        hls.current.loadSource(hlsSource);

        hls.current.attachMedia(document.querySelector(".plyr-react")!);

        hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
            if (hasQuality.current) return; // early quit if already set

            const levels = hls.current.levels;
            const quality: Options["quality"] = {
                default: levels[levels.length - 1].height,
                options: levels.map((level) => level.height),
                forced: true,
                onChange: (newQuality: number) => {
                    levels.forEach((level, levelIndex) => {
                        if (level.height === newQuality) {
                            hls.current.currentLevel = levelIndex;
                        }
                    });
                }
            };
            setPlyrOptions({ ...plyrOptions, quality });
            hasQuality.current = true;
        });
    });

    return <video ref={raptorRef} className="plyr-react plyr" />;
});

const PlyrHlsVideoV2 = (props: Partial<PlyrProps> & { hlsSource: string }) => {
    const ref = useRef<APITypes>(null);
    const [supported, setIsSupported] = useState(false);

    useIsomorphicLayoutEffect(() => {
        setIsSupported(Hls.isSupported());
    }, [supported]);

    if (!supported) return <p>HLS is not supported in your browser</p>;

    return (
        <div className={styles["plyr-wrapper"]}>
            <CustomPlyrInstance
                ref={ref}
                source={props.source || null}
                options={{
                    tooltips: {
                        controls: true,
                        seek: true
                    },
                    controls: PlyrVideoConfig.controls,
                    i18n: PlyrVideoConfig.i18n,
                    ...props.options
                }}
                hlsSource={props.hlsSource}
            />
        </div>
    );
};

export default PlyrHlsVideoV2;
