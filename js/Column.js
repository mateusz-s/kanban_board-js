function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.$element = createColumn();

    function createColumn() {
        var $column = $('<div>').addClass('column col-sm-6 col-md-4 col-lg-3'),
            $columnItem = $('<div>').addClass('column-item'),
            $columnTitle = $('<h2>').addClass('column-title').text(self.name),
            $columnCardList = $('<ul>').addClass('column-card-list'),
            $columnDelete = $('<button>').addClass('btn-delete').attr('title', 'Usuń kolumnę').append('<i class="fa fa-times" aria-hidden="true"></i>'),
            $columnAddCard = $('<button>').addClass('add-card').attr('title', 'Dodaj kartę').append('<i class="fa fa-plus" aria-hidden="true"></i>');

        $columnDelete.click(function () {
            self.deleteColumn();
        });

        $columnAddCard.click(function (event) {
            var cardName = prompt('Wpisz nazwę karty:');
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function (response) {
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
        });

        $columnItem.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);

        $column.append($columnItem);

        return $column;
    }
}

Column.prototype = {
    createCard: function (card) {
        this.$element.find('ul').append(card.$element);
    },
    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });
    }
};