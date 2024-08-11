const EmbeddBunnyVideo = ({ hlsSource = "" }) => {
    const videoInfoArray = hlsSource.split("/");
    const videoId = videoInfoArray[videoInfoArray.length - 2];
    return (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
                src={`https://iframe.mediadelivery.net/embed/93718/${videoId}`}
                loading="lazy"
                style={{ border: "none", position: "absolute", top: 0, height: "100%", width: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
            />
        </div>
    );
};

export default EmbeddBunnyVideo;
