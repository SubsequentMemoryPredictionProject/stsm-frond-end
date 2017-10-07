config = {
// This can have nested stuff, arrays, etc.
	//nodeServerIP: "79.182.78.71",
	//nodeServerIP: "54.196.242.164",
	nodeServerIP: "54.196.242.164",
	galComputerIP: "79.182.78.71",
	sivanCompuetrIP: "93.172.28.190",
	loginEndpoint: ":3101/stsm/user_management/authenticate?user_name=",
	createUserEndpoint: ":3101/stsm/user_management/create_user?user_name=",
	uploadPredictFilesEndpoint: ":3101/stsm/prediction/start_prediction_process?user_id=",
	predictionResultsEndpoint: ":3101/stsm/prediction/get_predictions?user_id=",
	uploadValidateFilesEndpoint: ":3101/stsm/validation/start_validation_process?user_id=",
	validateResultsEndpoint: ":3101/stsm/validation/get_validation_scores?user_id=",
	timeoutBeforeRequestingPredictionResults: 1000,
	timeoutBeforeRequestingValidationResults: 1000,
};
