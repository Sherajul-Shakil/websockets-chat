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


    window.Echo.channel('chat').listen('.message', (e) => {
        let messageAlignmentClass = '';
        let messageColor = '';

        if ($('#username').val() === e.username) {
            messageAlignmentClass = 'right';
            messageColor = 'text-primary';
        } else {
            messageAlignmentClass = 'left';
            messageColor = 'text-dark';
        }

        let messageHtml = '<div class="direct-chat-msg d' + messageAlignmentClass + '">' +
            '<div class="direct-chat-info clearfix">' +
            '<span class="direct-chat-name ' + messageColor + ' +  pull-' + messageAlignmentClass + '">' + e.username + '</span>' +
            '</div>' +
            '<div class="direct-chat-text ' + messageColor + '">' + e.message + '</div>' +
            '</div>';
        $('#messages').append(messageHtml);

        scrollToBottom();
    });


    scrollToBottom();
});
