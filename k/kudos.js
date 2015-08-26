function kudos() {
    var fbid = $('.fbid').html();
    $.ajax({
        type: "POST",
        data: {fbid: fbid},
        url: "kudos/getvote.php",
        success: function(data){
            var kudos = $.parseJSON(data);
            var kudos1 = kudos[0];
            var kudos2 = kudos[1];
            var kudos3 = kudos[2];
            if (kudos1 != 0){$("a[data-id='"+kudos1+"']").addClass('kudosactive');}
            if (kudos2 != 0){$("a[data-id='"+kudos2+"']").addClass('kudosactive');}
            if (kudos3 != 0){$("a[data-id='"+kudos3+"']").addClass('kudosactive');}
        },
        error: function(data){
            console.log('Ajax fbid failed.');
        }
    });
    
    $('.kudosheart').click(function(e){
        e.preventDefault;
        var id = $(this).parent().attr('data-id');
        var kudosDataString = 'id=' + id + '&fbid=' +fbid;
        var kudosSpan = $("span[data-id='"+id+"']");
        
        if($(this).hasClass('kudosactive')){
            $.ajax({
                type: "POST",
                data: kudosDataString,
                url: "kudos/kudosunvote.php",
                context: this,
                success: function(data) {
                    console.log('Ajax unkudos succeeded: ' + data);
                    $(this).removeClass('kudosactive').blur();
                    kudosSpan.html(function() {
                        var kudosCount = kudosSpan.text();
                        return parseInt(kudosCount) - 1;
                    });
                },
                error: function(data) {
                    console.log('Ajax unkudos failed: ' + data);
                }
            });
        } else {
            var numKudos = $('a.kudosactive').length;
            if (numKudos < 3){    
                $.ajax({
                    type: "POST",
                    data: kudosDataString,
                    url: "kudos/kudosvote.php",
                    context: this,
                    success: function(data) {
                        console.log('Ajax kudos succeeded: ' + data);
                        $(this).addClass('kudosactive');
                        kudosSpan.html(function() {
                            var kudosCount = kudosSpan.text();
                            return parseInt(kudosCount) + 1;
                        });
                    },
                    error: function(data) {
                        console.log('Ajax kudos failed: ' + data);
                    }
                });
            } else {
                alert('You can have max 3 kudos.');
                $(this).blur();
            }
        }  
    });
};
