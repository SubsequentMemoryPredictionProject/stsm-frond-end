config = {
  // This can have nested stuff, arrays, etc.
  nodeServerIP: '54.196.242.164',
  galComputerIP: '79.182.78.71',
  sivanCompuetrIP: '93.172.28.190',
  loginEndpoint: ':3101/stsm/user_management/authenticate?user_name=',
  createUserEndpoint: ':3101/stsm/user_management/create_user?user_name=',
  uploadPredictFilesEndpoint: ':3101/stsm/prediction/uploadFiles/',
  predictionResultsEndpoint: ':3101/stsm/prediction/getResults/',
  uploadValidateFilesEndpoint: ':3101/stsm/prediction/uploadFiles/',
  validateResultsEndpoint: ':3101/stsm/prediction/getResults/',
  timeoutBeforeRequestingPredictionResults: 5000,
  timeoutBeforeRequestingValidationResults: 5000,
}
