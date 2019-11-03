$("#defaultimg").change(function() {
    readURL(this);
});

//for single image
function readURL(input) {
    if (input.files && input.files[0]) {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.bmp)$/;
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#single-img").attr('src', e.target.result).width(100).height(100);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#galleryimg").change(function() {
    if (typeof(FileReader) != "undefined") {
        var dvPreview = $("#gallery-img-preview");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.bmp)$/;
        console.log($(this)[0].files.length);

        $($(this)[0].files).each(function() {
            var file = $(this);
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img = $("<img />");
                    img.attr("style", "height:100px;width: 100px;margin:10px;border:solid 2px black");
                    img.attr("src", e.target.result);
                    var img1 = `<img style="height:100px;width: 100px;margin:10px;border:solid 2px black" src="${e.target.result}"/>`;
                    var removeButton = `<a class="removeImage "><i class="fa fa-trash" style="color:red"></a>`;
                    div = `<div style="display:inline-block" class='imgPreview'>${img1}${removeButton}</div>`
                    dvPreview.append(div);
                };
                reader.readAsDataURL(file[0]);
            } else {
                alert(file[0].name + " is not a valid image file. \nPlease Select valid Image only");
                return false;
            }
        });
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});

$("#gallery-img-preview").on('click', '.removeImage', function() {
    console.log($(this));
    $(this).parent('div.imgPreview').remove();
})