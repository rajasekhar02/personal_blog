onmessage = function(event) {
  console.log(event, 123);
  const workerResult = event.data;
  workerResult.onmessage = true;
  postMessage(workerResult);
};
