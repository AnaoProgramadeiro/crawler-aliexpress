async function go(){
    let pesquisa = $("#textfield").val()
    let selecao = $("#selecao").val()
    let paginas = $("#paginas").val()
    $("#wrapper").empty()
    $('#aguarde').html('<div class="loading"></div>')
    var quantidadeImagens = 0
    $.getJSON(`http://127.0.0.1:3000/api/${pesquisa}`,async function(data){ 
        data = data.slice(0, selecao);
        data.sort(() => Math.random() - 0.5);
        for (let x = 0; x < selecao; x++) {
            $('#pagina').html(`<p>Capturando Anúncio ${x+1} de ${selecao}</p>`)
            var image = ((await axios.get(`http://127.0.0.1:3000/image/${data[x]}/${paginas}`)).data)
            for (let i = 0; i < image.length; i++) {
                $('#wrapper').html(`

                <div class="grid-4">
                <a href="${image[i]}" target="_blank"><img src="${image[i]}" border="0" alt=" photo quotes-about-moving-on-with-a-smile_small-1.jpg"/></a>
                </div>`+  $('#wrapper').html());
            }

            $('#quantidade').html(`<p>${quantidadeImagens += image.length} imagens capturadas.</p>`)

            $("a").click(function(event) {
            event.preventDefault();
            var overlay = $("<div id='overlay'></div>");
            overlay.appendTo("body");
            var imgLocation = $(this).children("img").attr("src");
            var enlargedImg = $("<img src=" + imgLocation + ">")
                enlargedImg.appendTo(overlay);
            var button = $("<button class='close'>X</button>");
            button.appendTo(overlay);
            button.click(function(){
                overlay.remove();
            });
            });  
        }
        $('#pagina').empty()
        $('#aguarde').empty()
    })
}
       