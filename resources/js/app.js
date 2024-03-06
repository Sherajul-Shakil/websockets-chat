import './bootstrap';



$(document).ready(function () {
    function scrollToBottom() {
        var messageBody = document.querySelector('#messages');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    $(document).on('click', '#send_message', function (e) {
        e.preventDefault();

        let username = $('#username').val();
        let message = $('#message').val();

        if (username == '' || message == '') {
            alert('Please enter both username and message')
            return false;
        }

        $.ajax({
            method: 'post',
            url: '/send-message',
            data: { username: username, message: message },
            success: function (res) {
                // Handle success if needed
            }
        });
    });

    // Listen for messages from the 'chat' channel
    window.Echo.channel('chat').listen('.message', (e) => {
        $('#messages').append('<p><strong>' + e.username + '</strong>' + ': ' + e.message + '</p>');
        // $('#message').val('');
        scrollToBottom();
    });
    scrollToBottom();
});
