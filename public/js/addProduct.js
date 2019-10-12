$("#img").change(function() {
    if (typeof(FileReader) != "undefined") {
        var dvPreview = $("#dvPreview");
        dvPreview.html("");
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.bmp)$/;
        console.log($(this)[0].files.length);
        if ($(this)[0].files.length < 2) {
            alert('Upload at least 2 image \nSelect Again with more image');
        } else {
            $($(this)[0].files).each(function() {
                var file = $(this);
                if (regex.test(file[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var img = $("<img />");
                        img.attr("style", "height:100px;width: 100px;margin:10px;border:solid 2px black");
                        img.attr("src", e.target.result);
                        dvPreview.append(img);
                    };
                    reader.readAsDataURL(file[0]);
                } else {
                    alert(file[0].name + " is not a valid image file. \nPlease Select valid Image only");
                    dvPreview.html("");
                    return false;
                }
            });
        }
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});