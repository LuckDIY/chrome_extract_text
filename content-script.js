const findClosestWebComponents = (event) => {

    if(!event.altKey){
        console.log("no altKey");
        return ;
    }

    const host = event.composedPath()[0];
    if(!host){
        console.log("no host");
        return ;
    }
    alert(host.textContent)
}

//监听消息
chrome.runtime.onMessage.addListener((message) => {
    console.log("message", message)
    if(message.extension==='ON'){
        //添加点击监听事件
        document.addEventListener("click", findClosestWebComponents);
    }else{
        //添加点击监听事件
        document.removeEventListener("click", findClosestWebComponents);
    }
})

