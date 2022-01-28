(() => {
    let banner = document.querySelector(".banner");
    let bannerChildren = banner.children;
    let loop;
    for (let i = 0; i < bannerChildren.length; i++) {
        bannerChildren[i].onmouseenter = function () {
            clearInterval(loop);
        }
        bannerChildren[i].onmouseleave = function () {
            loop = setInterval(() => {
                banner.style.transitionDuration = "1s";
                setTimeout(() => {
                    banner.style.left = "-21vw";
                    bannerChildren = banner.children;
                    bannerChildren[1].classList.remove("big");
                    bannerChildren[2].classList.add("big");
                }, 1);
                setTimeout(() => {
                    banner.style.transitionDuration = "0s";
                    banner.style.left = "0";
                    banner.appendChild(bannerChildren[0]);
                }, 1000);
            }, 3000);
        }
    }

    bannerChildren[0].onmouseleave();
})()