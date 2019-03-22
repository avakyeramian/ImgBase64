window.onload = content;


function content()
{
    
    //  Avak Yeramian
    //
    //  GNU GENERAL PUBLIC LICENSE Version 3
    //
    // The GNU General Public License is a free, copyleft license for software and other kinds of works.

    //  The licenses for most software and other practical works are designed to take away your freedom to share and change the works.
    //  By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.
    //
    
    /* -- useless/20 -- */
    
    var document = window.document;
    var alert = window.alert;
    var console = window.console;
    var body = document.body;
    
    if(document.getElementById("ImgBase64")){
        var imgBase64_div = document.getElementById("ImgBase64");
        getImgForm();
        
    }
    
    function getImgForm(){
        var form = elemCreate("form",{action:"#",id:"import_form"},"");
        var h2 = elemCreate("h2",{},"Import");
        form.append(h2);
        //var error_div = elemCreate("div",{id:"error_div"},"");
        //form.append(error_div);
        var file_label = elemCreate("label",{for:"file_input"},"From a file :");
        form.append(file_label);
        var file_input = elemCreate("input",{type:"file",id:"file_input",accept:"image/*"},"");
        file_input.onchange = function (event){
            importHelper(event)
        }
        form.append(file_input);
        var url_label = elemCreate("label",{for:"url_input"},"From an url :");
        form.append(url_label);
        var url_input = elemCreate("input",{type:"url",id:"url_input"},"");
        url_input.onchange = function(event){
            importHelper(event);
        }
        url_input.onkeyup = function(event){
            importHelper(event);
        }
        url_input.onblur = function(event){
            importHelper(event);
        }
        url_input.onpaste = function(event){
            importHelper(event);
        }
        url_input.onclick = function(event){
            importHelper(event);
        }
        form.append(url_input);
        
        var buttons_div = elemCreate("div",{class:"space-between"},"");
        form.append(buttons_div);
        var submit_button = elemCreate("button",{type:"button"},"Submit ✔️");
        submit_button.onclick = function (){
            var form = document.getElementById("import_form");
            var file_input = document.getElementById("file_input");
            var url_input = document.getElementById("url_input");
            if ( form.checkValidity() && (file_input.value!=="" || url_input.value!=="")){
                var image = elemCreate("img",{},"");
                if(file_input.value!==""){
                    //console.log("ok file");
                    image.src = URL.createObjectURL(file_input.files[0]);
                    //console.log(image);
                    imgBase64_div.innerHTML = ""; 
                    setImgForm(image)
                }else{
                    //console.log("ok url");
                    image.src = url_input.value;
                    //console.log(image);
                    setImgForm(image)
                }
            }else{
                //console.log("nop");
            }
        }
        buttons_div.append(submit_button);
        var clear_button = elemCreate("button",{type:"button"},"Clear ❌");
        clear_button.onclick = function(){
            var file_input = document.getElementById("file_input");
            var url_input = document.getElementById("url_input");
            file_input.value = "";
            url_input.value = "";
            file_input.disabled = false;
            url_input.disabled = false;
        }
        buttons_div.append(clear_button);
        
        imgBase64_div.append(form);
    }
    
    function importHelper(event){
        var input;
        if(event.target.id==="url_input"){
            input = document.getElementById("file_input");
        }else{
            input = document.getElementById("url_input");
        }
        if(event.target.value !== ""){
            input.disabled = true;
        }else{
            input.disabled = false;
        }
    }
    
    function setImgForm(image){
        image.onload = function(){
            //console.log(image);
            imgBase64_div.innerHTML = "";
            var currentWidth = image.naturalWidth;
            var currentHeight = image.naturalHeight;
            var widthByHeight = currentWidth/currentHeight;
            var heightByWidth = currentHeight/currentWidth;
            
            var form = elemCreate("form",{action:"#",id:"settings_form"},"");
            var h2 = elemCreate("h2",{},"Settings");
            form.append(h2);
            //var error_div = elemCreate("div",{id:"error_div"},"");
            //form.append(error_div);
            var width_label = elemCreate("label",{for:"width_input"},"Width");
            form.append(width_label);
            var width_input = elemCreate("input",{type:"number",id:"width_input",value:currentWidth},"");
            width_input.onchange = function (event){
                var height_input = document.getElementById("height_input");
                var width_input = event.target;
                var width = width_input.value;
                height_input.value = Math.round(width*heightByWidth);
            }
            width_input.required = true;
            form.append(width_input);
            var height_label = elemCreate("label",{for:"height_input"},"Height");
            form.append(height_label);
            var height_input = elemCreate("input",{type:"number",id:"height_input",value:currentHeight},"");
            height_input.onchange = function (event){
                var width_input = document.getElementById("width_input");
                var height_input = event.target;
                var height = height_input.value;
                width_input.value = Math.round(height*widthByHeight);
            }            
            height_input.required = true;
            form.append(height_input);
            var buttons_div = elemCreate("div",{class:"space-between"},"");
            form.append(buttons_div);
            var submit_button = elemCreate("button",{type:"button"},"Convert 😏");
            submit_button.onclick = function (){
                var form = document.getElementById("settings_form");
                if( form.checkValidity() ){
                    if(document.getElementById("error_div")){
                        var error_div = document.getElementById("error_div");
                        error_div.remove();
                    }
                    var width_input = document.getElementById("width_input");
                    var height_input = document.getElementById("height_input");
                    var width = width_input.value;
                    var height = height_input.value;
                    //var loader = elemCreate("div",{class:"loader"},"");
                    //imgBase64_div.append(loader);
                    try{
                        var base64 = convertImageToBase64Resize(image,width,height);
                        finish(base64);
                    }catch(error){
                        var div = elemCreate("div",{id:"error_div"},"Error, Resolution too high");
                        imgBase64_div.append(div);
                    }
                }
            }
            buttons_div.append(submit_button);
            var clear_button = elemCreate("button",{type:"button"},"Reset ✖️");
            clear_button.onclick = function(){
                var width_input = document.getElementById("width_input");
                var height_input = document.getElementById("height_input");
                width_input.value = currentWidth;
                height_input.value = currentHeight;
            }
            buttons_div.append(clear_button);

            imgBase64_div.append(form);
            
        }
    }

    function finish(base64){
        imgBase64_div.innerHTML = "";
        var rawBase64 = base64.replace(/^data:image\/(png|jpg);base64,/, "");
        var h2 = elemCreate("h2",{},"Finished");
        imgBase64_div.append(h2);
        var code_h3 = elemCreate("h3",{},"Text");
        imgBase64_div.append(code_h3);
        var code = elemCreate("code",{class:"code-base64"},rawBase64);
        imgBase64_div.append(code);
        var img_h3 = elemCreate("h3",{},"Preview");
        imgBase64_div.append(img_h3);
        var a = elemCreate("a",{href:base64,target:"_blank"},"");
        var img = elemCreate("img",{src:base64,alt:"base64image",id:"base64image"},"");
        a.append(img);
        imgBase64_div.append(a);
        /*
        var copy_button = elemCreate("button",{id:"copy"},"Copy Base64");
        copy_button.onclick = function (){
            copy(rawBase64);
        }
        imgBase64_div.append(copy_button);
        */
    }
    
    function convertImageToBase64Resize(image,width,height){
        var canvas = document.createElement("canvas");
        //canvas.width = image.naturalWidth;
        canvas.width = width;
        //canvas.height = image.naturalHeight;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0,width,height);

        var base64 = canvas.toDataURL("image/png");

        return base64;
    }

    function copy(rawBase64) {
        var textArea = document.createElement("textarea");
        textArea.value = rawBase64;
        textArea.style.left = "10000px";
        textArea.style.position = "absolute";
        imgBase64_div.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        imgBase64_div.removeChild(textArea);
        document.getElementById("copy").innerHTML = "Copied !";
    }

    /*
        Shortcut function to create dom element more quickly
    */
    function elemCreate(type,dicoAtt,text){
        var dom = document.createElement(type);
        for(var key in Object.keys(dicoAtt)){
            dom.setAttribute(Object.keys(dicoAtt)[key],dicoAtt[Object.keys(dicoAtt)[key]]);//piece of shit
        }
        dom.innerHTML = text;
        return dom;
    }
}