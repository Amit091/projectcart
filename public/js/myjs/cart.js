        $('.product_item').on('keyup', function() {
            console.log($(this).val());
            let amt = ($(this).val() != '') ? parseInt($(this).val()) : 0;
            let itemRow = $(this).closest('tr');
            itemRow.find('.itemtotal').text(amt * itemRow.data('pprice'));
            (amt == 0) ? itemRow.find('.btnPurchase').attr('disabled', true): itemRow.find('.btnPurchase').attr('disabled', false);
        });


        $('.btnPurchase').on('click', function() {
            let itemRow = $(this).closest('tr');
            let id = itemRow.data('cart');
            let amt = itemRow.find('input.product_item').val();
            let quan = (amt != '') ? parseInt(amt) : 0;
            console.log(quan);

            if (quan != 0) {
                //$(this).val() != '') ? parseInt($(this).val()) : 0;
                modal = $('#itemPurchaseModal');
                modal.find('#data').html(`<B>${id}</B>`)
                modal.modal('show');
                console.log(id);
                var data = {
                    'id': `${id}`,
                    'quan': `${quan}`
                };
                console.log(data);

                $.ajax({
                    type: `GET`,
                    url: `/mycart/cartitem/${id}`,
                    data: data,
                    contentType: 'application/x-www-form-urlencoded',
                    success: result => {
                        console.log(result);
                        console.log('data is here');
                        modal.find('div.modal-body').html(result.htmlData)
                    },
                    error: error => {
                        console.log(error);
                    }
                });
            } else {
                alert('Enter amount');
                $(this).closest('tr').find('input.product_item').focus();
            }
        });

        $('#donePurchase').on('click', function() {
            let rowId = $('#item-id').val();
            console.log(rowId);
            $(`tr#item_${rowId}`).remove();
            modal.modal('hide');
        })

        $('#cancelPurchase').on('click', function() {
            let rowId = $('#item-id').val();
            $(`tr#item_${rowId}`).find('input.product_item').val('');
            $(`tr#item_${rowId}`).find('.btnPurchase').attr('disabled', true);

            console.log(rowId);
            modal.modal('hide');
        })