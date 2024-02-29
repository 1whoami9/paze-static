(function ($) {
	var dtConHero = $("#dt-consumer-hero"),
		dtBizHero = $("#dt-biz-hero"),
		mBizHero = $("#m-biz-hero"),
		dtConSecAnimation = $("#dt-consumer-security"),
		dtConBanks = $("#dt-consumer-banks"),
		dtConExpAnimation = $("#dt-consumer-exp"),
		mConBanks = $("#m-consumer-banks"),
		mConSecAnimation = $("#m-consumer-security"),
		stickyButton = $("#block-stickybutton"),
		offerPazeAtCheckout = $("#block-wanttoofferpazeatcheckout"),
		consumerPage = false,
		businessPage = false;

	$.fn.isInViewport = function () {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	//var lottieAnimations = $(".lottie-animation-wrapper").not(":eq(0)");

	stickyButton.hide();
	// $(".second-lottie-animation .paragraph-body").hide();
	// $(".lottie-hero .paragraph-body, .lottie-hero .paragraph-cta").hide();

	/*const observer = new IntersectionObserver(entries => {
        console.log(entries)
    })*/

	if (dtConHero.length == 1) {
		consumerPage = true;
	}

	if (dtBizHero.length == 1) {
		businessPage = true;
	}

	$(".methods-carousel").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2500,
		dots: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		adaptiveHeight: true,
		arrows: false,
	});

	$(".methods-carousel").on("init", function (event, slick) {
		targetLottie = $(slick.$slides[0])
			.find("lottie-player:visible")
			.get(0)
			.getLottie();
		targetLottie.goToAndPlay(0, true);
	});

	// play desktop animations
	if ($(window).width() > 600) {
		// Consumer desktop animations

		if (consumerPage) {
			LottieInteractivity.create({
				player: "#dt-consumer-security",
				mode: "scroll",
				actions: [
					{
						visibility: [0.1, 0.9],
						type: "playOnce",
						frames: [0, 110],
					},
				],
			});
			const consumersecurity = document.getElementById("dt-consumer-security");
			consumersecurity.addEventListener("frame", (e) => {
				if (e.detail.frame > 25) {
					// $(".arrow").fadeOut();
					$("#dt-consumer-security").css("visibility", "visible");
				} else {
					// $(".arrow").fadeIn();
					$("#dt-consumer-security").css("visibility", "hidden");
				}
				if (e.detail.frame > 80) {
					$(".consumer-security-copy, .dt-consumer-banks-title").fadeIn();
				} else {
					$(".consumer-security-copy").fadeOut();
					$(".consumer-security-copy, .dt-consumer-banks-title").fadeOut();
				}
				// Perform any actions you want when the animation is complete
			});

			LottieInteractivity.create({
				player: "#dt-consumer-banks",
				mode: "scroll",
				actions: [
					{
						visibility: [0.3, 0.6],
						type: "playOnce",
						frames: [0, 209],
					},
				],
			});

			/**************************************************************/
			// scroll lock for consumer experience - desktop

			const consumerexp = document.getElementsByClassName("dt-consumer-exp");
			const consumerexpdatasrc = consumerexp[0].getAttribute("data-src");

			const lottieAnimation = lottie.loadAnimation({
				container: consumerexp[0],
				path: consumerexpdatasrc, // Replace with your animation file
				renderer: "svg",
				loop: false,
				autoplay: false,
			});

			const controller = new ScrollMagic.Controller();

			const scene = new ScrollMagic.Scene({
				triggerElement: ".scroll-section",
				duration: 1100, // Adjust this value as needed
				triggerHook: 0,
			})
				.setPin(".scroll-section")
				.addTo(controller);

			const scrollSection = document.querySelector(".scroll-section");

			/**************************************************************/

			// calculates animation progress from range of 0 to 1
			const calcFrame = (start, current, duration) => {
				if (current - start < 0) {
					return 0;
				} else if (current - start > duration) {
					return 1;
				} else {
					return (current - start) / duration;
				}
			};

			//   window.addEventListener('scroll', () => {
			//     document.documentElement.style.setProperty('--scroll', calcFrame(e.startPos, e.scrollPos, 600));
			//     }, false);

			lottieAnimation.addEventListener("DOMLoaded", () => {
				scene.on("update", (e) => {
					// console.log('progress:', calcFrame(e.startPos, e.scrollPos, 600));

					const endFrame = e.startPos + lottieAnimation.getDuration(true);

					// handle background color transition
					if (e.scrollPos > e.startPos + 142 && e.scrollPos < endFrame) {
						scrollSection.classList.add("background-transition");
					}
					if (e.scrollPos < e.startPos + 142) {
						scrollSection.classList.remove("background-transition");
					}

					if (e.scrollPos > e.startPos && e.scrollPos < endFrame) {
						lottieAnimation.goToAndStop(e.scrollPos - e.startPos, true);
					} else if (e.scrollPos < e.startPos) {
						lottieAnimation.goToAndStop(0, true);
						scrollSection.classList.remove("background-transition");
					} else {
						lottieAnimation.goToAndStop(
							lottieAnimation.getDuration(true),
							true
						);
					}
				});
			});

			// LottieInteractivity.create(
			//     {
			//         player: '#dt-consumer-exp',
			//         mode: 'scroll',
			//         actions: [
			//             {
			//                 visibility: [0.20, 1.0],
			//                 type: 'playOnce',
			//             },
			//         ]
			//     }
			// );

			// dtConExpAnimation.on("frame", function(event) {
			//     var lottie = dtConExpAnimation.get(0).getLottie();
			//     var backgroundLoaded = false;
			//     if(lottie.currentFrame > 90 && !backgroundLoaded) {
			//         $(".consumer-experience-animation").parent().css(
			//             "background-color", "#f4f7ff"
			//         );
			//         backgroundLoaded = true;
			//     }
			// });

			dtConBanks.on("complete", function () {
				var lottie = dtConBanks.get(0).getLottie();
				lottie.goToAndStop(1, true);
			});

			$(".methods-carousel").on(
				"beforeChange",
				function (event, slick, currentSlide, nextSlide) {
					targetLottie = $(slick.$slides[nextSlide])
						.find("lottie-player:visible")
						.get(0)
						.getLottie();
					targetLottie.goToAndPlay(0, true);

					// formertargetLottie = $(slick.$slides[currentSlide])
					// 	.find("lottie-player:visible")
					// 	.get(0)
					// 	.getLottie();
					// formertargetLottie.stop();
				}
			);
		}
	}

	// mobile lottie animations

	if ($(window).width() <= 600) {
		if (consumerPage) {
			LottieInteractivity.create({
				player: "#m-consumer-security",
				mode: "scroll",
				actions: [
					{
						visibility: [0.2, 1.0],
						type: "playOnce",
					},
				],
			});

			mConBanks.on("complete", function () {
				var lottie = mConBanks.get(0).getLottie();
				lottie.goToAndStop(1, true);
			});

			mConSecAnimation.on("complete", function () {
				$(".second-lottie-animation .paragraph-body").show("fast");
			});

			LottieInteractivity.create({
				player: "#m-consumer-banks",
				mode: "scroll",
				actions: [
					{
						visibility: [0.2, 1.0],
						type: "playOnce",
					},
				],
			});

			/**************************************************************/
			// scroll lock for consumer experience - mobile

			const mconsumerexp = document.getElementsByClassName("m-consumer-exp");

			// if (mconsumerexp.length) {
			const mconsumerexpdatasrc = mconsumerexp[0].getAttribute("data-src");

			const mlottieAnimation = lottie.loadAnimation({
				container: mconsumerexp[0],
				path: mconsumerexpdatasrc, // Replace with your animation file
				renderer: "svg",
				loop: false,
				autoplay: false,
			});

			const mcontroller = new ScrollMagic.Controller();

			const mscene = new ScrollMagic.Scene({
				triggerElement: ".scroll-section-mobile",
				duration: 1100, // Adjust this value as needed
				triggerHook: 0,
			})
				.setPin(".scroll-section-mobile")
				.addTo(mcontroller);

			const mscrollSection = document.querySelector(".scroll-section-mobile");
			// }

			/**************************************************************/

			mlottieAnimation.addEventListener("DOMLoaded", (e) => {
				mscene.on("update", (e) => {
					// console.log('progress:', calcFrame(e.startPos, e.scrollPos, 600));

					const m_endFrame = e.startPos + mlottieAnimation.getDuration(true);

					if (e.scrollPos > e.startPos && e.scrollPos < m_endFrame) {
						mlottieAnimation.goToAndStop(e.scrollPos - e.startPos, true);
						mscrollSection.classList.add("background-transition");
					} else if (e.scrollPos < e.startPos) {
						mlottieAnimation.goToAndStop(0, true);
						mscrollSection.classList.remove("background-transition");
					} else {
						mlottieAnimation.goToAndStop(
							mlottieAnimation.getDuration(true),
							true
						);
					}
				});
			});
		}
	}
})(jQuery);
