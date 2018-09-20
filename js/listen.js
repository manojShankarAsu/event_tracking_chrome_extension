chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{ 
    var responseData = null;
    if (request.message == 'EVENT_CLICK' || request.message == 'EVENT_SCROLL' || request.message=='EVENT_DOUBLE_CLICK') {
       responseData = sendToServer(request.data);
        sendResponse({data: responseData}); 
    }
});
 
function sendToServer(data)
{
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost:5000/trackevents");
    jax.setRequestHeader("Content-Type","text/plain; charset=UTF-8");
    jax.send(data);
  return jax.responseText;
}