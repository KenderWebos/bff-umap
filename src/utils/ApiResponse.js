class ApiResponse {
    constructor(httpCode, httpMessage, response, userFriendlyError = null, moreInformation = null) {
        this.httpCode = httpCode;
        this.httpMessage = httpMessage;
        this.timestamp = new Date().toISOString();
        this.moreInformation = moreInformation;
        this.userFriendlyError = userFriendlyError;
        this.response = response;
    }
}

module.exports = ApiResponse;
