onmessage = function (event) {
    console.log(event,123)
  var workerResult = event.data;
  workerResult.onmessage = true;
  postMessage(workerResult);
};