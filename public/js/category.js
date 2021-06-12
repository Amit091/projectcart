$(document).ready(function () {
    $("table#mainTable").on("click", ".editBtn", function () {
        loadUpForm(this, 'update');
    });

    $("table#mainTable").on("click", ".deleteBtn ", function () {
        console.log("deleteBtn");
        loadUpForm(this, 'delete');
    });
    async function loadUpForm(btn, event) {
        $('tr').attr('style','');
        let id = $(btn).closest("tr").find('.category_id').data('value');
        let name = $(btn).closest("tr").find('.category_name').data('value');
        let description = $(btn).closest("tr").find('.category_description').val();
        $('#name').val(name);
        $('#description').val(description);
        $('#detailForm').attr('data-id',id);
        console.log(description);
        $(btn).closest("tr").attr('style','border:1px solid red');
        $(btn).closest("tr").focus();

        //CKEDITOR.instances['description'].setData(description);
        if (event == 'update') {
            $('#detailForm').attr('action', `/category/edit/${id}`);
            $('#name').prop("disabled", false);
            $('#description').val(description);
            $('#btnReset').prop('disabled', false);
             $('#checknew').prop('disabled', true);
            //CKEDITOR.instances['description'].setReadOnly(false);
            $('#btnSubmit').prop("disabled", false);
            $('#btnSubmit').text('Update');
            $('#btnSubmit').removeClass('btn btn-danger');
            $('#btnSubmit').addClass('btn btn-primary');

        }
        if (event == 'delete') {
            $('#detailForm').attr('action', `/category/delete/${id}`);
            $('#name').prop("disabled", true);
            $('#description').val(description);
            $('#btnReset').prop('disabled', false);
            $('#checknew').prop('disabled', true);
            //CKEDITOR.instances['description'].setReadOnly(true);
            $('#btnSubmit').prop("disabled", false);
            $('#btnSubmit').text('Delete');
            $('#btnSubmit').removeClass('btn btn-primary');
            $('#btnSubmit').addClass('btn btn-danger');
        }


    }

    async function formFillUp(e) {
        try { } catch (error) {

        }
    }

    $('#checknew').on('click', () => {
        if ($('#checknew').is(":checked")) {
            $('#btnSubmit').prop('disabled', false);
            $('#btnReset').prop('disabled', false);
            $('#btnSubmit').addClass('btn btn-primary');
        } else {
            $('#btnSubmit').prop('disabled', true);
            $('#btnReset').prop('disabled', true);
        }
    });

    $('#btnReset').on('click', () => {
             $('#btnSubmit').prop('disabled', false);
            $('#checknew').prop('disabled', false);
            $('#btnSubmit').prop('disabled',true);
            $('#detailForm').attr('action', '/category');
            $('#detailForm').trigger('reset');
    })
});