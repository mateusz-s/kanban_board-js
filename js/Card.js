function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card'),
            $cardDescription = $('<p>').addClass('card-description').text(self.name),
            $cardDeleteBtn = $('<button>').addClass('btn-delete').attr('title', 'Usuń kartę').append('<i class="fa fa-times" aria-hidden="true"></i>');

        $cardDeleteBtn.click(function () {
            self.removeCard();
        });

        $card.append($cardDeleteBtn)
            .append($cardDescription);

        return $card;
    }
}

Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function () {
                self.$element.remove();
            }
        });
    }
}