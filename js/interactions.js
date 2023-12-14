(function ($) {

    var dtConHero = $("#dt-consumer-hero"),
        dtBizHero = $("#dt-biz-hero"),
        mBizHero = $("#m-biz-hero"),
        dtConSecAnimation = $("#dt-consumer-security"),
        dtConBanks = $("#dt-consumer-banks"),
        dtConExpAnimation =  $("#dt-consumer-exp"),
        mConBanks = $("#m-consumer-banks"),
        mConSecAnimation = $("#m-consumer-security"),
        stickyButton = $("#block-stickybutton"),
        offerPazeAtCheckout = $("#block-wanttoofferpazeatcheckout"),
        consumerPage = false,
        businessPage = false;

    $.fn.isInViewport = function() {
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

    // play desktop animations
    if ($(window).width() > 600) {

        // #dt-biz-hero, #dt-biz-cards, #dt-biz-integration, #dt-biz-trust
        // Business desktop animations

        if (businessPage) {
            // add hide show for sticky button
            $(window).on('resize scroll', function() {
                if ($("#dt-biz-hero").isInViewport() || $("#block-wanttoofferpazeatcheckout").isInViewport()) {
                    stickyButton.hide();
                } else {
                    stickyButton.show();
                }
            });

            /*dtBizHero.on("complete", function() {
              $(".lottie-hero .paragraph-body, .lottie-hero .paragraph-cta").show("fast");
            });*/

            LottieInteractivity.create(
                {
                    player: '#dt-biz-cards',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.20, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            LottieInteractivity.create(
                {
                    player: '#dt-biz-integration',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.20, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            LottieInteractivity.create(
                {
                    player: '#dt-biz-trust',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.20, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );
        }

        // Consumer desktop animations

        if(consumerPage) {

            LottieInteractivity.create(
                {
                    player: '#dt-consumer-security',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.10, 0.9],
                            type: "seek",
                            frames: [0, 110]
                        }
                    ]
                }
            );
            const consumersecurity = document.getElementById('dt-consumer-security');
            consumersecurity.addEventListener('frame', (e) => {
                if(e.detail.frame > 25) {
                    $(".arrow").fadeOut();
                    $("#dt-consumer-security").css("visibility", "visible");
                }
                else {
                    $(".arrow").fadeIn();
                    $("#dt-consumer-security").css("visibility", "hidden");
                }
                if(e.detail.frame > 80) {
                    $(".consumer-security-copy, .dt-consumer-banks-title").fadeIn();
                }
                else {
                    $(".consumer-security-copy").fadeOut();
                    $(".consumer-security-copy, .dt-consumer-banks-title").fadeOut();
                }
                // Perform any actions you want when the animation is complete
              });
     
            LottieInteractivity.create(
                {
                    player: '#dt-consumer-banks',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.3, 0.6],
                            type: "seek",
                            frames: [0, 150],
                        }
                    ]
                }
            );

            const consumerexp = document.getElementsByClassName('dt-consumer-exp');
            const consumerexpdatasrc = consumerexp[0].getAttribute('data-src');
            
            const lottieAnimation = lottie.loadAnimation({
                container: consumerexp[0],
                path: consumerexpdatasrc, // Replace with your animation file
                renderer: 'svg',
                loop: false,
                autoplay: false,
              });
              
              const controller = new ScrollMagic.Controller();
              
              const scene = new ScrollMagic.Scene({
                triggerElement: '.scroll-section',
                duration: 550, // Adjust this value as needed
                triggerHook: 0,
              }).setPin('.scroll-section').addTo(controller);
              
              
              lottieAnimation.addEventListener('DOMLoaded', () => {
              
               scene.on('update', (e) => {
                  
                  const endFrame = e.startPos + lottieAnimation.getDuration(true);
                  if(e.scrollPos > e.startPos && e.scrollPos < endFrame ) {
                    lottieAnimation.goToAndStop(e.scrollPos - e.startPos, true);
                  }
                  else if(e.scrollPos < e.startPos) {
                    lottieAnimation.goToAndStop(0, true);
                  }
                  else {
                    lottieAnimation.goToAndStop(lottieAnimation.getDuration(true), true);
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

            dtConBanks.on("complete", function() {
                var lottie = dtConBanks.get(0).getLottie();
                lottie.goToAndStop(1, true);
            });
        }

    }

    // mobile lottie animations

    if ($(window).width() <= 600) {

        if(businessPage) {

            $(window).on('resize scroll', function() {
                if ($("#m-biz-hero").isInViewport() || $("#block-wanttoofferpazeatcheckout").isInViewport()) {
                    stickyButton.hide();
                } else {
                    stickyButton.show();
                }
            });

            /*mBizHero.on("complete", function() {
              $(".lottie-hero .paragraph-body, .lottie-hero .paragraph-cta").show("fast");
            });*/

            LottieInteractivity.create(
                {
                    player: '#m-biz-cards',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.2, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            LottieInteractivity.create(
                {
                    player: '#m-biz-integration',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.2, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            LottieInteractivity.create(
                {
                    player: '#m-biz-trust',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.2, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

        }

        if(consumerPage) {

            LottieInteractivity.create(
                {
                    player: '#m-consumer-security',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.2, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            mConBanks.on("complete", function() {
                var lottie = mConBanks.get(0).getLottie();
                lottie.goToAndStop(1, true);
            });

            mConSecAnimation.on("complete", function() {
                $(".second-lottie-animation .paragraph-body").show("fast");
            });

            LottieInteractivity.create(
                {
                    player: '#m-consumer-banks',
                    mode: 'scroll',
                    actions: [
                        {
                            visibility: [0.2, 1.0],
                            type: 'playOnce',
                        },
                    ]
                }
            );

            
              
            // LottieInteractivity.create(
            //     {
            //         player: '#m-consumer-exp',
            //         mode: 'scroll',
            //         actions: [
            //             {
            //                 visibility: [0.2, 1.0],
            //                 type: 'playOnce',
            //             },
            //         ]
            //     }
            // );

        }

    };

})(jQuery);


