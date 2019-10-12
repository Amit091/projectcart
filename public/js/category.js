$(document).ready(function() {
    $("table#mainTable").on("click", ".editBtn", function() {
        loadUpForm(this, 'update');

    });

    $("table#mainTable").on("click", ".deleteBtn ", function() {
        console.log("deleteBtn");
        loadUpForm(this, 'delete');
    })
    async function loadUpForm(btn, event) {
        let id = $(btn).closest("tr").find('.category_id').data('value');
        let name = $(btn).closest("tr").find('.category_name').data('value');
        let description = $(btn).closest("tr").find('.category_description').val();

        $('#item_id').html(`ID:${id}`);
        $('#item_id2').val(id);
        $('#name').val(name);
        $('#description').html(description)
        CKEDITOR.instances['description'].setData(description);
        if (event == 'update') {
            $('#detailForm').attr('action', `/category/edit/${id}`);
            $('#name').prop("disabled", false);
            CKEDITOR.instances['description'].setReadOnly(false);
            $('#btnSubmit').prop("disabled", false);
            $('#btnSubmit').text('Update');
            $('#btnSubmit').removeClass('btn btn-danger')
            $('#btnSubmit').addClass('btn btn-primary');

        }
        if (event == 'delete') {
            $('#detailForm').attr('action', `/category/delete/${id}`);
            $('#name').prop("disabled", true);
            CKEDITOR.instances['description'].setReadOnly(true);
            $('#btnSubmit').prop("disabled", false);
            $('#btnSubmit').text('Delete');
            $('#btnSubmit').removeClass('btn btn-primary')
            $('#btnSubmit').addClass('btn btn-danger');
        }


    }

    async function formFillUp(e) {
        try {} catch (error) {

        }
    }
})