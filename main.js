window.onload=function(){
  console.log("%cコンソールをのぞく時、コンソールもまたこちらをのぞいているのだ","color:#113; font-style:italic; font-family: serif;");
  
  const form = document.getElementById("form");
  const label = document.getElementById("label");
  const description = document.getElementById("description");
  const cover = document.getElementById("cover");
  const result = document.getElementById("result").children[0];
  
  form.addEventListener("change",()=>{
    if(form.files.length>0){

      form.style.pointerEvents="none";
      
      label.innerHTML = "サーバーに送信";
      label.style.pointerEvents="all";
      label.style.backgroundColor="orange";
      label.setAttribute("for", "#");

      description.innerHTML = form.files[0].name;
      description.style.color="#777";
    }
  })

  label.addEventListener("click",()=>{
    const formData = new FormData();
    const file = form.files[0];
    formData.append("avatar", file);
    label.style.backgroundColor="red";
    label.innerHTML = "サーバー処理中";
    cover.style.display="block";
    sendRequest(formData);
  });

  async function sendRequest(fD){
    var response =  await (await fetch("http://catapult01.php.xdomain.jp/upload/", { method: "POST", body: fD })).text();
    form.style.pointerEvents="all";

    label.innerHTML = "ファイルを選択";
    label.style.pointerEvents="none";
    label.style.backgroundColor="dodgerblue";
    label.setAttribute("for", "form");

    description.innerHTML = "またはファイルをドロップ";
    description.style.color="#aaa";

    cover.style.display="none";

    if(/.{32}\..+/.test(response)){
      if(result.innerHTML=="ここにBBcodeが表示されます"){
        result.addEventListener("click",()=>{
          let range = new Range();
          range.selectNode(result.firstChild);
          document.getSelection().removeAllRanges();  
          document.getSelection().addRange(range); 
        });
      }
      result.innerHTML="[img]assets.scratch.mit.edu/get_image/.%2E/"+response+"[/img]";
      result.style.color = "#000";  
    }else{
      alert("処理に失敗しました。もう一度お試しください。");
    }
  }

};