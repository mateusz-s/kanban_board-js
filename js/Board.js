var board = {
    name: 'Tablica Kanban',
    createColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
}

$('.create-column').click(function () {
        swal({                              // sweetAlert start
            title: "Wpisz nazwę kolumny:", 
            text: "", 
            type: "input",
            showCancelButton: true,
            cancelButtonText: "Anuluj",
            closeOnConfirm: true,
            inputPlaceholder: "np. Do zrobienia"
        }, 
        function(columnName) {
            $.ajax({
                url: baseUrl + '/column',
                method: 'POST',
                data: {
                    name: columnName
                },
                success: function (response) {
                    var column = new Column(response.id, columnName);
                    board.createColumn(column);
                }
            });
        });                                    // sweetAlert end
    
//    var columnName = prompt('Wpisz nazwę kolumny:');
//    $.ajax({
//        url: baseUrl + '/column',
//        method: 'POST',
//        data: {
//            name: columnName
//        },
//        success: function (response) {
//            var column = new Column(response.id, columnName);
//            board.createColumn(column);
//        }
//    });
});

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}