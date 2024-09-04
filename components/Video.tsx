export function Video() {
    return (
        <video width="1500" height="1500" preload="none" muted={true} autoPlay={true} loop={true}>
            <source src="/assets/video/vid.mp4" type="video/mp4" />
        </video>
    )
}

