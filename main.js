import { loadGLTF, loadVideo } from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

// function createVideo(videoUrl){
//     const video = document.createElement("video");
//         if (video.canPlayType("video/mp4")) {
//             video.setAttribute('src', videoUrl);
//             video.setAttribute('preload', 'auto');
//             video.setAttribute('crossorigin', 'anonymous');
//             video.setAttribute('webkit-playsinline', 'webkit-playsinline');
//             video.setAttribute('playsinline', '');
//             video.setAttribute('loop', 'true');
//         }
//     return video; 
// }

function createVideoPlane(video, width, height) {
    const texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    return plane;
}

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.querySelector("#my-ar-container"),
            imageTargetSrc: '../../assets/targets/targets-four.mind',

        });
        const { renderer, scene, camera } = mindarThree;

        //target 1 

        //const video = createVideo("https://res.cloudinary.com/daqm1fsjr/video/upload/v1641141809/thaiVideo.mp4");
        const video = document.getElementById('video-1')
        const plane = createVideoPlane(video, 1, 9 / 16);
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);
        anchor.onTargetFound = () => {
            video.muted = false;
            video.play();
        }
        anchor.onTargetLost = () => {
            video.pause();
        }

        // target 3

        //const video3 = createVideo("https://res.cloudinary.com/daqm1fsjr/video/upload/v1642576736/pad%20thai.mov")
        const video3 = document.getElementById('video-3');
        const plane3 = createVideoPlane(video3, 1, 3 / 4);
        const anchor3 = mindarThree.addAnchor(2);
        anchor3.group.add(plane3);
        anchor3.onTargetFound = () => {
            video3.muted = false;
            video3.play();

        }
        anchor3.onTargetLost = () => {
            video3.pause();
        }

        //target 4
        //const video4 = createVideo("https://res.cloudinary.com/daqm1fsjr/video/upload/v1642576284/thaiVideo3.mp4")
        const video4 = document.getElementById('video-4');
        const plane4 = createVideoPlane(video4, 1, 3 / 4);
        const anchor4 = mindarThree.addAnchor(3);
        anchor4.group.add(plane4);

        anchor4.onTargetFound = () => {
            video4.muted = false;
            video4.play();

        }

        anchor4.onTargetLost = () => {
            video4.pause();
        }


        //custom video starting time 
        video4.addEventListener('play', () => {
            video4.currentTime = 10;
        });

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    function showhide() {
        var div = document.getElementById("welcome");
        div.classList.toggle('hidden');
    }

    //start button to overcome IOS browser
    const startButton = document.getElementById('startbutton');
    startButton.addEventListener('click', () => {
        start();
        showhide();
        startButton.style.display = "none"; //button will disappear upon click
    })

    //document.body.appendChild(startButton);
    //start();
});