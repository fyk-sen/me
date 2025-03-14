const fox = document.getElementById("fox");
const track = document.getElementById("track");

window.onmousemove = e => {

    // fox
    const x = e.clientX - fox.offsetWidth / 2;
    const y = e.clientY - fox.offsetHeight / 2;;

    const keyframes = {
        transform: `translate(${x}px, ${y}px)`
    }

    fox.animate(keyframes, {
        duration: 800,
        fill: "forwards"
    });

    // track
    if (track.dataset.mouseDownAt === "0") return;

    const delta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    max = window.innerWidth / 2;

    const percent = (delta / max) * -100;

    next = Math.max(Math.min(parseFloat(track.dataset.previousPercent) + percent, 0), -100)

    track.dataset.percent = next

    track.animate({
        transform: `translate(${next}%, -50%)`
    }, {
        duration: 1200,
        fill: "forwards"
    })

    for (const timg of track.getElementsByClassName("timg")) {
        timg.animate({
            objectPosition: `${next + 100}% center`
        }, {
            duration: 1200,
            fill: "forwards"
        })
    }

}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.previousPercent = track.dataset.percent;
}

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

