document.addEventListener("DOMContentLoaded", function(){

    let score = document.querySelector(".score-number");

    if(score){

        let number = 0;

        let scoreAnimation = setInterval(function(){

            number++;

            score.textContent = number + "%";

            if(number >= 82){

                clearInterval(scoreAnimation);

            }

        }, 20);

    }


    let sections = document.querySelectorAll(
        ".how-it-work, .product-showcase, .features, .final-section"
    );


    sections.forEach(function(section){

        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    });


    function showSections(){

        sections.forEach(function(section){

            let position =
                section.getBoundingClientRect().top;

            if(position < window.innerHeight - 100){

                section.style.opacity = "1";
                section.style.transform = "translateY(0)";

            }

        });

    }


    window.addEventListener("scroll", function(){

        showSections();

    });


    showSections();

});