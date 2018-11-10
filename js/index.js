$(document).ready(function () {
    $('.card').hover(
        function () {
            $(this).addClass('bg-dark text-white')
        },
        function () {
            $(this).removeClass('bg-dark text-white')
        }

    )

    $("#donate_card").click(function () {
        $('#exampleModal').modal('show');
    });
    
     $("#cont").click(function(){
        window.location.href="contact.html";
    });
});


