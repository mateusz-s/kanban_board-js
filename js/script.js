$(document).ready(function () {
    function randomString() {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) {
        var self = this;
        
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        
        function createColumn() {
            var $column = $('<div>').addClass('column col-sm-6 col-md-4 col-lg-3'),
                $columnItem = $('<div>').addClass('column-item'),
                $columnTitle = $('<h2>').addClass('column-title').text(self.name),
                $columnCardList = $('<ul>').addClass('column-card-list'),
                $columnDelete = $('<button>').addClass('btn-delete').attr('title', 'Zamknij kolumnę').append('<i class="fa fa-times" aria-hidden="true"></i>'),
                $columnAddCard = $('<button>').addClass('add-card').attr('title', 'Dodaj kartę').append('<i class="fa fa-plus" aria-hidden="true"></i>');
            
            $columnDelete.click(function () {
               self.removeColumn(); 
            });
            
            $columnAddCard.click(function () {
                self.addCard(new Card(prompt('Wpisz nazwę karty:')));
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
        addCard: function (card) {
            this.$element.find('ul').append(card.$element);
        },
        removeColumn: function () {
            this.$element.remove();
        }
    };
    
    function Card(description) {
        var self = this;
        
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        
        function createCard() {
            var $card = $('<li>').addClass('card'),
                $cardDescription = $('<p>').addClass('card-description').text(self.description),
                $cardDelete = $('<button>').addClass('btn-delete').attr('title', 'Zamknij kartę').append('<i class="fa fa-times" aria-hidden="true"></i>');
            
            $cardDelete.click(function () {
                self.removeCard();
            });
            
            $card.append($cardDelete)
                .append($cardDescription);
            
            return $card;
        }
    }
    
    Card.prototype = {
        removeCard: function () {
            this.$element.remove();
        }
    }
    
    var board = {
        name: 'Tablica Kanban',
        addColumn: function (column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    }
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column').click(function () {
        var name = prompt('Wpisz nazwę kolumny:'),
            column = new Column(name);
        
        board.addColumn(column);
    });
    
    var todoColumn = new Column('Do zrobienia'),
        doingColumn = new Column('W trakcie'),
        doneColumn = new Column('Skończone'),
        importantColumn = new Column('Ważne');
    
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    board.addColumn(importantColumn);
    
    var card1 = new Card('Nowe zadanie'),
        card2 = new Card('Stworzyć aplikację "Tablica Kanban"'),
        card3 = new Card('Poprawić stylowanie karty!');
    
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    importantColumn.addCard(card3);
});